import { Alias } from '@servicenow/sdk/core'

// Connection & Credential Alias used by the "Get Expense Event" Flow Designer
// action to reach the external Expense Events API.
//
// The backing HTTP connection record (base URL, credentials) is environment-
// specific runtime data and is configured on the instance, not in Fluent source.
export const getExpenseEventAlias = Alias({
    $id: Now.ID['get_expense_event_alias'],
    name: 'Get Expense Event',
    type: 'connection',
    connectionType: 'httpConnection',
    description: 'HTTP connection & credential alias for the external Expense Events API.',
})
