const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_db_object_list.do?sysparm_query='+encodeURIComponent('nameSTARTSWITHsn_erp_integration_model_operation_entit'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(5000);
const names=await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ')));console.log(names);
const tn='sn_erp_integration_model_operation_entity_flag';
await p.goto(u.H+'/'+tn+'_list.do?sysparm_query='+encodeURIComponent('model_entityISNOTEMPTY^model_entity.model.sys_idISEMPTY^model.name=SAP Cost Center Lab'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(4000);
console.log('invalid table:',await p.locator('text=/Invalid table|does not exist/i').count(),'| kept-model rows pointing to orphan entity:',await p.locator('tr.list_row').count());
await b.close();})();
