"""Clean end-to-end run: ihub1, ihub2, ihub3, zcc_pgtool, ihub4_test (+agent run, +case assignee), zcc_erp, ldi_props, ldi_owner.
Initials QA. Stops at the first failure. Only self-heal: the documented 'set the trigger active' prompt. Log: task_e2e.log"""
import subprocess, time, re, os, sys, json, urllib.request, urllib.error
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(R, 'devin_walkthrough_wdf'); T = os.path.join(D, 'headless-toolkit'); E = os.path.join(T, 'e2e')
LOG = os.path.join(D, 'task_e2e.log')
sys.path.insert(0, T)
import api
CHI = '63d5dfbbfbab4690ecb9f46b5eefdc98'
T0 = time.time()

def log(m):
    open(LOG, 'a').write(time.strftime('%H:%M:%S ') + m + '\n')

def stop(m):
    log('STOPPED: ' + m); sys.exit(1)

def run(cmd, out, timeout=3000):
    t = time.time()
    try:
        p = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout, cwd=R)
        txt = p.stdout + p.stderr; rc = p.returncode
    except subprocess.TimeoutExpired as e:
        txt = (e.stdout or b'').decode('utf8', 'replace') if isinstance(e.stdout, bytes) else (e.stdout or ''); rc = 124
    open(os.path.join(D, out), 'w').write(txt)
    return rc, txt, int(time.time() - t)

def count(t, q=''):
    return api.count(t, q)

def cases():
    return count('sn_spend_sdc_service_request')

def health():
    return count('sysevent', 'state=ready^name=flow.fire'), count('sys_flow_context', 'state=QUEUED')

def delete_event_row():
    for e in api.get('table/x_snc_forecast_v_0_expense_transaction_event', sysparm_query='event_id=EXP-2025-IT-002-1007-01', sysparm_fields='sys_id'):
        req = urllib.request.Request(api.BASE + 'table/x_snc_forecast_v_0_expense_transaction_event/' + e['sys_id'], method='DELETE', headers={'Authorization': api.AUTH})
        try:
            urllib.request.urlopen(req, timeout=60)
        except urllib.error.HTTPError as ex:
            stop('could not delete test event row http %s' % ex.code)
        log('  deleted test event row')

def verify(stage):
    rc, txt, _ = run('python3 %s/verify_qa.py %s' % (E, stage), 'e2e_verify.out')
    lines = [l[:150] for l in txt.splitlines() if l.startswith(('PASS', 'FAIL', 'RESULT'))]
    return rc == 0, lines

def dupes():
    out = []
    for n in ('Budget Variance Analysis', 'Extract Cost Center', 'Get Expense Event'):
        c = count('sys_hub_flow', 'name=' + n)
        if c != 1: out.append('%s subflows=%d' % (n, c))
    for n in ('Compute Budget Totals', 'Get Expense Event'):
        c = count('sys_hub_action_type_definition', 'name=' + n)
        if c != 1: out.append('%s actions=%d' % (n, c))
    return out

def built(pid):
    try:
        if pid == 'ihub1':
            return count('sys_hub_action_type_definition', 'name=Get Expense Event') >= 1 and count('sys_hub_flow', 'name=Get Expense Event^type=subflow') >= 1 and count('x_snc_forecast_v_0_expense_transaction_event', 'event_id=EXP-2025-IT-002-1007-01') >= 1
        if pid == 'ihub2':
            return count('sys_hub_flow', 'name=Extract Cost Center') >= 1 and count('sys_hub_flow', 'name=Budget Variance Analysis') >= 1 and count('sys_hub_action_type_definition', 'name=Compute Budget Totals') >= 1
        if pid == 'ihub3_x':
            a = api.get('table/sn_aia_agent', sysparm_query='name=Forecast Variance QA', sysparm_fields='sys_id')
            return bool(a) and count('sn_aia_agent_tool_m2m', 'agent=' + a[0]['sys_id']) >= 4
        if pid == 'zcc_pgtool_x':
            a = api.get('table/sn_aia_agent', sysparm_query='name=Forecast Variance QA', sysparm_fields='sys_id')
            return bool(a) and count('sn_aia_agent_tool_m2m', 'agent=%s^name=Search for Cost Center Summary' % a[0]['sys_id']) == 1
    except Exception:
        return False
    return True

