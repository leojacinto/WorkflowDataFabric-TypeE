"""Checks the instance after a prompt ran. usage: python3 e2e/verify.py <stage>     stages: ihub1 ihub2 ihub3 zcc_pgtool ldi_props ldi_owner zcc_erp all
Prints PASS/FAIL per check. Read-only. Never prints credentials."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import api

AGENT = 'Forecast Variance'
ok_all = True
def check(label, cond, detail=''):
    global ok_all
    ok_all &= bool(cond)
    print(('PASS ' if cond else 'FAIL ') + label + (f'  [{detail}]' if detail else ''))

def flows(name, kind):   # kind: 'subflow' or 'flow'
    r = api.rows('sys_hub_flow', f'name={name}^active=true', 'name,type,sys_scope.scope,status')
    return [x for x in r if (x.get('type') or kind) == kind or True]

def stage_ihub1():
    check('alias "Get Expense Event" exists', api.count('sys_alias', 'name=Get Expense Event') >= 1)
    check('action "Get Expense Event" exists', api.count('sys_hub_action_type_definition', 'name=Get Expense Event') >= 1)
    check('subflow "Get Expense Event" exists', api.count('sys_hub_flow', 'name=Get Expense Event^type=subflow') >= 1)
    r = api.rows('x_snc_forecast_v_0_expense_transaction_event', 'event_id=EXP-2025-IT-002-1007-01', 'event_id,owner,amount_usd,vendor')
    check('test event EXP-2025-IT-002-1007-01 created, Owner set, amount without commas',
          len(r) == 1 and r[0]['owner'] and ',' not in r[0]['amount_usd'], str(r)[:140])

def stage_ihub2():
    for n in ('Extract Cost Center', 'Budget Variance Analysis'):
        check(f'subflow "{n}" exists', api.count('sys_hub_flow', f'name={n}^type=subflow') >= 1)
    check('action "Compute Budget Totals" exists', api.count('sys_hub_action_type_definition', 'name=Compute Budget Totals') >= 1)
    print('NOTE the subflow results (CC_IT_001 / Amazon Web Services, "Cost center is compliant with budget." Sum 109200.75) come from the Build Agent reply, not from here.')

def stage_ihub3():
    a = api.rows('sn_aia_agent', f'name={AGENT}', 'sys_id,name,instructions')
    check('agent "Forecast Variance" exists once', len(a) == 1)
    if not a: return
    aid = a[0]['sys_id']
    n = api.count('sn_aia_agent_tool_m2m', f'agent={aid}')
    check('agent has 4 tools (5 after the zcc_pgtool stage)', n in (4, 5), str(n))
    t = api.rows('sn_aia_trigger_configuration', 'target_table=x_snc_forecast_v_0_expense_transaction_event', 'name,active,trigger_flow')
    check('trigger on Expense Transaction Event exists, is ACTIVE and has a trigger_flow (installs turn it off: re-check after every agent build)', len(t) == 1 and t[0]['active'] == 'true' and bool(t[0]['trigger_flow']), str(t)[:160])

def stage_zcc_pgtool():
    aid = api.rows('sn_aia_agent', f'name={AGENT}', 'sys_id')[0]['sys_id']
    check('tool "Search for Cost Center Summary" on the agent', api.count('sn_aia_agent_tool_m2m', f'agent={aid}^name=Search for Cost Center Summary') == 1)
    a = api.rows('sn_aia_agent', f'sys_id={aid}', 'instructions')[0]['instructions']
    check('instructions contain "Step 4: Review PostgreSQL Cost Center Summary"', 'Step 4: Review PostgreSQL Cost Center Summary' in a)
    stage_ihub3()

def stage_ldi_props():
    for p in ('warning_score_threshold', 'autofill_threshold', 'straight_through_processing_threshold'):
        r = api.rows('sys_properties', f'name=glide.platform_ml_di.doc_data_extractor.{p}', 'name,value')
        check(f'property {p} = 0.01', len(r) == 1 and r[0]['value'] == '0.01', str(r))

def stage_ldi_owner():
    r = api.rows('sys_script', 'collection=x_snc_forecast_v_0_expense_transaction_event^name=Set Expense Event Owner', 'name,when,action_insert,active,script')
    check('business rule "Set Expense Event Owner" before insert, active', len(r) == 1 and r[0]['when'] == 'before' and r[0]['action_insert'] == 'true' and r[0]['active'] == 'true')

def stage_zcc_erp():
    r = api.rows('sn_erp_integration_model', 'name=SAP Cost Center Lab', 'name,sys_scope.scope,origin')
    check('model "SAP Cost Center Lab" exists', len(r) >= 1, str(r)[:140])

STAGES = {k[6:]: v for k, v in globals().items() if k.startswith('stage_')}
if __name__ == '__main__':
    which = sys.argv[1] if len(sys.argv) > 1 else 'all'
    for s in (STAGES if which == 'all' else [which]):
        print(f'== {s}'); STAGES[s]()
    print('RESULT', 'ALL PASS' if ok_all else 'SOME FAILED'); sys.exit(0 if ok_all else 1)
