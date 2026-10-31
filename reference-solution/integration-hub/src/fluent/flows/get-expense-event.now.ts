import { Subflow, wfa } from '@servicenow/sdk/automation'
import { getExpenseEventAction } from '../actions/get-expense-event.now'

// Subflow: runs the "Get Expense Event" action, which fetches the expense
// events and inserts any not already present in the Expense Transaction Event
// table. All fetch/dedup/create logic lives in the action. Runs as the invoking
// user so new records are owned by that user (an agent trigger later runs as the
// record's Owner).
export const getExpenseEventSubflow = Subflow(
    {
        $id: Now.ID['get_expense_event_subflow'],
        name: 'Get Expense Event',
        description:
            'Runs the Get Expense Event action to fetch expense events and insert any not already present in the Expense Transaction Event table.',
        runAs: 'user',
        inputs: {},
        outputs: {},
    },
    () => {
        wfa.action(
            getExpenseEventAction,
            { $id: Now.ID['run_get_expense_event'], annotation: 'Fetch and store expense events' },
            {}
        )
    }
)
