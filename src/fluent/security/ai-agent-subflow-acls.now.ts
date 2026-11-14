import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'

// New platform builds deny AI agent access to subflow tools unless an "Invoked from AI" ACL exists.
// Found on lef-nov-7021 (Brazil patch 2): the Integration Hub agent test failed with
// "You don't have the required access to complete this request" until these two ACLs existed.
// Name = scope.internal_name of the subflow. Internal names differ from display names.

// Budget Variance Analysis subflow
Acl({
    $id: Now.ID['acl_invoke_from_ai_budget_variance_analysis'],
    type: 'flow',
    operation: 'invoke_from_ai',
    name: 'x_snc_forecast_v_0.budget_variance_analysis',
    decisionType: 'allow',
    adminOverrides: true,
    active: true,
    roles: ['admin'],
} as any)

// Extract Cost Center subflow (internal name cost_center_history)
Acl({
    $id: Now.ID['acl_invoke_from_ai_extract_cost_center'],
    type: 'flow',
    operation: 'invoke_from_ai',
    name: 'x_snc_forecast_v_0.cost_center_history',
    decisionType: 'allow',
    adminOverrides: true,
    active: true,
    roles: ['admin'],
} as any)
