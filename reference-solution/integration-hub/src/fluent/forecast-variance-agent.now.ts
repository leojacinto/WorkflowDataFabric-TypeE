import '@servicenow/sdk/global'
import { AiAgent } from '@servicenow/sdk/core'

export const forecastVarianceAgent = AiAgent({
    $id: Now.ID['forecast_variance_agent'],
    name: 'Forecast Variance',
    description: 'Reviews new expense events and opens a Finance Case when a cost center goes over budget.',
    agentRole: 'You are a financial expense review specialist.',
    recordType: 'custom',
    agentDescriptor: 'created_by_build_agent',
    channel: 'nap',
    processingMessage: 'Reviewing the expense event and checking the cost center budget...',
    postProcessingMessage: 'Expense event review complete.',

    // Who can invoke the agent — restricted to admin
    securityAcl: {
        $id: Now.ID['forecast_variance_agent_acl'],
        type: 'Specific role',
        roles: [
            '2831a114c611228501d4ea6c309d626d', // admin
        ],
    },

    // Execution identity — runs as the invoking user, limited to admin role
    dataAccess: {
        roleMap: ['admin'],
        description: 'Admin-level data access for expense review.',
    },

    versionDetails: [
        {
            name: 'V1',
            number: 1,
            state: 'published',
            instructions: `You review new expense events and decide whether a cost center has gone over budget.

Step 1: Identify the expense event.
- Get the event ID from the task, or from the user's request if there is no task.
- Use the Extract Cost Center tool with the event ID to obtain the cost center and vendor.
- DO NOT PROCEED if no cost center is returned — tell the user the event could not be resolved.

Step 2: Review budget history.
- Use the Search for Cost Center History tool with the cost center from Step 1.
- Review the status of each fiscal month and state whether the months are mostly On Target, Over Budget, or Under Budget.

Step 3: Review vendor activity.
- Use the Search for Expense Transactions History tool with the cost center and the vendor from Step 1.
- State whether this vendor has transacted with this cost center before (yes if any transactions are returned, otherwise no).

Step 4: Analyze the variance.
- Use the Budget Variance Analysis tool with the cost center and the event ID from Step 1.
- Report its result. If a Finance Case was created, include the Finance Case number.

Step 5: Present results.
- Summarize Steps 2-4 in plain English as a short bulleted list.
- Use readable labels, not internal field names. Do not show sys_ids or raw JSON.`,
        },
    ],

    tools: [
        {
            name: 'Extract Cost Center',
            description: 'Extracts the cost center and vendor for an expense event. Requires the event ID.',
            type: 'subflow',
            subflowId: '7abcf500948a4992a72ee14042b72ee0',
            recordType: 'custom',
            executionMode: 'autopilot',
            preMessage: 'Extracting the cost center from the expense event...',
            postMessage: 'Cost center extracted.',
            maxAutoExecutions: 10,
        },
        {
            name: 'Search for Cost Center History',
            description:
                'Looks up Cost Center Budget History by cost center. Returns fiscal month, monthly budget, actual spend, and status.',
            type: 'crud',
            recordType: 'custom',
            executionMode: 'autopilot',
            preMessage: 'Looking up the cost center budget history...',
            postMessage: 'Budget history retrieved.',
            inputs: {
                operationName: 'lookup',
                table: 'x_snc_forecast_v_0_cost_center_budget_history',
                inputFields: [
                    {
                        name: 'cost_center',
                        description: 'The cost center to look up budget history for',
                        mandatory: true,
                    },
                ],
                queryCondition: 'cost_center={{cost_center}}',
                returnFields: [
                    { name: 'sys_id' },
                    { name: 'cost_center' },
                    { name: 'fiscal_month' },
                    { name: 'monthly_budget' },
                    { name: 'actual_spend' },
                    { name: 'status' },
                ],
            },
            maxAutoExecutions: 10,
        },
        {
            name: 'Search for Expense Transactions History',
            description:
                'Looks up expense transactions by cost center and vendor. Returns expense date, amount, and description.',
            type: 'crud',
            recordType: 'custom',
            executionMode: 'autopilot',
            preMessage: 'Looking up expense transactions for this vendor...',
            postMessage: 'Expense transactions retrieved.',
            inputs: {
                operationName: 'lookup',
                table: 'x_snc_forecast_v_0_expense_transactions',
                inputFields: [
                    {
                        name: 'cost_center',
                        description: 'The cost center to filter transactions',
                        mandatory: true,
                    },
                    {
                        name: 'vendor',
                        description: 'The vendor to filter transactions',
                        mandatory: true,
                    },
                ],
                queryCondition: 'cost_center={{cost_center}}^vendor={{vendor}}',
                returnFields: [
                    { name: 'sys_id' },
                    { name: 'cost_center' },
                    { name: 'vendor' },
                    { name: 'expense_date' },
                    { name: 'amount' },
                    { name: 'description' },
                ],
            },
            maxAutoExecutions: 10,
        },
        {
            name: 'Budget Variance Analysis',
            description:
                'Runs budget variance analysis for a cost center and opens a Finance Case if the cost center is over budget. Requires the cost center and the event ID.',
            type: 'subflow',
            subflowId: '71bddb4066d843399c80fecdf8a46f5f',
            recordType: 'custom',
            executionMode: 'autopilot',
            preMessage: 'Running budget variance analysis...',
            postMessage: 'Budget variance analysis complete.',
            maxAutoExecutions: 10,
        },
    ],

    triggerConfig: [
        {
            name: 'Expense Transaction Event Created',
            channel: 'Now Assist Panel',
            targetTable: 'x_snc_forecast_v_0_expense_transaction_event',
            triggerFlowDefinitionType: 'record_create',
            triggerCondition: 'vendorISNOTEMPTY',
            objectiveTemplate: 'Review expense event ${event_id}',
            runAs: 'owner',
            active: true,
            m2mSysOverrides: '',
            triggerFlow: '95c028d13b10df58a0db3141a3e45a80',
        },
    ],
    runAsUser: '',
})
