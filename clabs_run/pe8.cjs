const u=require('./u7021.cjs');
const T=['model_operation_input_mapping','model_operation_input','model_operation_output','model_operation','model_entity','model_table_field'];
(async()=>{const {b,p}=await u.open();
for(const t of T){const tn='sn_erp_integration_'+t;
await p.goto(u.H+'/'+tn+'_list.do?sysparm_query='+encodeURIComponent('modelISNOTEMPTY^model.sys_idISEMPTY'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(4000);
const txt=await p.locator('text=/to \\d+ of \\d+/').first().innerText().catch(()=>'0 rows');console.log('orphans',tn,txt.replace(/\s+/g,' '));}
await p.goto(u.H+'/sys_audit_delete_list.do?sysparm_query='+encodeURIComponent('tablenameSTARTSWITHsn_erp_integration^sys_created_on>=javascript:gs.daysAgoStart(1)^ORDERBYDESCsys_created_on'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.screenshot({path:u.S+'pe8_audit.png'});
const txt=await p.locator('text=/to \\d+ of \\d+/').first().innerText().catch(()=>'0 rows');console.log('audit_delete rows',txt.replace(/\s+/g,' '));
await b.close();})();
