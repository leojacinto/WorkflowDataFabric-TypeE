// Third pass of the TypeE test cleanup: the last global leftovers of my 2026-10-31 14:10 UTC test trigger flow
// (its snapshot, record trigger, two inputs and their two labels). Records already gone are reported as missing.
// Run in Scripts - Background with global picked in the "in scope" list; in any other scope it stops before deleting anything.
(function () {
    var scope = gs.getCurrentScopeName();
    if (scope != 'rhino.global' && scope != 'global') { gs.info('IHUB_CLEANUP stopped in scope ' + scope + ': pick global in the scope list and run again'); return; }
    var plan = [["sys_hub_flow_snapshot", "331b178d47dc5754037d0fadf26d43f5"], ["sys_hub_trigger_instance_v2", "371b578d47dc5754037d0fadf26d4377"], ["sys_hub_flow_input", "7b1b178d47dc5754037d0fadf26d43f8"], ["sys_hub_flow_input", "b71b578d47dc5754037d0fadf26d4354"], ["sys_documentation", "3f1b578d47dc5754037d0fadf26d435b"], ["sys_documentation", "771b578d47dc5754037d0fadf26d4305"]];
    var done = {}, missing = [], failed = [];
    plan.forEach(function (p) {
        var gr = new GlideRecord(p[0]);
        if (!gr.get(p[1])) { missing.push(p[0] + ' ' + p[1]); return; }
        if (gr.deleteRecord()) { done[p[0]] = (done[p[0]] || 0) + 1; } else { failed.push(p[0] + ' ' + p[1]); }
    });
    gs.info('IHUB_CLEANUP deleted ' + JSON.stringify(done) + ' | missing ' + missing.length + ' | failed ' + JSON.stringify(failed) + ' | of ' + plan.length);
})();
