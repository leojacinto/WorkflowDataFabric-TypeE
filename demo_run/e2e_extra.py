"""fund_table (QA) and ldi_runtime, timed, with cleanup of the test outputs of each. Log: task_extra.log"""
import subprocess, time, re, os, sys, json, hashlib, urllib.request, urllib.error
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(R, 'devin_walkthrough_wdf'); T = os.path.join(D, 'headless-toolkit'); E = os.path.join(T, 'e2e')
LOG = os.path.join(D, 'task_extra.log')
sys.path.insert(0, T)
import api, urllib.parse
def _get(path, **params):
    q = ('?' + urllib.parse.urlencode(params)) if params else ''
    err = None
    for i in range(6):
        try:
            req = urllib.request.Request(api.BASE + path + q, headers={'Authorization': api.AUTH, 'Accept': 'application/json'})
            with urllib.request.urlopen(req, timeout=180) as r: return json.load(r)['result']
        except Exception as e:
            err = e; time.sleep(10 * (i + 1))
    raise err
api.get = _get
T0 = time.time(); TIMES = []; FAIL = []
TASK = 'x_snc_forecast_v_0_variance_task'; EVT = 'x_snc_forecast_v_0_expense_transaction_event'

def log(m): open(LOG, 'a').write(time.strftime('%H:%M:%S ') + m + '\n')
def utc(): return time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime())

def run(cmd, out, timeout=3000):
    t = time.time()
    try:
        p = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout, cwd=R); txt = p.stdout + p.stderr; rc = p.returncode
    except subprocess.TimeoutExpired as e:
        txt = ''; rc = 124
    open(os.path.join(D, out), 'w').write(txt)
    return rc, txt, int(time.time() - t)

def rest_delete(table, sid):
    req = urllib.request.Request(api.BASE + 'table/%s/%s' % (table, sid), method='DELETE', headers={'Authorization': api.AUTH})
    try:
        with urllib.request.urlopen(req, timeout=300) as r: return r.status
    except urllib.error.HTTPError as e: return e.code
    except Exception as e: return 'timeout'

def conv_text():
    p = subprocess.run('%s/ba/c.sh \'{"op":"eval","file":"deeptext.js"}\'' % T, shell=True, capture_output=True, text=True)
    return p.stdout.replace('\\n', '\n')

