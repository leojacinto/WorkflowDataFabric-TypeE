// Remove the Integration Hub test build from Forecast Variance: every app file created since SINCE,
// the generated Global trigger flows, the alias's HTTP connection, and the test Finance Case.
var SCOPE = 'a4fd2da13bf8be5062f31831a3e45ac9';
var SINCE = '2026-10-31 17:00:00';
var out = { flows: [], other: [], deleted: {}, missing: 0 };
['95c028d13b10df58a0db3141a3e45a80', '031bd38d47dc5754037d0fadf26d431f'].forEach(function (id) {
    var f = new GlideRecord('sys_hub_flow');
    if (f.get(id)) { out.flows.push(f.getValue('name')); f.deleteRecord(); }
});
var ids = [];
var m = new GlideRecord('sys_metadata');
m.addQuery('sys_scope', SCOPE);
m.addQuery('sys_created_on', '>', SINCE);
m.query();
while (m.next()) ids.push([m.getValue('sys_class_name'), m.getUniqueValue()]);
out.found = ids.length;
ids.forEach(function (p) {
    var g = new GlideRecord(p[0]);
    if (g.get(p[1])) { g.deleteRecord(); out.deleted[p[0]] = (out.deleted[p[0]] || 0) + 1; } else { out.missing++; }
});
var c = new GlideRecord('http_connection');
if (c.get('2c2765d0f4b24dc6b5bbc65a93722c32')) { out.other.push('http_connection ' + c.getValue('name')); c.deleteRecord(); }
var fc = new GlideRecord('sn_spend_sdc_service_request');
if (fc.get('number', 'FINC0010001')) { out.other.push('finance case FINC0010001'); fc.deleteRecord(); }
gs.info('CLEANUP=' + JSON.stringify(out));
