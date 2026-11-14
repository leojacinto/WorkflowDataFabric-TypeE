(function execute(inputs, outputs) {
    function num(gr, field) {
        var v = gr.getValue(field);
        if (v === null || v === undefined) {
            return 0;
        }
        v = '' + v;
        // Handle currency values that may be stored as "USD;123.45"
        if (v.indexOf(';') > -1) {
            v = v.split(';')[1];
        }
        var n = parseFloat(v);
        return isNaN(n) ? 0 : n;
    }

    var costCenter = '' + inputs.cost_center;
    var eventId = '' + inputs.event_id;

    // Look up the Expense Transaction Event to read its amount.
    var eventAmount = 0;
    var evt = new GlideRecord('x_snc_forecast_v_0_expense_transaction_event');
    evt.addQuery('event_id', eventId);
    evt.query();
    if (evt.next()) {
        eventAmount = num(evt, 'amount_usd');
    }

    // Total Monthly Budget and Actual Spend one record at a time for the cost
    // center in fiscal year 2025. GlideAggregate SUM is unreliable on these
    // currency fields, so we add the values up manually.
    var totalBudget = 0;
    var totalActual = 0;
    var ownerSysId = '';
    var bh = new GlideRecord('x_snc_forecast_v_0_cost_center_budget_history');
    bh.addQuery('cost_center', costCenter);
    bh.addQuery('fiscal_year', 2025);
    bh.query();
    while (bh.next()) {
        totalBudget += num(bh, 'monthly_budget');
        totalActual += num(bh, 'actual_spend');
        if (!ownerSysId) {
            ownerSysId = bh.getValue('owner') || '';
        }
    }

    var newActual = totalActual + eventAmount;

    outputs.over_budget = newActual > totalBudget;
    outputs.new_actual = '' + newActual;
    outputs.short_description = costCenter + ' is exceeding budget';
    outputs.owner = ownerSysId;
})(inputs, outputs);