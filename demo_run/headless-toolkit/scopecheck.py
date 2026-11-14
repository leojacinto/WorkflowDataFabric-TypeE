# Read-only: looks up every record in the cleanup plan and prints its scope, creator, creation time and a name.
import json, re, subprocess, sys, collections, urllib.parse
import os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'work')
H = 'https://demoalectriallwfaa158438.service-now.com'
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'cleanup_ihub_build.js')).read()
plan = json.loads(re.search(r'var plan = (\[.*?\]\]);', src, re.S).group(1))
by = collections.OrderedDict()
for t, s in plan: by.setdefault(t, []).append(s)
NAME = {'sys_dictionary': 'name,element,internal_type', 'sys_documentation': 'name,element,label',
        'sys_db_object': 'name,label,super_class', 'sys_hub_flow': 'name,internal_name,type,active',
        'sn_spend_sdc_service_request': 'number,short_description,assigned_to.name', 'http_connection': 'name,connection_alias,connection_url',
        'sys_alias': 'name,id', 'sys_scope_privilege': 'source_scope.scope,target_scope.scope,target_name,target_type,operation,status',
        'sys_security_acl': 'name,operation,type', 'sys_security_acl_role': 'sys_security_acl.name,sys_user_role.name',
        'sn_aia_agent': 'name', 'sn_aia_tool': 'name,type', 'sys_hub_action_type_definition': 'name,internal_name',
        'sn_aia_trigger_configuration': 'name,target_table,trigger_flow', 'sys_ui_section': 'name,caption', 'sys_ui_form': 'name',
        'sys_complex_object': 'name', 'ua_table_licensing_config': 'table_name,name'}
def get(t, ids, fields):
    q = urllib.parse.urlencode({'sysparm_query': 'sys_idIN' + ','.join(ids), 'sysparm_fields': fields, 'sysparm_limit': '500'})
    out = subprocess.run(['curl', '-s', '-K', D + '/curlauth.cfg', '-H', 'Accept: application/json', f'{H}/api/now/table/{t}?{q}'], capture_output=True, text=True).stdout
    try: return json.loads(out)
    except Exception: return {'error': out[:300]}
rows = {}
for t, ids in by.items():
    base = 'sys_id,sys_scope.scope,sys_created_on,sys_created_by,sys_updated_on'
    r = get(t, ids, base + ',' + NAME.get(t, 'name'))
    if 'result' not in r: print('ERR', t, r); continue
    rows[t] = r['result']
    found = {x['sys_id'] for x in r['result']}
    gone = [i for i in ids if i not in found]
    scopes = collections.Counter(x.get('sys_scope.scope') or '(none)' for x in r['result'])
    cr = sorted(x['sys_created_on'] for x in r['result'])
    who = collections.Counter(x['sys_created_by'] for x in r['result'])
    print(f"{t}: listed {len(ids)}, found {len(found)}, gone {len(gone)} | scopes {dict(scopes)} | created {cr[0] if cr else '-'} .. {cr[-1] if cr else '-'} | by {dict(who)}")
json.dump(rows, open(D + '/scopecheck.json', 'w'), indent=1)
