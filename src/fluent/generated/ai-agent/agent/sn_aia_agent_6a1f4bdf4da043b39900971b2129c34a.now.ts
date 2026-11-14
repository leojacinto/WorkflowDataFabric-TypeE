import { AiAgent } from '@servicenow/sdk/core'

AiAgent({
    $id: Now.ID['6a1f4bdf4da043b39900971b2129c34a'],
    name: 'Forecast Variance',
    description: 'Reviews new expense events and opens a Finance Case when a cost center goes over budget.',
    agentRole: 'You are a finance analyst specializing in cost center budget variance review.',
    recordType: 'custom',
    processingMessage: 'Reviewing the expense event and cost center budget...',
    postProcessingMessage: 'Expense event review complete.',
    versionDetails: [
        {
            state: 'published',
            name: 'V1',
            instructions: `You review a new expense event and determine whether its cost center is over budget.

Step 1: Extract the Cost Center.
- Determine the expense event ID from the task or the user's request.
- Use the "Extract Cost Center" tool with the event ID to obtain the cost center and vendor for the event.
- DO NOT PROCEED if no cost center is returned.

Step 2: Review Cost Center Budget History.
- Use the "Search for Cost Center History" tool with the cost center from Step 1.
- Review the status of each fiscal month returned and state whether the months are mostly On Target, Over Budget, or Under Budget.

Step 3: Review Expense Transaction History.
- Use the "Search for Expense Transactions History" tool with the cost center from Step 1 and the vendor from Step 1.
- State whether this vendor has transacted before: yes if any transactions are returned, no if none are returned.

Step 4: Review PostgreSQL Cost Center Summary.
- Use the "Search for Cost Center Summary" tool with the cost center from Step 1 and say whether the variance is mostly positive or negative.

Step 5: Run Budget Variance Analysis.
- Use the "Budget Variance Analysis" tool with the cost center from Step 1 and the event ID.
- Report the result returned by the tool. If a Finance Case was created, include the Finance Case number.

Step 6: Present Results.
- Summarize Steps 2, 3, 4, and 5 in plain English.
- Use readable labels, not field names. Do NOT display sys_ids, internal field names, or raw JSON.`,
        },
    ],
    runAsUser: '',
    agentDescriptor: 'created_by_build_agent',
    tools: [
        {
            description:
                'Runs the Budget Variance Analysis subflow with a cost center and event ID and opens a Finance Case when the cost center is over budget.',
            name: 'Budget Variance Analysis',
            executionMode: 'autopilot',
            maxAutoExecutions: 10,
            postMessage: 'Budget variance analysis complete.',
            preMessage: 'Running budget variance analysis...',
        },
        {
            description:
                'Runs the Extract Cost Center subflow with an expense event ID and returns the cost center and vendor for that event.',
            name: 'Extract Cost Center',
            executionMode: 'autopilot',
            maxAutoExecutions: 10,
            postMessage: 'Cost center extracted.',
            preMessage: 'Extracting the cost center for the event...',
        },
        {
            description:
                'Looks up Cost Center Budget History records by cost center and returns fiscal month, monthly budget, actual spend, and status.',
            name: 'Search for Cost Center History',
            executionMode: 'autopilot',
            maxAutoExecutions: 10,
            postMessage: 'Cost center budget history retrieved.',
            preMessage: 'Searching cost center budget history...',
        },
        {
            description:
                'Looks up Expense Transactions records by cost center and vendor and returns expense date, amount, and description.',
            name: 'Search for Expense Transactions History',
            executionMode: 'autopilot',
            maxAutoExecutions: 10,
            postMessage: 'Expense transaction history retrieved.',
            preMessage: 'Searching expense transaction history...',
        },
        {
            description:
                'Looks up Cost Center Summary records (PostgreSQL) by cost center, ordered by period, and returns period, fiscal year, actual amount, baseline amount, variance, and variance percent.',
            name: 'Search for Cost Center Summary',
            recordType: 'custom',
            type: 'crud',
            executionMode: 'autopilot',
            inputs: {
                operationName: 'lookup',
                table: 'x_snc_forecast_v_0_df_cc_summ_dvn',
                inputFields: [
                    {
                        name: 'cost_center',
                        description: 'The cost center to look up the summary for',
                        mandatory: true,
                    },
                ],
                queryCondition: 'u_cost_center={{cost_center}}',
                returnFields: [
                    {
                        name: 'sys_id',
                    },
                    {
                        name: 'u_period',
                    },
                    {
                        name: 'u_fiscal_year',
                    },
                    {
                        name: 'u_actual_amount_usd',
                    },
                    {
                        name: 'u_baseline_amount_usd',
                    },
                    {
                        name: 'u_variance',
                    },
                    {
                        name: 'u_variance_pct',
                    },
                ],
                limit: 12,
                orderBy: 'u_period',
                sortType: 'a_to_z',
            },
            maxAutoExecutions: 10,
            postMessage: 'Cost center summary retrieved.',
            preMessage: 'Searching cost center summary...',
        },
    ],
    securityAcl: {
        $id: Now.ID['52d4aa917b294fd89076e60107ce5048'],
        type: 'Specific role',
        roles: ['admin'],
    },
    dataAccess: {
        description: 'Admin role for data access',
        roleMap: ['admin'],
    },
    triggerConfig: [],
})
