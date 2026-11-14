"""Document Intelligence REST test: variance task + invoice attached with a chosen content type, state to Work in Progress, watch the chain, clean up.
Changes nothing except its own test task, attachment and (if DI works) the event row it produces. Log: task_di_test.log"""
import os, sys, time, json, urllib.request, urllib.error, urllib.parse
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(R, 'devin_walkthrough_wdf'); T = os.path.join(D, 'headless-toolkit'); LOG = os.path.join(D, 'task_di_test.log')
sys.path.insert(0, T)
import api
TASK = 'x_snc_forecast_v_0_variance_task'; EVT = 'x_snc_forecast_v_0_expense_transaction_event'
TP = '6facf999e15772107f447756abe0cb65'; EX = 'c1ad7d1de15772107f447756abe0cb2e'
PDF = open('/tmp/inv.pdf', 'rb').read()
WAIT = int(os.environ.get('WAIT', '480'))

def log(m): open(LOG, 'a').write(time.strftime('%H:%M:%S ') + m + '\n')
def utc(): return time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime())

def call(method, path, body=None, headers=None, raw=False):
    h = {'Authorization': api.AUTH, 'Accept': 'application/json'}; h.update(headers or {})
    data = body if raw else (json.dumps(body).encode() if body is not None else None)
    if body is not None and not raw: h['Content-Type'] = 'application/json'
    err = None
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(api.BASE + path, method=method, data=data, headers=h), timeout=180) as r:
                t = r.read(); return r.status, (json.loads(t)['result'] if t else None)
        except urllib.error.HTTPError as e: return e.code, e.read()[:200]
        except Exception as e: err = e; time.sleep(8)
    return 'timeout', str(err)

def get(path, **p):
    return call('GET', path + ('?' + urllib.parse.urlencode(p) if p else ''))[1]

def count(t, q=''):
    return int(get('stats/' + t, sysparm_query=q, sysparm_count='true')['stats']['count'])

wip = get('table/sys_choice', sysparm_query='name=task^element=state^label=Work in Progress', sysparm_fields='value')
WIP = wip[0]['value'] if wip else '2'
log('######## DI REST TEST (Work in Progress state value = %s)' % WIP)
results = {}
for ctype in (os.environ.get('CTYPES') or 'application/pdf,application/octet-stream').split(','):
    t0 = time.time(); T_START = utc(); created = {'events': [], 'atts': []}
    log('--- attempt with content type %s' % ctype)
    try:
        c, task = call('POST', 'table/' + TASK, {'short_description': 'CC_IT_002'})
        if c not in (200, 201): raise RuntimeError('task create http %s %s' % (c, task))
        tid = task['sys_id']; created['task'] = tid; log('  task %s created' % task['number'])
        c, att = call('POST', 'attachment/file?table_name=%s&table_sys_id=%s&file_name=Invoice_IT_Laptop_CC_IT_002.pdf' % (TASK, tid), PDF, {'Content-Type': ctype}, raw=True)
        if c not in (200, 201): raise RuntimeError('attach http %s %s' % (c, att))
        created['atts'].append(att['sys_id']); log('  attachment stored: content_type=%s size=%s' % (att.get('content_type'), att.get('size_bytes')))
        c, _ = call('PATCH', 'table/%s/%s' % (TASK, tid), {'state': WIP}); log('  state set to Work in Progress, http %s' % c)
        t1 = time.time(); seen = set(); ev = None
        while time.time() - t1 < WAIT:
            snap = {
                'Task Processing flow ran': count('sys_flow_context', 'flow=%s^sys_created_on>%s' % (TP, T_START)),
                'Extract flow ran': count('sys_flow_context', 'flow=%s^sys_created_on>%s' % (EX, T_START)),
                'Document Tasks (di_task)': count('di_task', 'sys_created_on>' + T_START),
                'Document Tasks (sn_doc_task)': count('sn_doc_task', 'sys_created_on>' + T_START),
            }
            for k, v in snap.items():
                if v and k not in seen: seen.add(k); log('  +%ds %s (%d)' % (time.time() - t1, k, v))
            ev = get('table/' + EVT, sysparm_query='event_id=EXP-2025-IT-002-1010-01', sysparm_fields='sys_id,vendor,owner,amount_usd')
            if ev: log('  +%ds EVENT CREATED %s' % (time.time() - t1, ev[0])); break
            time.sleep(15)
        if ev: created['events'] = [e['sys_id'] for e in ev]
        results[ctype] = ('EVENT CREATED' if ev else 'no event in %ds' % WAIT, sorted(seen))
    except Exception as e:
        results[ctype] = ('ERROR %s' % e, [])
    finally:
        for e in created['events']: log('  cleanup: event row http=%s' % call('DELETE', 'table/%s/%s' % (EVT, e))[0])
        for a in created['atts']: log('  cleanup: attachment http=%s' % call('DELETE', 'attachment/%s' % a)[0])
        if created.get('task'): log('  cleanup: task http=%s' % call('DELETE', 'table/%s/%s' % (TASK, created['task']))[0])
        log('  attempt took %ds' % (time.time() - t0))
    if results[ctype][0] == 'EVENT CREATED': break
log('---- RESULTS')
for k, v in results.items(): log('  %-26s %s | chain steps seen: %s' % (k, v[0], v[1]))
log('######## DI REST TEST DONE')
