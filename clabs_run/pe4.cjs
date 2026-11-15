const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const t of ['model_operation','model_entity','model_table_field']){const tn='sn_erp_integration_'+t;
await p.goto(u.H+'/'+tn+'_list.do?sysparm_query='+encodeURIComponent('modelISNOTEMPTY^model.sys_idISEMPTY^ORDERBYDESCsys_created_on'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'pe4_'+t+'.png'});
const ids=await p.locator('tr.list_row').evaluateAll(r=>r.slice(0,3).map(x=>x.getAttribute('sys_id')));console.log(t,ids);}
await b.close();})();
