import { Subflow, wfa } from '@servicenow/sdk/automation'

export const get_expense_event = Subflow(
    {
        $id: Now.ID['32f26b62a55648acb0ee75c637680279'],
        name: 'Get Expense Event',
        internalName: 'get_expense_event',
        description: 'Runs the Get Expense Event action as the user who starts it.',
        masterSnapshot: '35ebb88a3bd85710a0db3141a3e45ad3',
    },
    (_params) => {
        wfa.action(
            '7cebf48a3bd85710a0db3141a3e45ab9',
            {
                $id: Now.ID['6b9a0f05d51441f5bb4847b0c1544b2f'],
            },
            {}
        )
    }
)
