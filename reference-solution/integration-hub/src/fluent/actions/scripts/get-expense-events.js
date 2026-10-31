/**
 * Fetches expense events from the external API through the "Get Expense Event"
 * connection & credential alias and, for each event whose Event ID is not yet
 * stored, creates an Expense Transaction Event record (copying every field with
 * the same name). amount_usd arrives as text with commas, which are stripped.
 *
 * Runs on the instance (Glide + sn_cc + sn_ws available).
 */
;(function execute(inputs, outputs) {
    var ALIAS_NAME = 'Get Expense Event'
    var PATH = '/api/expense-events'
    var TABLE = 'x_snc_forecast_v_0_expense_transaction_event'

    // Fields copied 1:1 from the event to the record (same name on both sides).
    var FIELDS = [
        'event_id', 'amount_usd', 'billing_period', 'business_unit', 'correlation_id',
        'cost_center', 'event_type', 'gl_account', 'invoice_id', 'priority', 'vendor',
        'region', 'schema_version', 'sent_from', 'service_category', 'source_system', 'timestamp',
    ]

    var fetched = 0
    var created = 0
    var skipped = 0

    try {
        // Resolve the connection & credential alias by name.
        var aliasId = ''
        var ga = new GlideRecord('sys_alias')
        ga.addQuery('name', ALIAS_NAME)
        ga.setLimit(1)
        ga.query()
        if (ga.next()) {
            aliasId = ga.getUniqueValue()
        }

        if (!aliasId) {
            gs.error('[Get Expense Event] Alias not found: ' + ALIAS_NAME)
            outputs.fetched = 0
            outputs.created = 0
            outputs.skipped = 0
            return
        }

        // Resolve the connection (URL + optional credential) for the alias.
        var provider = new sn_cc.ConnectionInfoProvider()
        var connInfo = provider.getConnectionInfo(aliasId)
        if (!connInfo) {
            gs.error('[Get Expense Event] No active connection configured for alias: ' + ALIAS_NAME)
            outputs.fetched = 0
            outputs.created = 0
            outputs.skipped = 0
            return
        }

        var dataMap = connInfo.getDataMap() || {}
        var baseUrl = (dataMap.connection_url || '').replace(/\/+$/, '')

        var rm = new sn_ws.RESTMessageV2()
        rm.setHttpMethod('get')
        rm.setEndpoint(baseUrl + PATH)

        // Apply basic auth only if the alias supplies credentials.
        var user = ''
        var pass = ''
        try { user = connInfo.getCredentialAttribute('user_name') || '' } catch (e) {}
        try { pass = connInfo.getCredentialAttribute('password') || '' } catch (e) {}
        if (user) {
            rm.setBasicAuth(user, pass)
        }

        var response = rm.execute()
        var status = response.getStatusCode()
        var body = response.getBody()

        if (status < 200 || status >= 300) {
            gs.error('[Get Expense Event] HTTP ' + status + ' from ' + baseUrl + PATH + ': ' + body)
            outputs.fetched = 0
            outputs.created = 0
            outputs.skipped = 0
            return
        }

        var events = JSON.parse(body)
        if (!Array.isArray(events)) {
            events = events && events.result ? events.result : []
        }
        fetched = events.length

        for (var i = 0; i < events.length; i++) {
            var src = events[i] || {}
            var eventId = src.event_id == null ? '' : String(src.event_id)
            if (!eventId) {
                skipped++
                continue
            }

            // Skip if an Expense Transaction Event with this Event ID already exists.
            var dup = new GlideRecord(TABLE)
            dup.addQuery('event_id', eventId)
            dup.setLimit(1)
            dup.query()
            if (dup.hasNext()) {
                skipped++
                continue
            }

            var rec = new GlideRecord(TABLE)
            rec.initialize()
            for (var f = 0; f < FIELDS.length; f++) {
                var key = FIELDS[f]
                var val = src[key]
                val = val == null ? '' : String(val)
                if (key === 'amount_usd') {
                    // amount_usd arrives as text with thousands separators.
                    val = val.replace(/,/g, '')
                }
                rec.setValue(key, val)
            }
            // Owner = the user running the subflow (agent trigger later runs as Owner).
            rec.setValue('owner', gs.getUserID())
            if (rec.insert()) {
                created++
            } else {
                skipped++
                gs.error('[Get Expense Event] Failed to insert event ' + eventId)
            }
        }
    } catch (ex) {
        gs.error('[Get Expense Event] Error: ' + ex)
    }

    outputs.fetched = fetched
    outputs.created = created
    outputs.skipped = skipped
})(inputs, outputs)
