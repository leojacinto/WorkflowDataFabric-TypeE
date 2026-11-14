import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Neon MCP tool for the agent "Forecast Variance Neon MCP Lab" (perelandra, 2026-11-09).
// The SDK's AiAgent tool type 'mcp' cannot name an MCP server, so the tool and its agent link are plain records.
// The MCP server itself is in ../other/sn-mcp-server and the agent in ../ai-agent/agent.

Record({
    $id: Now.ID['01b7918447e85310037d0fadf26d4373'],
    table: 'sn_aia_tool',
    data: {
        active: "true",
        description: `project_id: bitter-lab-28038915 (snake_case, not projectId)
sql: SELECT cost_center, actual_amount_usd, baseline_amount_usd, variance, variance_pct FROM "VARIANCE_BASELINE_V" WHERE cost_center = '{{cost_center}}' LIMIT 1`,
        input_schema: "[{\"name\":\"sql\",\"description\":\"The SQL query to execute\",\"mandatory\":true},{\"name\":\"project_id\",\"description\":\"The ID of the project to execute the query against. Required for an unscoped connection. May be omitted when the connection is scoped to one project; if provided, it must match that project.\",\"mandatory\":false},{\"name\":\"branch_id\",\"description\":\"An optional ID of the branch to execute the query against. If not provided the default branch is used.\",\"mandatory\":false},{\"name\":\"database_name\",\"description\":\"The name of the database. If not provided, the default neondb or first available database is used.\",\"mandatory\":false},{\"name\":\"role_name\",\"description\":\"An optional Postgres role to log in as. The server resolves its credentials internally and never returns them. If not provided, the database owner is used. On a connection pinned to a role, omit this or pass that role.\",\"mandatory\":false},{\"name\":\"compute_id\",\"description\":\"An optional ID of the compute/endpoint to run on. If not provided, the read-write compute of the branch is used.\",\"mandatory\":false},{\"name\":\"max_rows\",\"description\":\"Maximum number of rows to return per statement. When a statement returns more, the response adds a second block with `totalRowCount` and `truncated: true`; raise this only then.\",\"mandatory\":false}]",
        name: "Get Details via Neon MCP",
        record_type: "custom",
        target_document: "da53518047285310037d0fadf26d43e0",
        target_document_table: "sn_mcp_server",
        type: "mcp",
    },
})

Record({
    $id: Now.ID['81b7918447e85310037d0fadf26d4399'],
    table: 'sn_aia_agent_tool_m2m',
    data: {
        active: "true",
        agent: "a6df73c747d8d790037d0fadf26d43ac",
        description: `project_id: bitter-lab-28038915 (snake_case, not projectId)
sql: SELECT cost_center, actual_amount_usd, baseline_amount_usd, variance, variance_pct FROM "VARIANCE_BASELINE_V" WHERE cost_center = '{{cost_center}}' LIMIT 1`,
        display_mode: "inline",
        display_output: "true",
        entity: "sn_aia_agent",
        entity_id: "a6df73c747d8d790037d0fadf26d43ac",
        execution_mode: "autopilot",
        inputs: "[{\"name\":\"sql\",\"label\":\"sql\",\"type\":\"string\",\"originalType\":\"string\",\"isAiaSupportedType\":true,\"mandatory\":true,\"description\":\"The SQL query to execute\",\"defaultValue\":null,\"value\":\"\",\"metadata\":{}},{\"name\":\"project_id\",\"label\":\"project_id\",\"type\":\"string\",\"originalType\":\"string\",\"isAiaSupportedType\":true,\"mandatory\":false,\"description\":\"The ID of the project to execute the query against. Required for an unscoped connection. May be omitted when the connection is scoped to one project; if provided, it must match that project.\",\"defaultValue\":null,\"value\":\"\",\"metadata\":{}},{\"name\":\"branch_id\",\"label\":\"branch_id\",\"type\":\"string\",\"originalType\":\"string\",\"isAiaSupportedType\":true,\"mandatory\":false,\"description\":\"An optional ID of the branch to execute the query against. If not provided the default branch is used.\",\"defaultValue\":null,\"value\":\"\",\"metadata\":{}},{\"name\":\"database_name\",\"label\":\"database_name\",\"type\":\"string\",\"originalType\":\"string\",\"isAiaSupportedType\":true,\"mandatory\":false,\"description\":\"The name of the database. If not provided, the default neondb or first available database is used.\",\"defaultValue\":null,\"value\":\"\",\"metadata\":{}},{\"name\":\"role_name\",\"label\":\"role_name\",\"type\":\"string\",\"originalType\":\"string\",\"isAiaSupportedType\":true,\"mandatory\":false,\"description\":\"An optional Postgres role to log in as. The server resolves its credentials internally and never returns them. If not provided, the database owner is used. On a connection pinned to a role, omit this or pass that role.\",\"defaultValue\":null,\"value\":\"\",\"metadata\":{}},{\"name\":\"compute_id\",\"label\":\"compute_id\",\"type\":\"string\",\"originalType\":\"string\",\"isAiaSupportedType\":true,\"mandatory\":false,\"description\":\"An optional ID of the compute/endpoint to run on. If not provided, the read-write compute of the branch is used.\",\"defaultValue\":null,\"value\":\"\",\"metadata\":{}},{\"name\":\"max_rows\",\"label\":\"max_rows\",\"type\":\"numeric\",\"originalType\":\"integer\",\"isAiaSupportedType\":true,\"mandatory\":false,\"description\":\"Maximum number of rows to return per statement. When a statement returns more, the response adds a second block with `totalRowCount` and `truncated: true`; raise this only then.\",\"defaultValue\":100,\"value\":\"\",\"metadata\":{}}]",
        max_auto_executions: "10",
        name: "Get Details via Neon MCP",
        output_transformation_strategy: "none",
        pre_run: "false",
        requires_text_refined_message: "false",
        requires_widget_transformation: "true",
        should_display_refined_message: "false",
        tool: "01b7918447e85310037d0fadf26d4373",
        tool_attributes: "{\"tool\":{\"name\":\"run_sql\",\"description\":\"Execute one SQL statement on a Neon database. If a prior step created a temporary branch, pass that branch_id. NEVER run destructive SQL autonomously; always ask the user first.\"}}",
        wait_for_widget_interaction: "false",
        widgets: "db0e858eff62b210f465ffffffffff2c",
    },
})
