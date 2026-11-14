(function execute(inputs, outputs) {
    var ALIAS_NAME = 'Get Expense Event';
    var TABLE = 'x_snc_forecast_v_0_expense_transaction_event';
    var PATH = '/api/expense-events';

    // Resolve the Connection & Credential Alias by name.
    var aliasGr = new GlideRecord('sys_alias');
    if (!aliasGr.get('name', ALIAS_NAME)) {
        gs.error('[Get Expense Event] Connection alias "' + ALIAS_NAME + '" not found.');
        return;
    }

    // Pull the connection details configured under the alias.
    var connectionInfo = new sn_cc.ConnectionInfoProvider().getConnectionInfo(aliasGr.getUniqueValue());
    if (!connectionInfo) {
        gs.error('[Get Expense Event] No active connection configured for alias "' + ALIAS_NAME + '".');
        return;
    }

    // Read the connection URL from the alias connection's data map.
    var baseUrl = '';
    var dataMap = connectionInfo.getDataMap();
    if (dataMap) {
        baseUrl = typeof dataMap.get === 'function' ? dataMap.get('connection_url') : dataMap['connection_url'];
    }
    if (!baseUrl) {
        gs.error('[Get Expense Event] Connection URL is empty for alias "' + ALIAS_NAME + '".');
        return;
    }

    // Build and send the GET request through the alias connection.
    var request = new sn_ws.RESTMessageV2();
    request.setHttpMethod('get');
    request.setEndpoint(baseUrl.replace(/\/+$/, '') + PATH);

    // Apply credentials from the alias when any are configured.
    try {
        var user = connectionInfo.getCredentialAttribute('user_name');
        if (user) {
            request.setBasicAuth(user, connectionInfo.getCredentialAttribute('password') || '');
        }
    } catch (credErr) {
        // No credential configured on the alias; continue unauthenticated.
    }

    var response = request.execute();
    var statusCode = response.getStatusCode();
    if (statusCode < 200 || statusCode >= 300) {
        gs.error('[Get Expense Event] HTTP ' + statusCode + ' from ' + PATH + ': ' + response.getBody());
        return;
    }

    var events;
    try {
        events = JSON.parse(response.getBody());
    } catch (parseErr) {
        gs.error('[Get Expense Event] Unable to parse response body: ' + parseErr);
        return;
    }
    if (!Array.isArray(events)) {
        events = [events];
    }

    var ownerId = gs.getUserID();
    var createdCount = 0;

    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (!event || !event.event_id) {
            continue;
        }
        var eventId = String(event.event_id);

        // Skip events whose Event ID already exists in the table.
        var existing = new GlideRecord(TABLE);
        existing.addQuery('event_id', eventId);
        existing.setLimit(1);
        existing.query();
        if (existing.hasNext()) {
            continue;
        }

        var rec = new GlideRecord(TABLE);
        rec.initialize();

        // Copy every incoming field whose name matches a column on the table.
        for (var key in event) {
            if (!event.hasOwnProperty(key) || !rec.isValidField(key)) {
                continue;
            }
            var value = event[key];
            if (value === null || value === undefined) {
                continue;
            }
            value = String(value);
            if (key === 'amount_usd') {
                // amount_usd arrives as text with thousands separators.
                value = value.replace(/,/g, '');
            }
            rec.setValue(key, value);
        }

        // Owner is the user running this action.
        rec.setValue('owner', ownerId);

        if (rec.insert()) {
            createdCount++;
        }
    }

    gs.info('[Get Expense Event] Created ' + createdCount + ' Expense Transaction Event record(s).');
})(inputs, outputs);