# Deletes test leftovers by exact name, only if created today by admin. Usage: cleanup_exact.py "<server name>"
import sys, subprocess, os, urllib.request, urllib.error
sys.path.insert(0, '../headless-toolkit'); import api
def dv(v): return v.get('display_value') if isinstance(v, dict) else v
def d(t, i):
    req = urllib.request.Request(api.BASE + 'table/%s/%s' % (t, i), method='DELETE', headers={'Authorization': api.AUTH})
    try:
        with urllib.request.urlopen(req, timeout=120) as r: return r.status
    except urllib.error.HTTPError as e: return e.code
name = sys.argv[1]; today = '2026-11-0'
for s in api.get('table/sn_mcp_server', sysparm_query='name=' + name, sysparm_fields='sys_id,name,sys_created_by,sys_created_on', sysparm_display_value='all'):
    if dv(s['sys_created_by']) == 'admin' and dv(s['sys_created_on']).startswith(today) and name != 'Neon MCP Lab LF':
        env = dict(os.environ, SERVER_ID=dv(s['sys_id'])); subprocess.run(['node', 'mcp_server_delete2.cjs'], env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); print('server', name, 'deleted by hand in the UI')
key = name.replace(' ', '_')
for a in api.get('table/sys_alias', sysparm_query='idLIKE' + key + '_^idNOT LIKE_LF_', sysparm_fields='sys_id,id,sys_created_by,sys_created_on', sysparm_display_value='all'):
    if dv(a['sys_created_by']) == 'admin' and dv(a['sys_created_on']).startswith(today): print('alias', dv(a['id']), d('sys_alias', dv(a['sys_id'])))
for t in ('sys_connection', 'discovery_credentials'):
    for c in api.get('table/' + t, sysparm_query='nameSTARTSWITH' + name + '_^nameNOT LIKELF', sysparm_fields='sys_id,name,sys_created_by,sys_created_on', sysparm_display_value='all'):
        if dv(c['sys_created_by']) == 'admin' and dv(c['sys_created_on']).startswith(today): print(t, dv(c['name']), d(t, dv(c['sys_id'])))
for t in api.get('table/sn_aia_trigger_configuration', sysparm_query='target_table=x_snc_forecast_v_0_expense_transaction_event^active=false', sysparm_fields='sys_id,name,sys_created_by,sys_created_on', sysparm_display_value='all'):
    n = dv(t['name'])
    if n.startswith('Expense Transaction Event Created (Copy') and dv(t['sys_created_by']) == 'admin' and dv(t['sys_created_on']).startswith(today): print('trigger copy', n, d('sn_aia_trigger_configuration', dv(t['sys_id'])))
for a in api.get('table/sn_aia_agent', sysparm_query='nameSTARTSWITHForecast Variance^nameENDSWITH(Copy)', sysparm_fields='sys_id,name,sys_created_by,sys_created_on', sysparm_display_value='all'):
    if dv(a['sys_created_by']) == 'admin' and dv(a['sys_created_on']).startswith('2026-11-06'): print('stray agent copy', dv(a['name']), d('sn_aia_agent', dv(a['sys_id'])))
used = set()
for m in api.get('table/sn_aia_agent_tool_m2m', sysparm_query='tool.name=Get Details via Neon MCP', sysparm_fields='tool', sysparm_limit=200): used.add(m['tool']['value'] if isinstance(m['tool'], dict) else m['tool'])
for t in api.get('table/sn_aia_tool', sysparm_query='name=Get Details via Neon MCP', sysparm_fields='sys_id,name,sys_created_by,sys_created_on', sysparm_display_value='all', sysparm_limit=100):
    sid = dv(t['sys_id'])
    if sid not in used and dv(t['sys_created_by']) == 'admin' and dv(t['sys_created_on']) >= '2026-11-03': print('orphan tool', sid[:8], d('sn_aia_tool', sid))
print('left: agents', [a['name'] for a in api.get('table/sn_aia_agent', sysparm_query='nameSTARTSWITHForecast Variance^ORDERBYname', sysparm_fields='name')], '| servers', [x['name'] for x in api.get('table/sn_mcp_server', sysparm_query='nameSTARTSWITHNeon', sysparm_fields='name')], '| triggers', [(t['name'][-8:], t['active']) for t in api.get('table/sn_aia_trigger_configuration', sysparm_query='target_table=x_snc_forecast_v_0_expense_transaction_event', sysparm_fields='name,active')])
