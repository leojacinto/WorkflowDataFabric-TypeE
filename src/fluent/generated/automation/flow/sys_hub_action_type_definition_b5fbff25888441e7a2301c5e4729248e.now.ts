import { Action, wfa, actionStep } from '@servicenow/sdk/automation'
import { StringColumn, BooleanColumn } from '@servicenow/sdk/core'

export const compute_budget_totals = Action(
    {
        $id: Now.ID['b5fbff25888441e7a2301c5e4729248e'],
        name: 'Compute Budget Totals',
        internalName: 'compute_budget_totals',
        description:
            'Totals Monthly Budget and Actual Spend for a cost center in Cost Center Budget History (FY2025) and adds the expense event amount to the actual.',
        inputs: {
            cost_center: StringColumn({
                label: 'Cost Center',
                mandatory: true,
            }),
            event_id: StringColumn({
                label: 'Event ID',
                mandatory: true,
            }),
        },
        outputs: {
            over_budget: BooleanColumn({
                label: 'Over Budget',
            }),
            new_actual: StringColumn({
                label: 'New Actual',
            }),
            short_description: StringColumn({
                label: 'Short Description',
            }),
            owner: StringColumn({
                label: 'Owner',
            }),
        },
        masterSnapshot: '9755894a47585710037d0fadf26d4326',
    },
    (params) => {
        const compute_budget_totals = wfa.actionStep(
            actionStep.script,
            {
                $id: Now.ID['02ed6ae13045489f9575a52beb445773'],
                label: 'Compute budget totals',
            },
            {
                required_run_time: 'instance',
                script: Now.include('./scripts/02ed6ae13045489f9575a52beb445773.js'),
                errorHandlingType: 'stop_the_action',
                inputVariables: {
                    cost_center: {
                        label: 'Cost Center',
                        value: wfa.dataPill(params.inputs.cost_center, 'string'),
                    },
                    event_id: {
                        label: 'Event ID',
                        value: wfa.dataPill(params.inputs.event_id, 'string'),
                    },
                },
                outputVariables: {
                    owner: StringColumn({
                        label: 'Owner',
                    }),
                    short_description: StringColumn({
                        label: 'Short Description',
                    }),
                    new_actual: StringColumn({
                        label: 'New Actual',
                    }),
                    over_budget: BooleanColumn({
                        label: 'Over Budget',
                    }),
                },
            }
        )
        wfa.assignActionOutputs(params.outputs, {
            over_budget: wfa.dataPill(compute_budget_totals.over_budget, 'boolean'),
            new_actual: wfa.dataPill(compute_budget_totals.new_actual, 'string'),
            owner: wfa.dataPill(compute_budget_totals.owner, 'string'),
            short_description: wfa.dataPill(compute_budget_totals.short_description, 'string'),
        })
    }
)
