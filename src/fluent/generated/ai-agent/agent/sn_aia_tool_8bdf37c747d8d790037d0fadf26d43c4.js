(function(inputs) {
    var records = [];
    var gr = new GlideRecordSecure('x_snc_forecast_v_0_cost_center_budget_history');
    gr.addQuery('cost_center', inputs.cost_center);
    gr.orderBy('fiscal_month');
    gr.setLimit(12);
    gr.query();
    while (gr.next()) {
        records.push({
            fiscal_month: gr.getValue('fiscal_month'),
            monthly_budget: gr.getValue('monthly_budget'),
            actual_spend: gr.getValue('actual_spend'),
            status: gr.getValue('status')
        });
    }
    return { count: records.length, records: records, status: 'success' };
})(inputs);