import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Links from the Integration Hub Trigger agent to tools that are not defined inline in its agent file.
// The tool records 8021ddea... (search retriever) and e2107907... (lookup) are not in this source; they resolve on an instance that has them.

Record({
    $id: Now.ID['2d0bc0203b96765062f31831a3e45a0e'],
    table: 'sn_aia_agent_tool_m2m',
    data: {
        active: "true",
        agent: "290bc4ec3b56765062f31831a3e45a86",
        description: "Get cost center and vendor obtained in \"Extract Cost Center\" and use that as input for \"Search for Expense Transactions History\" tool. Indicate whether the same vendor has transacted in the past.",
        display_output: "true",
        execution_mode: "autopilot",
        inputs: "[{\"name\":\"search_type\",\"description\":\"Search type\",\"value\":\"semantic\"},{\"name\":\"query\",\"description\":\"search query for retrieving relevant information from Expense Transactions Indexed Source\"},{\"name\":\"search_profile\",\"value\":\"x_snc_forecast_v_0_expense_transactions_search_profile\",\"label\":\"Expense Transactions Search Profile\",\"description\":\"Search profile\"},{\"name\":\"sources\",\"label\":[\"Expense Transactions Indexed Source\"],\"value\":[\"x_snc_forecast_v_0_expense_transactions\"],\"description\":\"Search sources\"},{\"name\":\"fields\",\"label\":[\"Vendor [x_snc_forecast_v_0_expense_transactions]\",\"Expense Category [x_snc_forecast_v_0_expense_transactions]\",\"Description [x_snc_forecast_v_0_expense_transactions]\"],\"value\":[\"x_snc_forecast_v_0_expense_transactions.vendor\",\"x_snc_forecast_v_0_expense_transactions.expense_category\",\"x_snc_forecast_v_0_expense_transactions.description\"],\"description\":\"Fields to be returned\"},{\"name\":\"document_match_threshold\",\"value\":0,\"description\":\"Document matching threshold\"},{\"name\":\"semantic_index_names\",\"label\":[\"ExpenseTransaction\"],\"value\":[\"ExpenseTransaction\"],\"description\":\"Semantic indexed fields\"}]",
        max_auto_executions: "10",
        name: "Search for Expense Transactions History",
        output_transformation_strategy: "custom",
        pre_run: "false",
        requires_text_refined_message: "false",
        requires_widget_transformation: "false",
        should_display_refined_message: "false",
        tool: "8021ddea2b0d52101d72fb466e91bfd1",
        tool_attributes: "{}",
        transformation_instructions: "Indicate if there are similar transactions for the vendor in the past based on the cost center being processed.",
        wait_for_widget_interaction: "false",
    },
})

Record({
    $id: Now.ID['e90bc0203b96765062f31831a3e45a15'],
    table: 'sn_aia_agent_tool_m2m',
    data: {
        active: "true",
        agent: "290bc4ec3b56765062f31831a3e45a86",
        description: "Get cost center obtained in \"Extract Cost Center\" and use that as input for \"Search for Cost Center History\" tool. Display the search output. Evaluate whether the results are mostly \"On Target\", \"Over Budget\", or \"Under Budget.\"",
        display_output: "true",
        execution_mode: "autopilot",
        inputs: "[{\"name\":\"search_type\",\"description\":\"Search type\",\"value\":\"semantic\"},{\"name\":\"query\",\"description\":\"search query for retrieving relevant information from Cost Center Budget History Indexed Source\"},{\"name\":\"search_profile\",\"value\":\"x_snc_forecast_v_0_cost_center_budget_history_search_profile\",\"label\":\"Cost Center Budget History Search Profile\",\"description\":\"Search profile\"},{\"name\":\"sources\",\"label\":[\"Cost Center Budget History Indexed Source\"],\"value\":[\"x_snc_forecast_v_0_cost_center_budget_history\"],\"description\":\"Search sources\"},{\"name\":\"search_results_limit\",\"value\":\"\",\"description\":\"Search results limit\"},{\"name\":\"document_match_threshold\",\"value\":0,\"description\":\"Document matching threshold\"},{\"name\":\"fields\",\"label\":[\"Cost Center [x_snc_forecast_v_0_cost_center_budget_history]\",\"Cost Center Description [x_snc_forecast_v_0_cost_center_budget_history]\"],\"value\":[\"x_snc_forecast_v_0_cost_center_budget_history.cost_center\",\"x_snc_forecast_v_0_cost_center_budget_history.cost_center_description\"],\"description\":\"Fields to be returned\"},{\"name\":\"semantic_index_names\",\"label\":[\"CostCenterBudgetHistory\"],\"value\":[\"CostCenterBudgetHistory\"],\"description\":\"Semantic indexed fields\"}]",
        max_auto_executions: "10",
        name: "Search for Cost Center History",
        output_transformation_strategy: "custom",
        pre_run: "false",
        requires_text_refined_message: "false",
        requires_widget_transformation: "false",
        should_display_refined_message: "false",
        tool: "8021ddea2b0d52101d72fb466e91bfd1",
        tool_attributes: "{}",
        transformation_instructions: "Evaluate whether the results are mostly \"On Target\", \"Over Budget\", or \"Under Budget.\" Do not display the search results.",
        wait_for_widget_interaction: "false",
    },
})

