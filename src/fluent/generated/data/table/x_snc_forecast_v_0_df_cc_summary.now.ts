import { Table, DecimalColumn, StringColumn, DateColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_snc_forecast_v_0_df_cc_summary = Table({
    attributes: {
        no_system_fields: true,
    },
    display: 'u_gl_account',
    label: 'Cost Center Budget Summary',
    name: 'x_snc_forecast_v_0_df_cc_summary',
    readOnly: true,
    schema: {
        u_variance_percent: DecimalColumn({
            scale: 2,
            label: 'Variance percent',
            maxLength: 38,
        }),
        u_fiscal_year: DecimalColumn({
            label: 'Fiscal year',
            maxLength: 38,
        }),
        u_period: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 16777216,
        }),
        u_forecast_source: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            label: 'Forecast source',
            maxLength: 16777216,
        }),
        u_gl_account: DecimalColumn({
            label: 'Gl account',
            maxLength: 38,
            primary: true,
        }),
        u_baseline_amount_usd: DecimalColumn({
            label: 'Baseline amount usd',
            maxLength: 38,
        }),
        u_variance: DecimalColumn({
            maxLength: 38,
        }),
        u_last_updated: DateColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            label: 'Last updated',
            maxLength: 40,
        }),
        u_actual_amount_usd: DecimalColumn({
            label: 'Actual amount usd',
            maxLength: 38,
        }),
        u_cost_center: ReferenceColumn({
            attributes: {
                encode_utf8: false,
            },
            label: 'Cost center',
            maxLength: 40,
            referenceTable: 'sn_erp_integration_cost_center',
            referenceKey: 'u_cost_center',
        }),
    },
})
