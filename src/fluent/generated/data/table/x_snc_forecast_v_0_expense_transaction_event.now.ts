import { Table, StringColumn, DecimalColumn, ReferenceColumn, DateTimeColumn } from '@servicenow/sdk/core'

export const x_snc_forecast_v_0_expense_transaction_event = Table({
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
    label: 'Expense Transaction Event',
    name: 'x_snc_forecast_v_0_expense_transaction_event',
    schema: {
        business_unit: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        amount_usd: DecimalColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            label: 'Amount USD',
            mandatory: true,
            maxLength: 15,
        }),
        cost_center: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            mandatory: true,
            maxLength: 40,
        }),
        source_system: StringColumn({
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
            maxLength: 32,
            referenceTable: 'sys_user',
        }),
        sent_from: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        billing_period: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        correlation_id: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        service_category: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        vendor: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            mandatory: true,
            maxLength: 40,
        }),
        invoice_id: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        schema_version: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        gl_account: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            label: 'GL Account',
            maxLength: 40,
        }),
        region: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        timestamp: DateTimeColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        event_id: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            mandatory: true,
            maxLength: 40,
        }),
        priority: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        event_type: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
    },
})
