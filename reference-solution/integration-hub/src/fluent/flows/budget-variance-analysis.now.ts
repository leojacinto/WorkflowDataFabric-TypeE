import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { StringColumn, FloatColumn, BooleanColumn } from '@servicenow/sdk/core'
import { computeBudgetTotals } from '../actions/compute-budget-totals.now'

export const budgetVarianceAnalysis = Subflow(
    {
        $id: Now.ID['budget_variance_analysis'],
        name: 'Budget Variance Analysis',
        runAs: 'system',
        inputs: {
            cost_center: StringColumn({ label: 'Cost Center', mandatory: true }),
            event_id: StringColumn({ label: 'Event ID', mandatory: true }),
        },
        outputs: {
            message: StringColumn({ label: 'Message' }),
            sum: FloatColumn({ label: 'Sum' }),
        },
        internalName: 'budget_variance_analysis',
        masterSnapshot: '110190d14754d754037d0fadf26d4397',
        flowVariables: {
            over_budget: BooleanColumn({
                label: 'Over Budget',
            }),
            short_desc: StringColumn({
                label: 'Short Description',
            }),
            output_message: StringColumn({
                label: 'Output Message',
            }),
            new_actual: FloatColumn({
                label: 'New Actual',
            }),
        },
    },
    (params) => {
        // Look up the expense transaction event for the given Event ID.
        wfa.action(
            action.core.lookUpRecord,
            {
                $id: Now.ID['bva_lookup_event'],
            },
            {
                sort_type: 'sort_asc',
                conditions: `event_id=${wfa.dataPill(params.inputs.event_id, 'string')}`,
                table: 'x_snc_forecast_v_0_expense_transaction_event',
                if_multiple_records_are_found_action: 'use_first_record',
                dont_fail_flow_on_error: false,
            }
        )

        // Total FY2025 budget vs. actual spend, add the event amount to actual,
        // and determine whether the new actual exceeds the budget.
        const compute = wfa.action(
            computeBudgetTotals,
            { $id: Now.ID['bva_compute'] },
            {
                cost_center: wfa.dataPill(params.inputs.cost_center, 'string'),
                event_id: wfa.dataPill(params.inputs.event_id, 'string'),
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['bva_if_over'],
                condition: `${wfa.dataPill(compute.over_budget, 'boolean')}=true`,
                annotation: '',
            },
            () => {
                const financeCase = wfa.action(
                    action.core.createRecord,
                    { $id: Now.ID['bva_create_case'] },
                    {
                        table_name: 'sn_spend_sdc_service_request',
                        values: TemplateValue({
                            short_description: wfa.dataPill(compute.short_desc, 'string'),
                            assigned_to: wfa.dataPill(compute.owner_id, 'reference'),
                        }),
                    }
                )

                wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['bva_assign_over'] }, params.outputs, {
                    message: `${wfa.dataPill(financeCase.record.number, 'string')} - ${wfa.dataPill(compute.short_desc, 'string')}`,
                    sum: wfa.dataPill(compute.new_actual, 'float'),
                })
            }
        )

        wfa.flowLogic.else({ $id: Now.ID['bva_else_compliant'], annotation: '' }, () => {
            wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['bva_assign_compliant'] }, params.outputs, {
                message: 'Cost center is compliant with budget.',
                sum: wfa.dataPill(compute.new_actual, 'float'),
            })
        })
    }
)
