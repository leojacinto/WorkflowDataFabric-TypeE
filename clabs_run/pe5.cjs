const u=require('./u7021.cjs');
const T=['model_entity','model_operation','model_operation_input','model_operation_input_mapping','model_operation_output','model_table_field'];
(async()=>{const {b,p}=await u.open();
for(const t of T){const tn='sn_erp_integration_'+t;
for(const [lab,q] of [['all','modelISNOTEMPTY^model.sys_idISEMPTY'],['outside_clone_day','modelISNOTEMPTY^model.sys_idISEMPTY^sys_created_on<2026-11-03 00:00:00^ORmodelISNOTEMPTY^model.sys_idISEMPTY^sys_created_on>2026-11-03 23:59:59']]){
await p.goto(u.H+'/'+tn+'_list.do?sysparm_query='+encodeURIComponent(q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(4500);
const txt=await p.locator('text=/to \\d+ of \\d+/').first().innerText().catch(()=>'rows='+0);console.log(tn,lab,txt.replace(/\s+/g,' '));}}
await b.close();})();
