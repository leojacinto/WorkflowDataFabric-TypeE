import { Flow, wfa, trigger } from '@servicenow/sdk/automation'

Flow(
    {
        $id: Now.ID['a94b28573b91be900ad1a021a3e45a76'],
        name: 'Trigger Variance Analysis',
        internalName: 'triger_variance_analysis_from_kafka_message',
        masterSnapshot: '5d8f05183b9a72900ad1a021a3e45a99',
    },
    wfa.trigger(
        trigger.record.createdOrUpdated,
        {
            $id: Now.ID['d45be0973b91be900ad1a021a3e45a6c'],
        },
        {
            table: 'x_snc_forecast_v_0_expense_transaction_event',
            condition: '^EQ',
            run_on_extended: 'false',
            run_flow_in: 'any',
            run_when_user_list: [],
            run_when_setting: 'both',
            run_when_user_setting: 'any',
            trigger_strategy: 'every',
        }
    ),
    (_params) => {
        wfa.subflow(
            'e18111543bda72900ad1a021a3e45a73',
            {
                $id: Now.ID['b3a191943bda72900ad1a021a3e45a77'],
                uuid: 'ec53ad97-cedb-4834-a76b-f3312e62cdae',
            },
            {
                // @ts-ignore TS4111: the trigger table type has no declared columns in this project
                cost_center: wfa.dataPill(_params.trigger.current.cost_center, 'string'),
                // @ts-ignore TS4111: same as above
                event_id: wfa.dataPill(_params.trigger.current.event_id, 'string'),
            }
        )
    }
)