def conv_text():
    p = subprocess.run('%s/ba/c.sh \'{"op":"eval","file":"deeptext.js"}\'' % T, shell=True, capture_output=True, text=True)
    return p.stdout.replace('\\n', '\n')

def step(pid, stage, pre=None, text_must=(), text_not=(), resume_run=None, tries=2):
    import hashlib
    for attempt in range(1, tries + 1):
        log('=== %s START attempt %d (ready/queued %s, finance cases %d)' % (pid, attempt, health(), cases()))
        if pre: pre()
        rc, txt, el = run('bash %s/run_tracked.sh %s %s' % (E, pid, stage), 'e2e_%s.log' % pid)
        m = re.search(r'(\S+) START', txt); runid = m.group(1) if m else None
        t = time.time(); passes = 0; same = 0; last = None; stuck = False; changed_at = time.time()
        while not built(pid) and time.time() - t < 3000:
            if 'RISKY' in txt: break
            passes += 1
            rc2, t2, _ = run('bash %s/ba/approveloop.sh' % T, 'e2e_loop.out', 300)
            txt += t2
            if 'RISKY' in t2: break
            h = hashlib.md5(conv_text()[-4000:].encode()).hexdigest()
            if h != last: changed_at = time.time()
            same = int(time.time() - changed_at) // 60
            last = h
            log('  waiting for Build Agent, pass %d, screen unchanged for %d min' % (passes, same))
            if same >= 12: stuck = True; break
            time.sleep(10)
        txt += conv_text()
        if runid: run('python3 %s/track.py end %s' % (E, runid), 'e2e_track.out')
        log('=== %s END %ds' % (pid, int(time.time() - t) + el))
        if 'RISKY' in txt: stop('%s: Build Agent wants to run a risky script, read and decide' % pid)
        if built(pid): break
        if stuck and attempt < tries:
            if runid and 'new objects' in open(os.path.join(D, 'e2e_track.out')).read() and ' 0 new objects' not in open(os.path.join(D, 'e2e_track.out')).read():
                stop('%s: Build Agent froze after creating objects, not retrying automatically' % pid)
            log('  Build Agent froze with nothing built, retrying in a fresh conversation (documented fix)')
            continue
        stop('%s: build did not finish (%s)' % (pid, 'frozen' if stuck else 'timeout'))
    for m in text_must:
        if not re.search(m, txt, re.I): stop('%s: BA reply is missing /%s/' % (pid, m))
    for m in text_not:
        if re.search(m, txt, re.I): stop('%s: BA reply contains /%s/' % (pid, m))
    return txt

def trigger_ok():
    t = api.get('table/sn_aia_trigger_configuration', sysparm_query='target_table=x_snc_forecast_v_0_expense_transaction_event', sysparm_fields='active,trigger_flow')
    return len(t) == 1 and t[0]['active'] == 'true' and bool(t[0]['trigger_flow'])

def verify_with_heal(stage):
    ok, lines = verify(stage)
    if not ok and not trigger_ok() and all(l.startswith('PASS') or 'trigger' in l for l in lines if not l.startswith('RESULT')):
        log('  trigger is off, running the documented trigger fix')
        step('trigger_fix', 'ihub1')
        ok, lines = verify(stage)
    for l in lines: log('  ' + l)
    if not ok: stop('verify %s failed' % stage)

RESUME = os.environ.get('RESUME')
ORDER = ['ihub1','ihub2','ihub3_x','zcc_pgtool_x','ihub4_test','zcc_erp','ldi_props','ldi_owner']
START_AT = os.environ.get('START_AT') or 'ihub1'
def go(n):
    return ORDER.index(n) >= ORDER.index(START_AT)
log('######## E2E %s, initials QA' % ('RESUME at ' + RESUME if RESUME else 'START'))
rc, _, _ = run('python3 %s/extract_prompts.py' % E, 'e2e_extract.out')
for src, dst in (('ihub3', 'ihub3_x'), ('zcc_pgtool', 'zcc_pgtool_x')):
    s = open(os.path.join(E, 'prompts', src + '.txt')).read().replace('<your initials>', 'QA').replace('<your table name>', 'x_snc_forecast_v_0_df_cc_summ_dvn')
    open(os.path.join(E, 'prompts', dst + '.txt'), 'w').write(s)
