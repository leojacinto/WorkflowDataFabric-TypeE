import { Record } from '@servicenow/sdk/core'

// Public Pages record: makes the guide page x_snc_forecast_v_0_wdf_lab.do open without login.
// Same sys_id as the XML build entry in Forecast-Variance-Lab-Update-Set/scripts/make_update_set.py.
Record({
    $id: Now.ID['6b4470b665325971540deb7daf4e8d62'],
    table: 'sys_public',
    data: {
        page: 'x_snc_forecast_v_0_wdf_lab',
        active: true,
    },
})
