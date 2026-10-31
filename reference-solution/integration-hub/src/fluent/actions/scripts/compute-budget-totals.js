/**
 * Computes FY2025 budget vs. actual totals for a cost center,
 * adds the given event's amount_usd to the actual, and reports
 * whether the new actual exceeds the total budget.
 *
 * Sums are computed by iterating records because GlideAggregate SUM
 * on these currency fields does not aggregate reliably.
 */
(function execute(inputs, outputs) {
    var cc = inputs.cost_center;
    var eventId = inputs.event_id;

    var actual = 0;
    var budget = 0;
    var owner = '';
    var gr = new GlideRecord('x_snc_forecast_v_0_cost_center_budget_history');
    gr.addQuery('cost_center', cc);
    gr.addQuery('fiscal_year', 2025);
    gr.query();
    while (gr.next()) {
        actual += parseFloat(gr.getValue('actual_spend')) || 0;
        budget += parseFloat(gr.getValue('monthly_budget')) || 0;
        if (!owner) {
            owner = gr.getValue('owner') || '';
        }
    }

    var amt = 0;
    var ev = new GlideRecord('x_snc_forecast_v_0_expense_transaction_event');
    ev.addQuery('event_id', eventId);
    ev.query();
    if (ev.next()) {
        amt = parseFloat(ev.getValue('amount_usd')) || 0;
    }

    var newActual = actual + amt;
    outputs.new_actual = newActual;
    outputs.total_budget = budget;
    outputs.over_budget = (newActual > budget) ? 'true' : 'false';
    outputs.short_desc = (cc || '') + ' is exceeding budget';
    outputs.owner_id = owner;
})(inputs, outputs);
