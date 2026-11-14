"""Per-run cleanup tracker. Records what one test run created and deletes ONLY those objects.
usage:
  track.py protect                  write cleanup/protected.json = every tracked object that exists now (never deleted by this tool)
  track.py start <run>              snapshot before a run
  track.py end <run>                snapshot after a run, write cleanup/<run>.json = objects that are new
  track.py list <run>               show the manifest
  track.py clean <run>              dry run: show what would be deleted and what is refused
  track.py clean <run> --yes        delete the listed objects one at a time (REST DELETE), never anything else
Agents and triggers are listed but never deleted by this tool (delete them by hand or through Build Agent).
Refused: anything in protected.json, any subflow/action an agent tool points at, anything not in the manifest."""
import json, os, sys, urllib.request
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import api

APP = 'a4fd2da13bf8be5062f31831a3e45ac9'
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cleanup')
AUTO = [('sys_hub_flow', 'name', True), ('sys_hub_action_type_definition', 'name', True), ('sys_alias', 'name', True),
        ('sys_script', 'name', True), ('x_snc_forecast_v_0_expense_transaction_event', 'event_id', False)]
REPORT = [('sn_aia_agent', 'name', True), ('sn_aia_trigger_configuration', 'name', True)]
os.makedirs(D, exist_ok=True)

def snapshot():
    out = {}
    for table, label, scoped in AUTO + REPORT:
        q = f'sys_scope={APP}' if scoped else ''
        for r in api.get('table/' + table, sysparm_query=q, sysparm_fields=f'sys_id,{label}', sysparm_limit=1000):
            out[r['sys_id']] = {'table': table, 'sys_id': r['sys_id'], 'name': r.get(label, ''), 'auto': (table, label, scoped) in AUTO}
    return out

def load(name):
    return json.load(open(os.path.join(D, name)))

def save(name, data):
    json.dump(data, open(os.path.join(D, name), 'w'), indent=1)

def in_use():
    ids = set()
    for r in api.get('table/sn_aia_agent_tool_m2m', sysparm_fields='tool.target_document', sysparm_limit=1000):
        v = r.get('tool.target_document')
        ids.add(v['value'] if isinstance(v, dict) else v)
    return ids

def delete(table, sid):
    req = urllib.request.Request(api.BASE + f'table/{table}/{sid}', method='DELETE', headers={'Authorization': api.AUTH})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code

cmd, run = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else '')
if cmd == 'protect':
    s = snapshot(); save('protected.json', s); print(f'protected {len(s)} objects')
elif cmd == 'start':
    save(f'{run}.before.json', snapshot()); print(f'{run}: before-snapshot saved')
elif cmd == 'end':
    before, after = load(f'{run}.before.json'), snapshot()
    new = [v for k, v in after.items() if k not in before]
    save(f'{run}.json', {'run': run, 'created': new}); print(f'{run}: {len(new)} new objects')
elif cmd == 'list':
    for v in load(f'{run}.json')['created']:
        print(f"  {'auto  ' if v['auto'] else 'manual'} {v['table']} {v['sys_id'][:8]} {v['name']}" + ('  [deleted]' if v.get('deleted') else ''))
elif cmd == 'clean':
    yes = '--yes' in sys.argv
    m = load(f'{run}.json'); prot = load('protected.json') if os.path.exists(os.path.join(D, 'protected.json')) else {}; used = in_use()
    for v in m['created']:
        why = 'report only (agents and triggers are never deleted here)' if not v['auto'] else 'in protected.json' if v['sys_id'] in prot else 'an agent tool points at it' if v['sys_id'] in used else ''
        if why or v.get('deleted'):
            print(f"  KEEP   {v['table']} {v['sys_id'][:8]} {v['name']}: {why or 'already deleted'}"); continue
        if not yes:
            print(f"  WOULD DELETE {v['table']} {v['sys_id'][:8]} {v['name']}"); continue
        code = delete(v['table'], v['sys_id']); v['deleted'] = code == 204
        print(f"  DELETE {v['table']} {v['sys_id'][:8]} {v['name']} http={code}")
    if yes: save(f'{run}.json', m)
else:
    print(__doc__)
