import { Action, wfa, actionStep } from '@servicenow/sdk/automation'
import { IntegerColumn, StringColumn } from '@servicenow/sdk/core'

// Flow Designer action: sends GET /api/expense-events through the
// "Get Expense Event" connection & credential alias and, for each event whose
// Event ID is not already stored, creates an Expense Transaction Event record
// (copying each same-named field; amount_usd commas are stripped; Owner is set
// to the running user).
export const getExpenseEventAction = Action(
    {
        $id: Now.ID['get_expense_event_action'],
        name: 'Get Expense Event',
        description:
            'Sends GET /api/expense-events through the "Get Expense Event" connection & credential alias and creates Expense Transaction Event records for events not already stored.',
        inputs: {},
        outputs: {
            fetched: IntegerColumn({ label: 'Events Fetched' }),
            created: IntegerColumn({ label: 'Records Created' }),
            skipped: IntegerColumn({ label: 'Events Skipped' }),
        },
        internalName: 'get_expense_event',
        masterSnapshot: 'e9c6401547dc9754037d0fadf26d43a4',
    },
    (params) => {
        const fetch_and_store_expense_events = wfa.actionStep(
            actionStep.script,
            { $id: Now.ID['get_expense_event_fetch'], label: 'Fetch and store expense events' },
            {
                required_run_time: 'instance',
                script: Now.include('./scripts/get-expense-events.js'),
                outputVariables: {
                    fetched: IntegerColumn({ label: 'Events Fetched' }),
                    created: IntegerColumn({ label: 'Records Created' }),
                    skipped: IntegerColumn({ label: 'Events Skipped' }),
                    events: StringColumn({
                        label: 'Events',
                        maxLength: 65000,
                    }),
                },
                errorHandlingType: 'stop_the_action',
            }
        )

        wfa.assignActionOutputs(params.outputs, {
            fetched: wfa.dataPill(fetch_and_store_expense_events.fetched, 'integer'),
            created: wfa.dataPill(fetch_and_store_expense_events.created, 'integer'),
            skipped: wfa.dataPill(fetch_and_store_expense_events.skipped, 'integer'),
        })
    }
)
