import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import page from '../../client/index.html'

// Lab guide variant for lab.service-now.com instances (lef-nov-7021 and copies).
// Endpoint ends in "clab", not "lab_clab". The original page x_snc_forecast_v_0_wdf_lab.do is not touched.
export const wdf_clab = UiPage({
    $id: Now.ID['ui-page-wdf-clab'],
    category: 'general',
    endpoint: 'x_snc_forecast_v_0_wdf_clab.do',
    description: 'WDF Lab guide variant for lab.service-now.com instances (lef-nov-7021 and copies)',
    html: page,
    direct: true,
})
