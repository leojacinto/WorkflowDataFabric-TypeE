import { Table, DateColumn, StringColumn, GenericColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_snc_forecast_v_0_expense_transactions = Table({
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'approved_by',
        },
    ],
    label: 'Expense Transactions',
    name: 'x_snc_forecast_v_0_expense_transactions',
    schema: {
        expense_date: DateColumn({
            maxLength: 40,
        }),
        gl_account: StringColumn({
            label: 'GL Account',
            maxLength: 40,
        }),
        cost_center: StringColumn({
            maxLength: 40,
        }),
        expense_category: StringColumn({
            maxLength: 40,
        }),
        description: StringColumn({
            maxLength: 40,
        }),
        amount: GenericColumn({
            attributes: {
                edge_encryption_enabled: true,
                omit_sys_original: true,
            },
            columnType: 'currency',
            maxLength: 20,
        }),
        expense_id: StringColumn({
            maxLength: 40,
        }),
        vendor: StringColumn({
            maxLength: 40,
        }),
        approved_by: ReferenceColumn({
            attributes: {
                edge_encryption_enabled: true,
                encode_utf8: false,
            },
            label: 'Approved by',
            maxLength: 40,
            referenceTable: 'sys_user',
        }),
    },
})
