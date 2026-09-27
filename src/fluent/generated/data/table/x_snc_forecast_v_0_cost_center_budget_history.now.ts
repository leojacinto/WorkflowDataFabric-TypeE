import { Table, StringColumn, IntegerColumn, DecimalColumn, GenericColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_snc_forecast_v_0_cost_center_budget_history = Table({
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'owner',
        },
    ],
    label: 'Cost Center Budget History',
    name: 'x_snc_forecast_v_0_cost_center_budget_history',
    schema: {
        cost_center_description: StringColumn({
            maxLength: 40,
        }),
        fiscal_year: IntegerColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        variance_pct: DecimalColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            label: 'Variance Percent',
            maxLength: 20,
        }),
        status: StringColumn({
            maxLength: 40,
        }),
        monthly_budget: GenericColumn({
            attributes: {
                edge_encryption_enabled: true,
                omit_sys_original: true,
            },
            columnType: 'currency',
            maxLength: 20,
        }),
        actual_spend: GenericColumn({
            attributes: {
                edge_encryption_enabled: true,
                omit_sys_original: true,
            },
            columnType: 'currency',
            maxLength: 20,
        }),
        cost_center: StringColumn({
            maxLength: 40,
        }),
        fiscal_month: IntegerColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        owner: ReferenceColumn({
            attributes: {
                edge_encryption_enabled: true,
                encode_utf8: false,
            },
            maxLength: 40,
            referenceTable: 'sys_user',
        }),
        variance: GenericColumn({
            attributes: {
                edge_encryption_enabled: true,
                omit_sys_original: true,
            },
            columnType: 'currency',
            maxLength: 20,
        }),
    },
})
