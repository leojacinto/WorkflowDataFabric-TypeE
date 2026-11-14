# Rebuilds the cleanup script from what is still on the instance (scopecheck.json, taken after the first run)
# plus the cross-scope privileges added by my tests and by the first run.
import json, re, subprocess, urllib.parse
import os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'work')
F = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'cleanup_ihub_build.js')
H = 'https://demoalectriallwfaa158438.service-now.com'
src = open(F).read()
plan = json.loads(re.search(r'var plan = (\[.*?\]\]);', src, re.S).group(1))
left = {(t, x['sys_id']) for t, rows in json.load(open(D + '/scopecheck.json')).items() for x in rows}
keep = [p for p in plan if tuple(p) in left]
q = urllib.parse.urlencode({'sysparm_query': 'source_scope=a4fd2da13bf8be5062f31831a3e45ac9^ORDERBYDESCsys_created_on', 'sysparm_fields': 'sys_id,sys_created_on,sys_created_by', 'sysparm_limit': '80'})
privs = json.loads(subprocess.run(['curl', '-s', '-K', D + '/curlauth.cfg', '-H', 'Accept: application/json', f'{H}/api/now/table/sys_scope_privilege?{q}'], capture_output=True, text=True).stdout)['result']
run1 = [x['sys_id'] for x in privs if '2026-10-31 23:18:00' <= x['sys_created_on'] <= '2026-10-31 23:20:00' and x['sys_created_by'] == 'admin']
mine = ['67a9df0547dc5754037d0fadf26d439d', '6fa9df0547dc5754037d0fadf26d4392', '590e70d947145b54037d0fadf26d43fd']
assert len(run1) == 36, len(run1)
have = {p[1] for p in keep}
new = keep + [['sys_scope_privilege', s] for s in sorted(run1) + mine if s not in have]
body = '''// Second pass of the TypeE test cleanup. The first run went in the Forecast Variance scope: it removed the agent, its trigger
// and the flows, the platform refused the rest, and it added 36 cross-scope privileges to Forecast Variance.
// This pass removes what is left of my test builds (Integration Hub, 2026-10-31, and the Fundamentals practice table
// "Expense Transaction Event DVN", whose sys_db_object delete drops the table), my three test Finance Cases,
// and the cross-scope privileges from my tests and from the first run. Records already gone are reported as missing.
// Run in Scripts - Background with global picked in the scope list; in any other scope it stops before deleting anything.
(function () {
    var scope = gs.getCurrentScopeName();
    if (scope != 'rhino.global' && scope != 'global') { gs.info('IHUB_CLEANUP stopped in scope ' + scope + ': pick global in the scope list and run again'); return; }
    var plan = %s;
    var done = {}, missing = [], failed = [];
    plan.forEach(function (p) {
        var gr = new GlideRecord(p[0]);
        if (!gr.get(p[1])) { missing.push(p[0] + ' ' + p[1]); return; }
        if (gr.deleteRecord()) { done[p[0]] = (done[p[0]] || 0) + 1; } else { failed.push(p[0] + ' ' + p[1]); }
    });
    gs.info('IHUB_CLEANUP deleted ' + JSON.stringify(done) + ' | missing ' + missing.length + ' | failed ' + JSON.stringify(failed) + ' | of ' + plan.length);
})();
''' % json.dumps(new)
open(F, 'w').write(body)
from collections import Counter
print('kept from first plan:', len(keep), '| new privileges:', len(run1), '| older test privileges:', len(mine), '| total:', len(new))
print(dict(Counter(p[0] for p in new)))