if os.system("sed \"s/^AGENT = 'Forecast Variance'/AGENT = 'Forecast Variance QA'/\" %s/verify.py > %s/verify_qa.py" % (E, E)): stop('verify_qa')
r, q = health(); log('gate: ready=%d queued=%d' % (r, q))
if r > 3000: stop('queue not healthy')
if count('sys_script', 'nameLIKESync Data from Execution to Alignment^active=true'): stop('PPM sync business rules are active again')
if go('ihub1') and not RESUME and dupes() != ['Budget Variance Analysis subflows=0', 'Extract Cost Center subflows=0', 'Get Expense Event subflows=0', 'Compute Budget Totals actions=0', 'Get Expense Event actions=0']:
    stop('start state is not clean: %s' % dupes())

if go('ihub1'): step('ihub1', 'ihub1', pre=(None if RESUME else delete_event_row), text_must=(r'created\s*1',), text_not=(r'skipped\s*1',), resume_run=('ihub1-1102-2142' if RESUME == 'ihub1' else None))
if go('ihub1'): verify_with_heal('ihub1')

if go('ihub2'): txt = step('ihub2', 'ihub2', text_must=(r'CC_IT_001', r'Amazon Web Services', r'compliant', r'109200\.75'))
if go('ihub2'):
    verify_with_heal('ihub2')
    if dupes(): stop('duplicates after ihub2: %s' % dupes())

if go('ihub3_x'):
    step('ihub3_x', 'ihub1')
    verify_with_heal('ihub3')

if go('zcc_pgtool_x'):
    step('zcc_pgtool_x', 'ihub1')
    verify_with_heal('zcc_pgtool')

if go('ihub4_test'):
    c0 = cases(); t_ev = time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime())
    step('ihub4_test', 'ihub1', pre=delete_event_row, text_must=(r'EXP-2025-IT-002-1007-01',), text_not=(r'created\s*0', r'skipped\s*1'))
    log('waiting for the agent run (up to 60 min)')
    done = None; t = time.time()
    while time.time() - t < 3600:
        pl = api.get('table/sn_aia_execution_plan', sysparm_query='objectiveLIKEEXP-2025-IT-002-1007-01^sys_created_on>' + t_ev + '^ORDERBYDESCsys_created_on', sysparm_fields='state,sys_created_on,sys_updated_on', sysparm_limit=1)
        if pl and pl[0]['state'].lower() == 'completed': done = pl[0]; break
        time.sleep(30)
    if not done: stop('agent run did not complete in 60 min: %s' % (pl[:1],))
    log('agent run completed: created %s updated %s (UTC)' % (done['sys_created_on'], done['sys_updated_on']))
    cs = api.get('table/sn_spend_sdc_service_request', sysparm_query='sys_created_on>' + t_ev + '^ORDERBYDESCsys_created_on', sysparm_fields='number,short_description,assigned_to', sysparm_limit=5, sysparm_display_value='false')
    log('new finance cases since the event: %s' % [(c['number'], c['short_description'], (c['assigned_to']['value'] if isinstance(c['assigned_to'], dict) else c['assigned_to'])[:8]) for c in cs])
    if len(cs) != 1: stop('expected exactly 1 new Finance Case, got %d' % len(cs))
    a = cs[0]['assigned_to']; a = a['value'] if isinstance(a, dict) else a
    if a != CHI: stop('Finance Case %s is not assigned to Chi Fen' % cs[0]['number'])
    log('Finance Case %s assigned to Chi Fen: PASS' % cs[0]['number'])


if go('zcc_erp'): step('zcc_erp', 'zcc_erp'); verify_with_heal('zcc_erp')
if go('ldi_props'): step('ldi_props', 'ldi_props'); verify_with_heal('ldi_props')
if go('ldi_owner'): step('ldi_owner', 'ldi_owner'); verify_with_heal('ldi_owner')

ok, lines = verify('all')
for l in lines: log('  ' + l)
log('duplicates now: %s' % (dupes() or 'none'))
log('######## E2E %s in %d min' % ('ALL PASS' if ok else 'FINISHED WITH FAILS', (time.time() - T0) / 60))
