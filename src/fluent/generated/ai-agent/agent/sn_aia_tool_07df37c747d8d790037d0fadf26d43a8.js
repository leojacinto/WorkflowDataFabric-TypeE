(function(inputs) {
    var records = [];
    var gr = new GlideRecordSecure('x_snc_forecast_v_0_expense_transactions');
    gr.addQuery('cost_center', inputs.cost_center);
    gr.addQuery('vendor', inputs.vendor);
    gr.query();
    while (gr.next()) {
        records.push({
            expense_date: gr.getValue('expense_date'),
            amount: gr.getValue('amount'),
            description: gr.getValue('description')
        });
    }
    return { count: records.length, records: records, status: 'success' };
})(inputs);