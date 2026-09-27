import { Table, ReferenceColumn, DateTimeColumn, StringColumn, DecimalColumn, ChoiceColumn } from '@servicenow/sdk/core'

export const x_snc_forecast_v_0_variance_task = Table({
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    extends: 'task',
    label: 'Variance Task',
    name: 'x_snc_forecast_v_0_variance_task',
    schema: {
        expense_transaction_event: ReferenceColumn({
            attributes: {
                edge_encryption_enabled: true,
                encode_utf8: false,
            },
            mandatory: true,
            maxLength: 32,
            referenceTable: 'x_snc_forecast_v_0.expense_transaction_event',
        }),
        created_date: DateTimeColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            mandatory: true,
            maxLength: 40,
        }),
        resolution_comments: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
        threshold_value: DecimalColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            mandatory: true,
            maxLength: 15,
        }),
        status: ChoiceColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            choices: {
                resolved: {
                    label: 'Resolved',
                },
                in_progress: {
                    label: 'In Progress',
                },
                new: {
                    label: 'New',
                },
                closed: {
                    label: 'Closed',
                },
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
            maxLength: 40,
        }),
        assignee: StringColumn({
            attributes: {
                edge_encryption_enabled: true,
            },
            maxLength: 40,
        }),
    },
})
