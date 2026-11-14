/*
 * The same bundle serves two UI pages. x_snc_forecast_v_0_wdf_lab.do is the original lab.
 * x_snc_forecast_v_0_wdf_clab.do is the variant for lab.service-now.com instances (lef-nov-7021 and copies):
 * its guide text comes from lab-guide/clab and it has no External Content Connector exercise.
 */
export const IS_CLAB: boolean = /wdf_clab/i.test(window.location.pathname)
