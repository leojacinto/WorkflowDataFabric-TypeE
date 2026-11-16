const u=require('./u7021.cjs');
const T=['model_operation_input','model_operation_output','model_entity','model_table_field'];
async function cnt(p,tn,q){await p.goto(u.H+'/'+tn+'_list.do?sysparm_query='+encodeURIComponent(q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(3500);
 return (await p.locator('text=/to \\d+ of \\d+/').first().innerText().catch(()=>'0')).replace(/Showing rows /,'').replace(/\s+/g,' ');}
(async()=>{const {b,p}=await u.open();
for(const t of T){const tn='sn_erp_integration_'+t;const D='modelISNOTEMPTY^model.sys_idISEMPTY';
 console.log(tn,'| dangling:',await cnt(p,tn,D),'| Forecast Variance scope:',await cnt(p,tn,D+'^sys_scope.name=Forecast Variance'));}
console.log('kept model SAP Cost Center Lab:',await cnt(p,'sn_erp_integration_model','name=SAP Cost Center Lab'));
console.log('its entities:',await cnt(p,'sn_erp_integration_model_entity','model.name=SAP Cost Center Lab'),'| its table fields:',await cnt(p,'sn_erp_integration_model_table_field','model.name=SAP Cost Center Lab'));
await b.close();})();
