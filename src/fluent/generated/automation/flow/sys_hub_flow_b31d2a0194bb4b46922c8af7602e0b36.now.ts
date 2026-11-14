import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { StringColumn } from '@servicenow/sdk/core'

export const budget_variance_analysis = Subflow(
    {
        $id: Now.ID['b31d2a0194bb4b46922c8af7602e0b36'],
        name: 'Budget Variance Analysis',
        internalName: 'budget_variance_analysis',
        runAs: 'system',
        masterSnapshot: 'e0654d4a47585710037d0fadf26d43ce',
        inputs: {
            event_id: StringColumn({
                label: 'Event ID',
                mandatory: true,
            }),
            cost_center: StringColumn({
                label: 'Cost Center',
                mandatory: true,
            }),
        },
        outputs: {
            result: StringColumn({
                label: 'Result',
            }),
            sum: StringColumn({
                label: 'Sum',
            }),
        },
    },
    (_params) => {
        const actionInstance_1 = wfa.action(
            '9755894a47585710037d0fadf26d4326',
            {
                $id: Now.ID['fb193a7b6c994e389c646e0cad64117d'],
                annotation: 'Compute budget totals for the cost center',
            },
            {
                cost_center: wfa.dataPill(_params.inputs.cost_center, 'string'),
                event_id: wfa.dataPill(_params.inputs.event_id, 'string'),
            }
        )
        wfa.flowLogic.if(
            {
                label: 'Over budget?',
                condition: `${wfa.dataPill(actionInstance_1.over_budget, 'boolean')}=true`,
                annotation: '',
                $id: Now.ID['44d0f65713b14f4294bdebd386cf0711'],
            },
            () => {
                const actionInstance_3 = wfa.action(
                    action.core.createRecord,
                    {
                        $id: Now.ID['11cf944e33b14d5a89ebff3eb5c60387'],
                        annotation: 'Create Finance Case',
                    },
                    {
                        table_name: 'sn_spend_sdc_service_request',
                        values: TemplateValue({
                            short_description: wfa.dataPill(actionInstance_1.short_description, 'string'),
                            assigned_to: wfa.dataPill(actionInstance_1.owner, 'string'),
                        }),
                    }
                )
                wfa.flowLogic.assignSubflowOutputs(
                    {
                        $id: Now.ID['c0b54169c16749bda8a145f05ca58be0'],
                    },
                    _params.outputs,
                    {
                        result: `${wfa.dataPill(actionInstance_3.record.number, 'string')} - ${wfa.dataPill(actionInstance_1.short_description, 'string')}`,
                        sum: wfa.dataPill(actionInstance_1.new_actual, 'string'),
                    }
                )
            }
        )
        wfa.flowLogic.else(
            {
                annotation: '',
                $id: Now.ID['df035b9882804c92940663c9d7b79372'],
            },
            () => {
                wfa.flowLogic.assignSubflowOutputs(
                    {
                        $id: Now.ID['c1131b5d58114421a64ef708d56381f7'],
                    },
                    _params.outputs,
                    {
                        result: 'Cost center is compliant with budget.',
                        sum: wfa.dataPill(actionInstance_1.new_actual, 'string'),
                    }
                )
            }
        )
    }
)
