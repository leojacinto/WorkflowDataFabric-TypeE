import '@servicenow/sdk/global'
import { AiAgent } from '@servicenow/sdk/core'

// "Forecast Variance Integration Hub Trigger": the agent the 7021 test used.
// Converted by hand from the previous-version payload in the perelandra download (the SDK transform skips it because
// that record is a deleted base version there). All five tools are linked in
// ihub-agent-tool-links.now.ts (SDK tool ids come from the tool name, which collides with the Forecast Variance agent's tools). The long "proficiency" text is not carried over (the SDK's AiAgent type has no such field). The agent trigger (sn_aia_trigger_configuration 01be4c28...) is not converted.
AiAgent({
    $id: Now.ID['290bc4ec3b56765062f31831a3e45a86'],
    name: "Forecast Variance Integration Hub Trigger",
    description: "You are an expense management agent who can create cases based on budget variances.",
    agentRole: "Forecast Variance",
    recordType: 'custom',
    versionDetails: [
        {
            state: 'published',
            name: 'V1',
            number: 1,
            instructions: `1. When a new entry is created in x_snc_forecast_v_0_expense_transaction_event, you look up the cost center using "Extract Cost Center" tool. Alternatively, search the cost center using the event provided which has the prefix EXP followed by additional identifiers. The event ID format starts with EXP something like EXP-2025-IT-002-1007-01.

2. Get cost center obtained in "Extract Cost Center" and use that as input for "Search for Cost Center History" tool. Display the search output. Evaluate whether the results are mostly "On Target", "Over Budget", or "Under Budget."

3. Get cost center and vendor obtained in "Extract Cost Center" and use that as input for "Search for Expense Transactions History" tool. Indicate whether the same vendor has transacted in the past.

4. Finally execute "Budget Variance Analysis" using the data from "Extract Cost Center"`,
        },
    ],
    tools: [],
    securityAcl: {
        $id: Now.ID['ihub-trigger-agent-acl'],
        type: 'Any authenticated user',
    },
    dataAccess: {
        roleMap: ['admin'],
    },
    triggerConfig: [],
})