def timed(name):
    class Ctx:
        def __enter__(s): s.t = time.time(); s.a = time.strftime('%H:%M:%S'); log('>>> %s START' % name); return s
        def __exit__(s, *x):
            e = int(time.time() - s.t); TIMES.append((name, s.a, time.strftime('%H:%M:%S'), e)); log('<<< %s END %ds (%dm %ds)' % (name, e, e // 60, e % 60))
    return Ctx()

def dupes():
    out = []
    for n in ('Budget Variance Analysis', 'Extract Cost Center', 'Get Expense Event'):
        c = api.count('sys_hub_flow', 'name=' + n)
        if c != 1: out.append('%s subflows=%d' % (n, c))
    return out

def ba_step(pid, built, tries=2):
    for attempt in range(1, tries + 1):
        log('  BA run %s attempt %d' % (pid, attempt))
        rc, txt, el = run('bash %s/run_tracked.sh %s %s' % (E, pid, 'ihub1'), 'extra_%s.log' % pid)
        m = re.search(r'(\S+) START', txt); runid = m.group(1) if m else None
        t = time.time(); last = None; changed = time.time(); stuck = False
        while not built() and time.time() - t < 3000:
            if 'RISKY' in txt: break
            rc2, t2, _ = run('bash %s/ba/approveloop.sh' % T, 'extra_loop.out', 300); txt += t2
            if 'RISKY' in t2: break
            h = hashlib.md5(conv_text()[-4000:].encode()).hexdigest()
            if h != last: changed = time.time(); last = h
            if time.time() - changed > 720: stuck = True; break
            time.sleep(10)
        txt += conv_text()
        if runid: run('python3 %s/track.py end %s' % (E, runid), 'extra_track.out')
        if 'RISKY' in txt: raise RuntimeError('%s: risky script pending, needs a human decision' % pid)
        if built(): return txt, runid
        if stuck and attempt < tries: log('  Build Agent froze, fresh conversation'); continue
        raise RuntimeError('%s: build did not finish' % pid)

# ---------------- fund_table ----------------
COLS = ['amount_usd', 'timestamp', 'cost_center', 'source_system', 'billing_period', 'vendor', 'invoice_id', 'gl_account', 'business_unit', 'sent_from', 'correlation_id', 'service_category', 'schema_version', 'region', 'event_id', 'priority', 'event_type']
def qa_table():
    r = api.get('table/sys_db_object', sysparm_query='label=Expense Transaction Event QA', sysparm_fields='sys_id,name')
    return r[0] if r else None
def table_built():
    t = qa_table()
    if not t: return False
    have = {x['element'] for x in api.get('table/sys_dictionary', sysparm_query='name=' + t['name'] + '^elementISNOTEMPTY', sysparm_fields='element', sysparm_limit=200)}
    return all(c in have for c in COLS)

def fund_table():
    s = open(os.path.join(E, 'prompts', 'fund_table.txt')).read().replace('<initials>', 'QA')
    open(os.path.join(E, 'prompts', 'fund_table_x.txt'), 'w').write(s)
    if qa_table() and not os.environ.get('RESUME_FUND'): raise RuntimeError('a QA table already exists before the run')
    if os.environ.get('RESUME_FUND') and table_built():
        TIMES.append(('fund_table build (earlier attempt, before API timeout)', '23:57:30', '00:05:25', 474)); log('  resuming: table already built by the earlier attempt (474s)')
    else:
        with timed('fund_table build'):
            ba_step('fund_table_x', table_built)
    t = qa_table()
    have = {x['element'] for x in api.get('table/sys_dictionary', sysparm_query='name=' + t['name'] + '^elementISNOTEMPTY', sysparm_fields='element', sysparm_limit=200)}
    log('  PASS table %s exists with all %d columns (%d dictionary entries)' % (t['name'], len(COLS), len(have)))
    with timed('fund_table cleanup'):
        c = rest_delete('sys_db_object', t['sys_id'])
        gone = qa_table() is None
        log('  DELETE table %s http=%s, gone=%s' % (t['name'], c, gone))
        if not gone: FAIL.append('fund_table: could not delete the test table (http %s), delete it by hand' % c)

# ---------------- ldi_runtime ----------------
def task_row():
    r = api.get('table/' + TASK, sysparm_query='short_description=CC_IT_002^sys_created_on>' + T_START, sysparm_fields='sys_id,number,state,sys_created_on', sysparm_limit=3, sysparm_display_value='all')
    return r[0] if r else None
def atts(tid):
    return api.get('table/sys_attachment', sysparm_query='table_sys_id=' + tid, sysparm_fields='sys_id,file_name,size_bytes', sysparm_limit=10)
def ldi_built():
    t = task_row()
    return bool(t) and len(atts(t['sys_id']['value'] if isinstance(t['sys_id'], dict) else t['sys_id'])) >= 1

def ldi_runtime():
    global T_START
    for e in api.get('table/' + EVT, sysparm_query='event_id=EXP-2025-IT-002-1010-01', sysparm_fields='sys_id'): log('  pre-clean: deleted old event row 1010 http=%s' % rest_delete(EVT, e['sys_id']))
    for tk in api.get('table/' + TASK, sysparm_query='short_description=CC_IT_002', sysparm_fields='sys_id'):
        for a in atts(tk['sys_id']): rest_delete('sys_attachment', a['sys_id'])
        log('  pre-clean: deleted old variance task http=%s' % rest_delete(TASK, tk['sys_id']))
    T_START = utc(); c0 = api.count('sn_spend_sdc_service_request')
    created = {}
    try:
        with timed('ldi_runtime build (task + invoice)'):
            ba_step('ldi_runtime', ldi_built)
        t = task_row(); tid = t['sys_id']['value'] if isinstance(t['sys_id'], dict) else t['sys_id']; created['task'] = tid
        a = atts(tid); created['atts'] = [x['sys_id'] for x in a]
        log('  PASS task %s state %s with attachment %s (%s bytes)' % (t['number']['display_value'], t['state']['display_value'], a[0]['file_name'], a[0]['size_bytes']))
        with timed('Document Intelligence creates the expense event'):
            t1 = time.time(); ev = None
            while time.time() - t1 < 3600:
                ev = api.get('table/' + EVT, sysparm_query='event_id=EXP-2025-IT-002-1010-01', sysparm_fields='sys_id,owner,vendor,amount_usd')
                if ev: break
                time.sleep(30)
            if not ev: raise RuntimeError('no expense event 1010 after 60 min')
            for e in ev: created.setdefault('events', []).append(e['sys_id'])
            log('  PASS event EXP-2025-IT-002-1010-01 created: %s' % ev[0])
        with timed('agent run for the new event'):
            t1 = time.time(); pl = None
            while time.time() - t1 < 3600:
                pl = api.get('table/sn_aia_execution_plan', sysparm_query='objectiveLIKEEXP-2025-IT-002-1010-01^sys_created_on>' + T_START + '^ORDERBYDESCsys_created_on', sysparm_fields='state,sys_created_on,sys_updated_on', sysparm_limit=1)
                if pl and pl[0]['state'].lower() == 'completed': break
                time.sleep(30)
            if not pl or pl[0]['state'].lower() != 'completed': raise RuntimeError('agent run did not complete in 60 min: %s' % pl)
            log('  PASS agent run completed, plan created %s updated %s UTC' % (pl[0]['sys_created_on'], pl[0]['sys_updated_on']))
        cs = api.get('table/sn_spend_sdc_service_request', sysparm_query='sys_created_on>' + T_START + '^ORDERBYDESCsys_created_on', sysparm_fields='number,short_description,assigned_to', sysparm_limit=5, sysparm_display_value='all')
        log('  new Finance Cases: %s' % [(c['number']['display_value'], c['short_description']['display_value'], c['assigned_to'].get('display_value') if isinstance(c['assigned_to'], dict) else c['assigned_to']) for c in cs])
        if len(cs) != 1: FAIL.append('ldi_runtime: expected 1 new Finance Case, got %d' % len(cs))
        else:
            asg = cs[0]['assigned_to']; asg = asg.get('display_value') if isinstance(asg, dict) else asg
            log('  %s Finance Case %s assigned to %s, short description "%s"' % ('PASS' if asg else 'FAIL', cs[0]['number']['display_value'], asg or '(empty)', cs[0]['short_description']['display_value']))
            if not asg: FAIL.append('ldi_runtime: Finance Case has no assignee')
    finally:
        with timed('ldi_runtime cleanup'):
            for e in created.get('events', []): log('  DELETE event row http=%s' % rest_delete(EVT, e))
            for a in created.get('atts', []): log('  DELETE attachment http=%s' % rest_delete('sys_attachment', a))
            if created.get('task'): log('  DELETE variance task http=%s' % rest_delete(TASK, created['task']))
            log('  left on purpose: Finance Cases (scripts cannot delete them)')

# ---------------- run ----------------
log('######## EXTRA START (fund_table QA, ldi_runtime)')
try:
    if dupes(): raise RuntimeError('start state has duplicates: %s' % dupes())
    log('start state: no duplicate subflows, finance cases %d, ready/queued %s' % (api.count('sn_spend_sdc_service_request'), (api.count('sysevent', 'state=ready^name=flow.fire'), api.count('sys_flow_context', 'state=QUEUED'))))
    if os.environ.get('SKIP_FUND'):
        TIMES.append(('fund_table build (23:57:30 to 00:05:25)', '23:57:30', '00:05:25', 474)); TIMES.append(('fund_table cleanup (delete, confirmed gone 00:59)', '00:55:00', '00:56:00', 60)); log('fund_table already done: PASS, 17 columns, test table deleted and confirmed gone')
    else:
        fund_table()
    ldi_runtime()
    if dupes(): FAIL.append('duplicates after the runs: %s' % dupes())
    for e in api.get('table/' + EVT, sysparm_query='event_id=EXP-2025-IT-002-1007-01', sysparm_fields='sys_id'):
        log('final clean-up: deleted leftover test event row 1007 from the earlier run http=%s' % rest_delete(EVT, e['sys_id']))
except Exception as ex:
    FAIL.append(str(ex)); log('ERROR: %s' % ex)
log('---- TIMES')
for n, a, b, s in TIMES: log('  %-45s %s -> %s  %4ds  (%dm %ds)' % (n, a, b, s, s // 60, s % 60))
tot = int(time.time() - T0)
log('######## EXTRA %s, total %ds (%dm %ds)%s' % ('ALL PASS' if not FAIL else 'FAILED', tot, tot // 60, tot % 60, '' if not FAIL else ' | ' + ' | '.join(FAIL)))
