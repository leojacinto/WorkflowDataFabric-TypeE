import { Action, wfa, actionStep } from '@servicenow/sdk/automation'

export const get_expense_event = Action(
    {
        $id: Now.ID['255f44c7556740189bb2feea4ea5b39b'],
        name: 'Get Expense Event',
        internalName: 'get_expense_event',
        description:
            'Sends GET /api/expense-events through the Get Expense Event alias and creates an Expense Transaction Event record for each event whose Event ID is not already stored.',
        inputs: {},
        outputs: {},
        masterSnapshot: '7cebf48a3bd85710a0db3141a3e45ab9',
    },
    () => {
        wfa.actionStep(
            actionStep.script,
            {
                $id: Now.ID['f2c58b83948840af9d118c76709e36d6'],
                label: 'Fetch and store expense events',
            },
            {
                required_run_time: 'instance',
                script: Now.include('./scripts/f2c58b83948840af9d118c76709e36d6.js'),
                errorHandlingType: 'stop_the_action',
            }
        )
    }
)
