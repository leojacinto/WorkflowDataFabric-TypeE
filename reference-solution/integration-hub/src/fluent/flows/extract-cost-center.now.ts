import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { StringColumn } from '@servicenow/sdk/core'

export const extractCostCenter = Subflow(
    {
        $id: Now.ID['extract_cost_center'],
        name: 'Extract Cost Center',
        runAs: 'system',
        inputs: {
            event_id: StringColumn({ label: 'Event ID', mandatory: true }),
        },
        outputs: {
            cost_center: StringColumn({ label: 'Cost Center' }),
            vendor: StringColumn({ label: 'Vendor' }),
        },
        internalName: 'extract_cost_center',
        masterSnapshot: 'aa0194d14754d754037d0fadf26d43ad',
    },
    (params) => {
        const event = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['ecc_lookup_event'] },
            {
                table: 'x_snc_forecast_v_0_expense_transaction_event',
                conditions: `event_id=${wfa.dataPill(params.inputs.event_id, 'string')}`,
                sort_type: 'sort_asc',
                if_multiple_records_are_found_action: 'use_first_record',
                dont_fail_flow_on_error: false,
            }
        )

        wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['ecc_assign_outputs'] }, params.outputs, {
            cost_center: wfa.dataPill(event.Record.cost_center, 'string'),
            vendor: wfa.dataPill(event.Record.vendor, 'string'),
        })
    }
)
