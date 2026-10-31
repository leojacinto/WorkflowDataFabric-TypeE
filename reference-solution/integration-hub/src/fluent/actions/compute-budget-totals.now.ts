import { Action, wfa, actionStep } from '@servicenow/sdk/automation'
import { StringColumn, FloatColumn, BooleanColumn } from '@servicenow/sdk/core'

export const computeBudgetTotals = Action(
    {
        $id: Now.ID['compute_budget_totals'],
        name: 'Compute Budget Totals',
        description:
            'Totals FY2025 monthly budget and actual spend for a cost center, adds the event amount to the actual, and reports whether the new actual is over budget.',
        inputs: {
            cost_center: StringColumn({ label: 'Cost Center', mandatory: true }),
            event_id: StringColumn({ label: 'Event ID', mandatory: true }),
        },
        outputs: {
            new_actual: FloatColumn({ label: 'New Actual' }),
            total_budget: FloatColumn({ label: 'Total Budget' }),
            over_budget: BooleanColumn({ label: 'Over Budget' }),
            short_desc: StringColumn({ label: 'Short Description' }),
            owner_id: StringColumn({ label: 'Owner Sys ID' }),
        },
        internalName: 'compute_budget_totals',
        masterSnapshot: '2516dcd94718d754037d0fadf26d4392',
    },
    (params) => {
        const compute_budget_totals = wfa.actionStep(
            actionStep.script,
            { $id: Now.ID['cbt_script'], label: 'Compute budget totals' },
            {
                required_run_time: 'instance',
                script: Now.include('./scripts/compute-budget-totals.js'),
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
                    new_actual: FloatColumn({ label: 'New Actual' }),
                    total_budget: FloatColumn({ label: 'Total Budget' }),
                    over_budget: BooleanColumn({ label: 'Over Budget' }),
                    short_desc: StringColumn({ label: 'Short Description' }),
                    owner_id: StringColumn({ label: 'Owner Sys ID' }),
                },
                errorHandlingType: 'stop_the_action',
            }
        )

        wfa.assignActionOutputs(params.outputs, {
            new_actual: wfa.dataPill(compute_budget_totals.new_actual, 'float'),
            total_budget: wfa.dataPill(compute_budget_totals.total_budget, 'float'),
            over_budget: wfa.dataPill(compute_budget_totals.over_budget, 'boolean'),
            short_desc: wfa.dataPill(compute_budget_totals.short_desc, 'string'),
            owner_id: wfa.dataPill(compute_budget_totals.owner_id, 'string'),
        })
    }
)