Record({
    $id: Now.ID['ee10f907018b32107f44189f958a047c'],
    table: 'sn_aia_agent_tool_m2m',
    data: {
        active: "true",
        agent: "290bc4ec3b56765062f31831a3e45a86",
        description: "Get event ID from x_snc_forecast_v_0_expense_transaction_event.",
        display_output: "true",
        execution_mode: "autopilot",
        inputs: "[{\"name\":\"crudInputs\",\"value\":{\"operation\":\"lookup\",\"table\":{\"value\":\"x_snc_forecast_v_0_expense_transaction_event\",\"displayValue\":\"Expense Transaction Event\"},\"query\":\"vendorISNOTEMPTY\",\"returnFields\":[{\"excludedOperators\":[],\"extendedOperators\":null,\"name\":\"event_id\",\"label\":\"Event ID\",\"type\":\"string\",\"referenceTable\":null,\"referenceTableDefaultField\":null,\"referenceKey\":null,\"dictionaryAttributes\":[{\"name\":\"edge_encryption_enabled\",\"value\":\"true\"}],\"id\":\"event_id\",\"sublabel\":\"event_id\"}],\"limit\":\"1\",\"orderBy\":\"sys_created_on\",\"sortType\":\"z_to_a\"},\"description\":\"CRUD Input Variables. These are already pre-defined. Under no circumstances should you prompt the user for this information or attempt to change these values.\"}]",
        max_auto_executions: "10",
        name: "Extract Event ID",
        output_transformation_strategy: "none",
        pre_run: "false",
        requires_text_refined_message: "false",
        requires_widget_transformation: "false",
        should_display_refined_message: "false",
        tool: "e2107907018b32107f44189f958a04cf",
        tool_attributes: "{}",
        wait_for_widget_interaction: "false",
    },
})


// The m2m links below point to the shipped subflow tools 70854bae... (Extract Cost Center, flow 65714b6e...) and bb8695d0... (Budget Variance Analysis, flow 2a71d914...).
// Those tool records are not defined here: the SDK maps tool ids by tool name, so defining them collides with the Forecast Variance agent's tools.

Record({
    $id: Now.ID['ed0bc0203b96765062f31831a3e45a07'],
    table: 'sn_aia_agent_tool_m2m',
    data: {
        active: "true",
        agent: "290bc4ec3b56765062f31831a3e45a86",
        description: "When a new entry is created in x_snc_forecast_v_0_expense_transaction_event, get the value of the field event_id from the table and use that value to look up the cost center. The event_id format starts with EXP something like EXP-2025-IT-002-1007-01 and is already in x_snc_forecast_v_0_expense_transaction_event table.",
        display_output: "true",
        execution_mode: "autopilot",
        inputs: "[]",
        max_auto_executions: "10",
        name: "Extract Cost Center",
        output_transformation_strategy: "none",
        pre_run: "false",
        requires_text_refined_message: "false",
        requires_widget_transformation: "false",
        should_display_refined_message: "false",
        tool: "70854bae3b4272900ad1a021a3e45a34",
        tool_attributes: "{}",
        wait_for_widget_interaction: "false",
    },
})

Record({
    $id: Now.ID['a90bc0203b96765062f31831a3e45a00'],
    table: 'sn_aia_agent_tool_m2m',
    data: {
        active: "true",
        agent: "290bc4ec3b56765062f31831a3e45a86",
        description: "Use the event ID and Cost Center from \"Extract Cost Center\" as inputs for this. Provide the details of the workflow execution and the Finance Case ID created for this workflow, add a link if possible.",
        display_output: "true",
        execution_mode: "autopilot",
        inputs: "[]",
        max_auto_executions: "10",
        name: "Budget Variance Analysis",
        output_transformation_strategy: "summary",
        pre_run: "false",
        requires_text_refined_message: "false",
        requires_widget_transformation: "false",
        should_display_refined_message: "false",
        tool: "bb8695d03b5e72900ad1a021a3e45ad4",
        tool_attributes: "{}",
        wait_for_widget_interaction: "false",
    },
})

