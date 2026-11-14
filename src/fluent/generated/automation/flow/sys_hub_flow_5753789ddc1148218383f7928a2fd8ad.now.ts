import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { StringColumn } from '@servicenow/sdk/core'

export const extract_cost_center = Subflow(
    {
        $id: Now.ID['5753789ddc1148218383f7928a2fd8ad'],
        name: 'Extract Cost Center',
        internalName: 'extract_cost_center',
        runAs: 'system',
        masterSnapshot: '9565cd4a47585710037d0fadf26d439a',
        inputs: {
            event_id: StringColumn({
                label: 'Event ID',
                mandatory: true,
            }),
        },
        outputs: {
            cost_center: StringColumn({
                label: 'Cost Center',
            }),
            vendor: StringColumn({
                label: 'Vendor',
            }),
        },
    },
    (_params) => {
        const actionInstance_1 = wfa.action(
            action.core.lookUpRecord,
            {
                $id: Now.ID['86d59a922b3a4c16b5852af04ee5812e'],
                annotation: 'Look up the Expense Transaction Event by Event ID',
            },
            {
                sort_type: 'sort_asc',
                conditions: `event_id=${wfa.dataPill(_params.inputs.event_id, 'string')}`,
                table: 'x_snc_forecast_v_0_expense_transaction_event',
                if_multiple_records_are_found_action: 'use_first_record',
                dont_fail_flow_on_error: false,
            }
        )
        wfa.flowLogic.assignSubflowOutputs(
            {
                $id: Now.ID['b62ab851410e4559b59ea574236150e1'],
            },
            _params.outputs,
            {
                cost_center: wfa.dataPill(actionInstance_1.Record.cost_center, 'string'),
                vendor: wfa.dataPill(actionInstance_1.Record.vendor, 'string'),
            }
        )
    }
)
