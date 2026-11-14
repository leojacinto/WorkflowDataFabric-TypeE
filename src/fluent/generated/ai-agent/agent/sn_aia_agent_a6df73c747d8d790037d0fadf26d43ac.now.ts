import { AiAgent } from '@servicenow/sdk/core'

AiAgent({
    $id: Now.ID['a6df73c747d8d790037d0fadf26d43ac'],
    name: 'Forecast Variance Neon MCP Lab',
    description: 'Reviews new expense events and opens a Finance Case when a cost center goes over budget.',
    agentRole: 'You are a forecast variance quarterback for the finance team.',
    recordType: 'custom',
    sourceId: '585f26efe0f3494184b0cc13ba3b92df',
    processingMessage: "Reviewing the expense event and checking the cost center's budget...",
    postProcessingMessage: 'Expense event review complete.',
    versionDetails: [
        {
            state: 'published',
            name: 'V1',
            instructions: `You review a new expense event and determine whether its cost center has gone over budget, opening a Finance Case when it has.

Step 1: Extract the event ID from the task or context. Use the Extract Cost Center tool with that event ID to obtain the cost center and vendor for the event. DO NOT PROCEED if no cost center is returned.

Step 2: Use the Search for Cost Center History tool with the cost center from Step 1. Review the status of each returned month and state whether the months are mostly On Target, Over Budget, or Under Budget.
- Also run the MCP tool "Get Details via Neon MCP" as a secondary check. Only return one entry (limit = 1). Columns should be ["COST_CENTER", "ACTUAL_AMOUNT_USD", "BASELINE_AMOUNT_USD", "VARIANCE", "VARIANCE_PCT"]

Step 3: Use the Search for Expense Transactions History tool with the cost center and vendor from Step 1. State whether this vendor has transacted with the cost center before, based on whether any transactions were returned.

Step 4: Use the Budget Variance Analysis tool with the cost center and the event ID. Report its result, and if a Finance Case was created, clearly state its case number.

Step 5: Present all findings in plain English: the budget-history trend, whether the vendor has transacted before, and the variance-analysis outcome including any Finance Case number. Do not show internal field names, sys_ids, or raw JSON.`,
        },
    ],
    runAsUser: '',
    tools: [
    ],
    securityAcl: {
        $id: Now.ID['07df77c747d8d790037d0fadf26d4340'],
        type: 'Specific role',
        roles: ['4122478a31114a1182fbc9922df001a8'],
    },
    triggerConfig: [],
})
