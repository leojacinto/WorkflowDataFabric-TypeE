import { Table, StringColumn, BasicImageColumn, Record } from '@servicenow/sdk/core'

export const x_snc_forecast_v_0_lab_asset = Table({
    label: 'Lab Asset',
    name: 'x_snc_forecast_v_0_lab_asset',
    schema: {
        name: StringColumn({ mandatory: true, maxLength: 100 }),
        image: BasicImageColumn({ maxLength: 100 }),
    },
})

Record({
    $id: Now.ID['lab-asset-home-building-for-whom'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'home/sc_slide_building_for_whom.gif',
        image: Now.attach('./home/sc_slide_building_for_whom.gif'),
    },
})

Record({
    $id: Now.ID['lab-asset-home-outcome-agent-flow'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'home/dataflow_outcome_agent_flow.png',
        image: Now.attach('./home/dataflow_outcome_agent_flow.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-home-readme-hero'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'home/sc_readme_hero.png',
        image: Now.attach('./home/sc_readme_hero.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-home-how-workshop-works'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'home/sc_slide_how_this_workshop_works.png',
        image: Now.attach('./home/sc_slide_how_this_workshop_works.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-backend-components-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_backend_components.png',
        image: Now.attach('./files/dataflow_backend_components.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-complete-landscape-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_complete_landscape.png',
        image: Now.attach('./files/dataflow_complete_landscape.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-external-content-connector-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_external_content_connector.png',
        image: Now.attach('./files/dataflow_external_content_connector.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-fundamentals-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_fundamentals.png',
        image: Now.attach('./files/dataflow_fundamentals.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-integration-hub-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_integration_hub.png',
        image: Now.attach('./files/dataflow_integration_hub.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-lens-document-intelligence-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_lens_document_intelligence.png',
        image: Now.attach('./files/dataflow_lens_document_intelligence.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-mcp-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_mcp.png',
        image: Now.attach('./files/dataflow_mcp.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-outcome-agent-flow-doc-intelligence-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_outcome_agent_flow_doc_intelligence.png',
        image: Now.attach('./files/dataflow_outcome_agent_flow_doc_intelligence.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-outcome-agent-flow-external-content-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_outcome_agent_flow_external_content.png',
        image: Now.attach('./files/dataflow_outcome_agent_flow_external_content.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-outcome-agent-flow-integration-hub-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_outcome_agent_flow_integration_hub.png',
        image: Now.attach('./files/dataflow_outcome_agent_flow_integration_hub.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-outcome-agent-flow-mcp-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_outcome_agent_flow_mcp.png',
        image: Now.attach('./files/dataflow_outcome_agent_flow_mcp.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-outcome-agent-flow-zero-copy-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_outcome_agent_flow_zero_copy.png',
        image: Now.attach('./files/dataflow_outcome_agent_flow_zero_copy.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-prerequisites-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_prerequisites.png',
        image: Now.attach('./files/dataflow_prerequisites.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-user-interaction-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_user_interaction.png',
        image: Now.attach('./files/dataflow_user_interaction.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-dataflow-zero-copy-connectors-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'dataflow_zero_copy_connectors.png',
        image: Now.attach('./files/dataflow_zero_copy_connectors.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-image-1-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'image (1).png',
        image: Now.attach('./files/image (1).png'),
    },
})

Record({
    $id: Now.ID['lab-asset-image-2-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'image (2).png',
        image: Now.attach('./files/image (2).png'),
    },
})

Record({
    $id: Now.ID['lab-asset-image-3-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'image (3).png',
        image: Now.attach('./files/image (3).png'),
    },
})

Record({
    $id: Now.ID['lab-asset-image-4-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'image (4).png',
        image: Now.attach('./files/image (4).png'),
    },
})

Record({
    $id: Now.ID['lab-asset-image-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'image.png',
        image: Now.attach('./files/image.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-kahoot-hype-screen-light-gif'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'kahoot_hype_screen_light.gif',
        image: Now.attach('./files/kahoot_hype_screen_light.gif'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-agent-studio-create-manage-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_agent_studio_create_manage.png',
        image: Now.attach('./files/sc_common_agent_studio_create_manage.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-agent-studio-users-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_agent_studio_users_nav.png',
        image: Now.attach('./files/sc_common_agent_studio_users_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-expense-event-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_expense_event_nav.png',
        image: Now.attach('./files/sc_common_expense_event_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-fow-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_fow_nav.png',
        image: Now.attach('./files/sc_common_fow_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-fow-system-user-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_fow_system_user.png',
        image: Now.attach('./files/sc_common_fow_system_user.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-index-budget-history-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_index_budget_history.png',
        image: Now.attach('./files/sc_common_index_budget_history.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-index-expense-transactions-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_index_expense_transactions.png',
        image: Now.attach('./files/sc_common_index_expense_transactions.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-indexed-sources-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_indexed_sources_nav.png',
        image: Now.attach('./files/sc_common_indexed_sources_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-logout-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_logout.png',
        image: Now.attach('./files/sc_common_logout.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-roles-tab-edit-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_roles_tab_edit.png',
        image: Now.attach('./files/sc_common_roles_tab_edit.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-save-and-continue-1-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_save_and_continue (1).png',
        image: Now.attach('./files/sc_common_save_and_continue (1).png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-search-admin-user-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_search_admin_user.png',
        image: Now.attach('./files/sc_common_search_admin_user.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-search-indexed-sources-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_search_indexed_sources.png',
        image: Now.attach('./files/sc_common_search_indexed_sources.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-common-troubleshoot-now-assist-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_common_troubleshoot_now_assist.png',
        image: Now.attach('./files/sc_common_troubleshoot_now_assist.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-data-source-create-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_data_source_create.png',
        image: Now.attach('./files/sc_data_source_create.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-data-source-json-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_data_source_json.png',
        image: Now.attach('./files/sc_data_source_json.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-data-source-new-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_data_source_new.png',
        image: Now.attach('./files/sc_data_source_new.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-data-source-save-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_data_source_save.png',
        image: Now.attach('./files/sc_data_source_save.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-data-source-start-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_data_source_start.png',
        image: Now.attach('./files/sc_data_source_start.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-data-source-test-load-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_data_source_test_load.png',
        image: Now.attach('./files/sc_data_source_test_load.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-demohub-instance-form-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_demohub_instance_form.png',
        image: Now.attach('./files/sc_demohub_instance_form.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-demohub-instance-ready-email-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_demohub_instance_ready_email.png',
        image: Now.attach('./files/sc_demohub_instance_ready_email.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-demohub-instances-available-br-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_demohub_instances_available_br.png',
        image: Now.attach('./files/sc_demohub_instances_available_br.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-demohub-manage-instances-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_demohub_manage_instances.png',
        image: Now.attach('./files/sc_demohub_manage_instances.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-demohub-no-instances-au-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_demohub_no_instances_au.png',
        image: Now.attach('./files/sc_demohub_no_instances_au.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-demohub-request-instance-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_demohub_request_instance.png',
        image: Now.attach('./files/sc_demohub_request_instance.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-demohub-stats-build-tag-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_demohub_stats_build_tag.png',
        image: Now.attach('./files/sc_demohub_stats_build_tag.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-demohub-submit-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_demohub_submit.png',
        image: Now.attach('./files/sc_demohub_submit.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-docker-image-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_docker_image.png',
        image: Now.attach('./files/sc_docker_image.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-docker-pull-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_docker_pull.png',
        image: Now.attach('./files/sc_docker_pull.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-docker-run-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_docker_run.png',
        image: Now.attach('./files/sc_docker_run.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-all-fields-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_all_fields.png',
        image: Now.attach('./files/sc_fund_all_fields.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-ba-result-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_ba_result.png',
        image: Now.attach('./files/sc_fund_ba_result.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-cat-complete-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_cat_complete.png',
        image: Now.attach('./files/sc_fund_cat_complete.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-cat-item-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_cat_item.png',
        image: Now.attach('./files/sc_fund_cat_item.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-create-scope-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_create_scope.png',
        image: Now.attach('./files/sc_fund_create_scope.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-dummy-scope-create-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_dummy_scope_create.png',
        image: Now.attach('./files/sc_fund_dummy_scope_create.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-exercise-scope-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_exercise_scope.png',
        image: Now.attach('./files/sc_fund_exercise_scope.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-field-details-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_field_details.png',
        image: Now.attach('./files/sc_fund_field_details.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-forcast-variance-dummy-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_forcast_variance_dummy.png',
        image: Now.attach('./files/sc_fund_forcast_variance_dummy.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-forcast-variance-scope-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_forcast_variance_scope.png',
        image: Now.attach('./files/sc_fund_forcast_variance_scope.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-new-field-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_new_field.png',
        image: Now.attach('./files/sc_fund_new_field.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-new-scope-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_new_scope.png',
        image: Now.attach('./files/sc_fund_new_scope.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-new-table-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_new_table.png',
        image: Now.attach('./files/sc_fund_new_table.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-new-table-details-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_new_table_details.png',
        image: Now.attach('./files/sc_fund_new_table_details.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-save-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_save.png',
        image: Now.attach('./files/sc_fund_save.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-scope-change-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_scope_change.png',
        image: Now.attach('./files/sc_fund_scope_change.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-stats-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_stats.png',
        image: Now.attach('./files/sc_fund_stats.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-fund-sysdef-tables-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_fund_sysdef_tables_nav.png',
        image: Now.attach('./files/sc_fund_sysdef_tables_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub.png',
        image: Now.attach('./files/sc_ihub.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-add-class-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_add_class.png',
        image: Now.attach('./files/sc_ihub_add_class.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-alternate-trigger-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_alternate_trigger.png',
        image: Now.attach('./files/sc_ihub_alternate_trigger.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-ba-result-1-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_ba_result_1.png',
        image: Now.attach('./files/sc_ihub_ba_result_1.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-ba-result-2-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_ba_result_2.png',
        image: Now.attach('./files/sc_ihub_ba_result_2.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-complete-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_complete.png',
        image: Now.attach('./files/sc_ihub_complete.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-create-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_create.png',
        image: Now.attach('./files/sc_ihub_create.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-expense-event-delete-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_expense_event_delete.png',
        image: Now.attach('./files/sc_ihub_expense_event_delete.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-finance-case-list-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_finance_case_list.png',
        image: Now.attach('./files/sc_ihub_finance_case_list.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-integration-result-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_integration_result.png',
        image: Now.attach('./files/sc_ihub_integration_result.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-linux-final-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_linux_final.png',
        image: Now.attach('./files/sc_ihub_linux_final.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-linux-host-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_linux_host.png',
        image: Now.attach('./files/sc_ihub_linux_host.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-linux-name-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_linux_name.png',
        image: Now.attach('./files/sc_ihub_linux_name.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-map-data-add-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_map_data_add.png',
        image: Now.attach('./files/sc_ihub_map_data_add.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-map-data-add-complete-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_map_data_add_complete.png',
        image: Now.attach('./files/sc_ihub_map_data_add_complete.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-map-data-complete-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_map_data_complete.png',
        image: Now.attach('./files/sc_ihub_map_data_complete.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-map-data-select-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_map_data_select.png',
        image: Now.attach('./files/sc_ihub_map_data_select.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-now-assist-badge-notification-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_now_assist_badge_notification.png',
        image: Now.attach('./files/sc_ihub_now_assist_badge_notification.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-now-assist-chat-expand-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_now_assist_chat_expand.png',
        image: Now.attach('./files/sc_ihub_now_assist_chat_expand.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-now-assist-panel-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_now_assist_panel.png',
        image: Now.attach('./files/sc_ihub_now_assist_panel.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-prepare-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_prepare.png',
        image: Now.attach('./files/sc_ihub_prepare.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-preview-data-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_preview_data.png',
        image: Now.attach('./files/sc_ihub_preview_data.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-preview-object-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_preview_object.png',
        image: Now.attach('./files/sc_ihub_preview_object.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-preview-sample-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_preview_sample.png',
        image: Now.attach('./files/sc_ihub_preview_sample.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-provide-basic-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_provide_basic.png',
        image: Now.attach('./files/sc_ihub_provide_basic.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-roles-sn-aia-save-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_roles_sn_aia_save.png',
        image: Now.attach('./files/sc_ihub_roles_sn_aia_save.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-rollback-integration-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_rollback_integration.png',
        image: Now.attach('./files/sc_ihub_rollback_integration.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-run-integration-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_run_integration.png',
        image: Now.attach('./files/sc_ihub_run_integration.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-select-class-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_select_class.png',
        image: Now.attach('./files/sc_ihub_select_class.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-select-linux-mapping-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_select_linux_mapping.png',
        image: Now.attach('./files/sc_ihub_select_linux_mapping.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-select-windows-mapping-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_select_windows_mapping.png',
        image: Now.attach('./files/sc_ihub_select_windows_mapping.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-specify-basic-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_specify_basic.png',
        image: Now.attach('./files/sc_ihub_specify_basic.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ihub-windows-final-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ihub_windows_final.png',
        image: Now.attach('./files/sc_ihub_windows_final.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-activate-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_activate.png',
        image: Now.attach('./files/sc_ldi_activate.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-ba-props-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_ba_props.png',
        image: Now.attach('./files/sc_ldi_ba_props.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-ba-runtime-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_ba_runtime.png',
        image: Now.attach('./files/sc_ldi_ba_runtime.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-choose-file-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_choose_file.png',
        image: Now.attach('./files/sc_ldi_choose_file.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-create-usecase-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_create_usecase.png',
        image: Now.attach('./files/sc_ldi_create_usecase.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-doc-extraction-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_doc_extraction_nav.png',
        image: Now.attach('./files/sc_ldi_doc_extraction_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-edit-extract-skill-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_edit_extract_skill.png',
        image: Now.attach('./files/sc_ldi_edit_extract_skill.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-extracted-info-view-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_extracted_info_view.png',
        image: Now.attach('./files/sc_ldi_extracted_info_view.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-finance-case-list-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_finance_case_list.png',
        image: Now.attach('./files/sc_ldi_finance_case_list.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-integrations-tab-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_integrations_tab.png',
        image: Now.attach('./files/sc_ldi_integrations_tab.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-lens-accept-defaults-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_lens_accept_defaults.png',
        image: Now.attach('./files/sc_ldi_lens_accept_defaults.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-lens-back-to-skills-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_lens_back_to_skills.png',
        image: Now.attach('./files/sc_ldi_lens_back_to_skills.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-lens-create-with-lens-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_lens_create_with_lens.png',
        image: Now.attach('./files/sc_ldi_lens_create_with_lens.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-lens-download-packages-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_lens_download_packages.png',
        image: Now.attach('./files/sc_ldi_lens_download_packages.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-lens-downloads-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_lens_downloads_nav.png',
        image: Now.attach('./files/sc_ldi_lens_downloads_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-lens-event-saved-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_lens_event_saved.png',
        image: Now.attach('./files/sc_ldi_lens_event_saved.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-lens-frame-analyze-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_lens_frame_analyze.png',
        image: Now.attach('./files/sc_ldi_lens_frame_analyze.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-lens-open-app-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_lens_open_app.png',
        image: Now.attach('./files/sc_ldi_lens_open_app.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-lens-record-populated-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_lens_record_populated.png',
        image: Now.attach('./files/sc_ldi_lens_record_populated.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-lens-turn-on-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_lens_turn_on.png',
        image: Now.attach('./files/sc_ldi_lens_turn_on.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-now-assist-skills-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_now_assist_skills_nav.png',
        image: Now.attach('./files/sc_ldi_now_assist_skills_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-return-to-platform-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_return_to_platform.png',
        image: Now.attach('./files/sc_ldi_return_to_platform.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-save-and-continue-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_save_and_continue.png',
        image: Now.attach('./files/sc_ldi_save_and_continue.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-save-or-submit-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_save_or_submit.png',
        image: Now.attach('./files/sc_ldi_save_or_submit.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-scope-forecast-variance-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_scope_forecast_variance.png',
        image: Now.attach('./files/sc_ldi_scope_forecast_variance.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-scope-global-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_scope_global.png',
        image: Now.attach('./files/sc_ldi_scope_global.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-skills-screen-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_skills_screen.png',
        image: Now.attach('./files/sc_ldi_skills_screen.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-state-wip-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_state_wip.png',
        image: Now.attach('./files/sc_ldi_state_wip.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-test-outputs-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_test_outputs.png',
        image: Now.attach('./files/sc_ldi_test_outputs.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-threshold-search-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_threshold_search.png',
        image: Now.attach('./files/sc_ldi_threshold_search.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-upload-document-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_upload_document.png',
        image: Now.attach('./files/sc_ldi_upload_document.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-upload-file-exit-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_upload_file_exit.png',
        image: Now.attach('./files/sc_ldi_upload_file_exit.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-usecase-config-overview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_usecase_config_overview.png',
        image: Now.attach('./files/sc_ldi_usecase_config_overview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-ldi-variance-task-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_ldi_variance_task_nav.png',
        image: Now.attach('./files/sc_ldi_variance_task_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-add-neon-server-details-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_add_neon_server_details.png',
        image: Now.attach('./files/sc_mcp_add_neon_server_details.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-add-tool-neon-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_add_tool_neon.png',
        image: Now.attach('./files/sc_mcp_add_tool_neon.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-agent-studio-settings-nav-3-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_agent_studio_settings_nav (3).png',
        image: Now.attach('./files/sc_mcp_agent_studio_settings_nav (3).png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-channels-status-neon-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_channels_status_neon.png',
        image: Now.attach('./files/sc_mcp_channels_status_neon.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-duplicate-agent-menu-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_duplicate_agent_menu.png',
        image: Now.attach('./files/sc_mcp_duplicate_agent_menu.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-duplicate-confirm-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_duplicate_confirm.png',
        image: Now.attach('./files/sc_mcp_duplicate_confirm.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-duplicate-warning-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_duplicate_warning.png',
        image: Now.attach('./files/sc_mcp_duplicate_warning.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-manage-servers-new-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_manage_servers_new.png',
        image: Now.attach('./files/sc_mcp_manage_servers_new.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-rename-agent-neon-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_rename_agent_neon.png',
        image: Now.attach('./files/sc_mcp_rename_agent_neon.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-save-and-continue-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_save_and_continue.png',
        image: Now.attach('./files/sc_mcp_save_and_continue.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-security-defaults-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_security_defaults.png',
        image: Now.attach('./files/sc_mcp_security_defaults.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-select-neon-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_select_neon.png',
        image: Now.attach('./files/sc_mcp_select_neon.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-test-input-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_test_input.png',
        image: Now.attach('./files/sc_mcp_test_input.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-test-results-neon-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_test_results_neon.png',
        image: Now.attach('./files/sc_mcp_test_results_neon.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-test-running-neon-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_test_running_neon.png',
        image: Now.attach('./files/sc_mcp_test_running_neon.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-tool-settings-neon-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_tool_settings_neon.png',
        image: Now.attach('./files/sc_mcp_tool_settings_neon.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-tools-section-neon-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_tools_section_neon.png',
        image: Now.attach('./files/sc_mcp_tools_section_neon.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-variance-baseline-neon-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_variance_baseline_neon.png',
        image: Now.attach('./files/sc_mcp_variance_baseline_neon.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-cleanup-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_cleanup.png',
        image: Now.attach('./files/sc_producer_cleanup.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-connect-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_connect.png',
        image: Now.attach('./files/sc_producer_connect.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-download-certificate-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_download_certificate.png',
        image: Now.attach('./files/sc_producer_download_certificate.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-exec-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_exec.png',
        image: Now.attach('./files/sc_producer_exec.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-generate-certificate-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_generate_certificate.png',
        image: Now.attach('./files/sc_producer_generate_certificate.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-import-cert-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_import_cert.png',
        image: Now.attach('./files/sc_producer_import_cert.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-import-cert-upload-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_import_cert_upload.png',
        image: Now.attach('./files/sc_producer_import_cert_upload.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-message-sent-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_message_sent.png',
        image: Now.attach('./files/sc_producer_message_sent.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-namespaces-selected-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_namespaces_selected.png',
        image: Now.attach('./files/sc_producer_namespaces_selected.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-password-acl-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_password_acl.png',
        image: Now.attach('./files/sc_producer_password_acl.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-pki-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_pki.png',
        image: Now.attach('./files/sc_producer_pki.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-properties-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_properties.png',
        image: Now.attach('./files/sc_producer_properties.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-properties-content-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_properties_content.png',
        image: Now.attach('./files/sc_producer_properties_content.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-select-namespace-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_select_namespace.png',
        image: Now.attach('./files/sc_producer_select_namespace.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-select-topic-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_select_topic.png',
        image: Now.attach('./files/sc_producer_select_topic.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-servers-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_servers.png',
        image: Now.attach('./files/sc_producer_servers.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-servers-validate-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_servers_validate.png',
        image: Now.attach('./files/sc_producer_servers_validate.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-start-container-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_start_container.png',
        image: Now.attach('./files/sc_producer_start_container.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-producer-topic-selected-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_producer_topic_selected.png',
        image: Now.attach('./files/sc_producer_topic_selected.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-sc-active-consumer-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_sc_active_consumer.png',
        image: Now.attach('./files/sc_sc_active_consumer.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-sc-active-consumer-stats-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_sc_active_consumer_stats.png',
        image: Now.attach('./files/sc_sc_active_consumer_stats.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-sc-active-rte-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_sc_active_rte.png',
        image: Now.attach('./files/sc_sc_active_rte.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-sc-active-stream-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_sc_active_stream.png',
        image: Now.attach('./files/sc_sc_active_stream.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-sc-create-consumer-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_sc_create_consumer.png',
        image: Now.attach('./files/sc_sc_create_consumer.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-sc-etl-consumer-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_sc_etl_consumer.png',
        image: Now.attach('./files/sc_sc_etl_consumer.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-sc-home-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_sc_home.png',
        image: Now.attach('./files/sc_sc_home.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-sc-kafka-stream-back-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_sc_kafka_stream_back.png',
        image: Now.attach('./files/sc_sc_kafka_stream_back.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-sc-new-kafka-stream-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_sc_new_kafka_stream.png',
        image: Now.attach('./files/sc_sc_new_kafka_stream.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-sc-rte-consumer-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_sc_rte_consumer.png',
        image: Now.attach('./files/sc_sc_rte_consumer.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-docintel-demo-preview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_docintel_demo_preview.png',
        image: Now.attach('./files/sc_slide_docintel_demo_preview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-e2e-architecture-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_e2e_architecture.png',
        image: Now.attach('./files/sc_slide_e2e_architecture.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-fundamentals-overview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_fundamentals_overview.png',
        image: Now.attach('./files/sc_slide_fundamentals_overview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-inthub-demo-preview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_inthub_demo_preview.png',
        image: Now.attach('./files/sc_slide_inthub_demo_preview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-inthub-overview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_inthub_overview.png',
        image: Now.attach('./files/sc_slide_inthub_overview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-key-takeaways-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_key_takeaways.png',
        image: Now.attach('./files/sc_slide_key_takeaways.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-lab-dependencies-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_lab_dependencies.png',
        image: Now.attach('./files/sc_slide_lab_dependencies.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-lens-docintel-overview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_lens_docintel_overview.png',
        image: Now.attach('./files/sc_slide_lens_docintel_overview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-mcp-demo-preview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_mcp_demo_preview.png',
        image: Now.attach('./files/sc_slide_mcp_demo_preview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-mcp-overview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_mcp_overview.png',
        image: Now.attach('./files/sc_slide_mcp_overview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-xcc-demo-preview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_xcc_demo_preview.png',
        image: Now.attach('./files/sc_slide_xcc_demo_preview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-xcc-overview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_xcc_overview.png',
        image: Now.attach('./files/sc_slide_xcc_overview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-zerocopy-demo-preview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_zerocopy_demo_preview.png',
        image: Now.attach('./files/sc_slide_zerocopy_demo_preview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-zerocopy-how-it-works-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_zerocopy_how_it_works.png',
        image: Now.attach('./files/sc_slide_zerocopy_how_it_works.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-slide-zerocopy-overview-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_slide_zerocopy_overview.png',
        image: Now.attach('./files/sc_slide_zerocopy_overview.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-connection-config-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_connection_config.png',
        image: Now.attach('./files/sc_xcc_connection_config.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-connection-success-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_connection_success.png',
        image: Now.attach('./files/sc_xcc_connection_success.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-crawl-proceed-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_crawl_proceed.png',
        image: Now.attach('./files/sc_xcc_crawl_proceed.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-crawl-save-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_crawl_save.png',
        image: Now.attach('./files/sc_xcc_crawl_save.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-crawl-settings-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_crawl_settings.png',
        image: Now.attach('./files/sc_xcc_crawl_settings.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-crawls-complete-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_crawls_complete.png',
        image: Now.attach('./files/sc_xcc_crawls_complete.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-deselect-ais-role-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_deselect_ais_role.png',
        image: Now.attach('./files/sc_xcc_deselect_ais_role.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-elevate-role-menu-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_elevate_role_menu.png',
        image: Now.attach('./files/sc_xcc_elevate_role_menu.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-elevate-select-ais-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_elevate_select_ais.png',
        image: Now.attach('./files/sc_xcc_elevate_select_ais.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-employee-center-home-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_employee_center_home.png',
        image: Now.attach('./files/sc_xcc_employee_center_home.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-employee-center-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_employee_center_nav.png',
        image: Now.attach('./files/sc_xcc_employee_center_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-full-crawl-options-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_full_crawl_options.png',
        image: Now.attach('./files/sc_xcc_full_crawl_options.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-home-create-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_home_create.png',
        image: Now.attach('./files/sc_xcc_home_create.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-mapping-test-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_mapping_test.png',
        image: Now.attach('./files/sc_xcc_mapping_test.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-now-assist-query-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_now_assist_query.png',
        image: Now.attach('./files/sc_xcc_now_assist_query.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-overbudget-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_overbudget.png',
        image: Now.attach('./files/sc_xcc_overbudget.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-prep-add-ais-role-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_prep_add_ais_role.png',
        image: Now.attach('./files/sc_xcc_prep_add_ais_role.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-prep-email-roles-edit-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_prep_email_roles_edit.png',
        image: Now.attach('./files/sc_xcc_prep_email_roles_edit.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-prep-save-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_prep_save.png',
        image: Now.attach('./files/sc_xcc_prep_save.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-response-detail-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_response_detail.png',
        image: Now.attach('./files/sc_xcc_response_detail.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-select-source-sharepoint-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_select_source_sharepoint.png',
        image: Now.attach('./files/sc_xcc_select_source_sharepoint.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-xcc-xcc-home-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_xcc_xcc_home.png',
        image: Now.attach('./files/sc_xcc_xcc_home.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-agent-studio-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_agent_studio_nav.png',
        image: Now.attach('./files/sc_zcc_agent_studio_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-agent-studio-search-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_agent_studio_search.png',
        image: Now.attach('./files/sc_zcc_agent_studio_search.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-ba-agent-manual-test-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_ba_agent_manual_test.png',
        image: Now.attach('./files/sc_zcc_ba_agent_manual_test.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-ba-agent-test-run-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_ba_agent_test_run.png',
        image: Now.attach('./files/sc_zcc_ba_agent_test_run.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-ba-agent-testing-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_ba_agent_testing.png',
        image: Now.attach('./files/sc_zcc_ba_agent_testing.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-ba-approve-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_ba_approve.png',
        image: Now.attach('./files/sc_zcc_ba_approve.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-ba-new-conversation-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_ba_new_conversation.png',
        image: Now.attach('./files/sc_zcc_ba_new_conversation.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-bapi-configured-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_bapi_configured.png',
        image: Now.attach('./files/sc_zcc_bapi_configured.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-cc-target-table-list-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_cc_target_table_list.png',
        image: Now.attach('./files/sc_zcc_cc_target_table_list.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-choose-outputs-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_choose_outputs.png',
        image: Now.attach('./files/sc_zcc_choose_outputs.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-click-read-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_click_read.png',
        image: Now.attach('./files/sc_zcc_click_read.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-clone-model-details-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_clone_model_details.png',
        image: Now.attach('./files/sc_zcc_clone_model_details.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-clone-popup-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_clone_popup.png',
        image: Now.attach('./files/sc_zcc_clone_popup.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-dp-cost-center-click-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_dp_cost_center_click.png',
        image: Now.attach('./files/sc_zcc_dp_cost_center_click.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-erp-home-layout-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_erp_home_layout.png',
        image: Now.attach('./files/sc_zcc_erp_home_layout.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-erp-home-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_erp_home_nav.png',
        image: Now.attach('./files/sc_zcc_erp_home_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-extraction-tables-filter-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_extraction_tables_filter.png',
        image: Now.attach('./files/sc_zcc_extraction_tables_filter.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-finance-case-list-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_finance_case_list.png',
        image: Now.attach('./files/sc_zcc_finance_case_list.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-forecast-variance-agent-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_forecast_variance_agent.png',
        image: Now.attach('./files/sc_zcc_forecast_variance_agent.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-model-config-save-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_model_config_save.png',
        image: Now.attach('./files/sc_zcc_model_config_save.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-models-filter-cost-center-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_models_filter_cost_center.png',
        image: Now.attach('./files/sc_zcc_models_filter_cost_center.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-confirm-pk-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_confirm_pk.png',
        image: Now.attach('./files/sc_zcc_pg_confirm_pk.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-connection-details-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_connection_details.png',
        image: Now.attach('./files/sc_zcc_pg_connection_details.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-cost-center-reference-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_cost_center_reference.png',
        image: Now.attach('./files/sc_zcc_pg_cost_center_reference.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-data-assets-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_data_assets.png',
        image: Now.attach('./files/sc_zcc_pg_data_assets.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-df-label-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_df_label.png',
        image: Now.attach('./files/sc_zcc_pg_df_label.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-df-list-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_df_list.png',
        image: Now.attach('./files/sc_zcc_pg_df_list.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-established-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_established.png',
        image: Now.attach('./files/sc_zcc_pg_established.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_nav.png',
        image: Now.attach('./files/sc_zcc_pg_nav.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-open-list-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_open_list.png',
        image: Now.attach('./files/sc_zcc_pg_open_list.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-primary-key-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_primary_key.png',
        image: Now.attach('./files/sc_zcc_pg_primary_key.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-select-columns-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_select_columns.png',
        image: Now.attach('./files/sc_zcc_pg_select_columns.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-pg-set-reference-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_pg_set_reference.png',
        image: Now.attach('./files/sc_zcc_pg_set_reference.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-role-messages-save-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_role_messages_save.png',
        image: Now.attach('./files/sc_zcc_role_messages_save.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-roles-erp-admin-save-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_roles_erp_admin_save.png',
        image: Now.attach('./files/sc_zcc_roles_erp_admin_save.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-sap-cost-center-click-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_sap_cost_center_click.png',
        image: Now.attach('./files/sc_zcc_sap_cost_center_click.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-specify-inputs-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_specify_inputs.png',
        image: Now.attach('./files/sc_zcc_specify_inputs.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-zcc-target-table-link-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_zcc_target_table_link.png',
        image: Now.attach('./files/sc_zcc_target_table_link.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-wdf-connectors-banner-gif'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'wdf_connectors_banner.gif',
        image: Now.attach('./files/wdf_connectors_banner.gif'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-agentic-solutions-nav-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_agentic_solutions_nav.png',
        image: Now.attach('./files/sc_mcp_aia_agentic_solutions_nav.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-agent-canvas-edit-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_agent_canvas_edit.png',
        image: Now.attach('./files/sc_mcp_aia_agent_canvas_edit.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-add-tool-menu-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_add_tool_menu.png',
        image: Now.attach('./files/sc_mcp_aia_add_tool_menu.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-tool-type-menu-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_tool_type_menu.png',
        image: Now.attach('./files/sc_mcp_aia_tool_type_menu.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-select-server-tool-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_select_server_tool.png',
        image: Now.attach('./files/sc_mcp_aia_select_server_tool.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-tool-settings-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_tool_settings.png',
        image: Now.attach('./files/sc_mcp_aia_tool_settings.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-agent-tools-saved-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_agent_tools_saved.png',
        image: Now.attach('./files/sc_mcp_aia_agent_tools_saved.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-run-test-dialog-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_run_test_dialog.png',
        image: Now.attach('./files/sc_mcp_aia_run_test_dialog.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-event-list-empty-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_event_list_empty.png',
        image: Now.attach('./files/sc_mcp_event_list_empty.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-event-list-row-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_event_list_row.png',
        image: Now.attach('./files/sc_mcp_event_list_row.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-settings-mcp-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_settings_mcp.png',
        image: Now.attach('./files/sc_mcp_aia_settings_mcp.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-servers-list-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_servers_list.png',
        image: Now.attach('./files/sc_mcp_aia_servers_list.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-server-add-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_server_add.png',
        image: Now.attach('./files/sc_mcp_aia_server_add.png'),
    },
})


Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-server-created-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_server_created.png',
        image: Now.attach('./files/sc_mcp_aia_server_created.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-aia-trace-log-result-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_aia_trace_log_result.png',
        image: Now.attach('./files/sc_mcp_aia_trace_log_result.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-fix-strategy-blank-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_fix_strategy_blank.png',
        image: Now.attach('./files/sc_mcp_fix_strategy_blank.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-fix-strategy-pick-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_fix_strategy_pick.png',
        image: Now.attach('./files/sc_mcp_fix_strategy_pick.png'),
    },
})

Record({
    $id: Now.ID['lab-asset-sc-mcp-fix-strategy-saved-png'],
    table: 'x_snc_forecast_v_0_lab_asset',
    data: {
        name: 'sc_mcp_fix_strategy_saved.png',
        image: Now.attach('./files/sc_mcp_fix_strategy_saved.png'),
    },
})
