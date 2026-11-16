const u=require('./u7021.cjs');const fs=require('fs');
const T=['model_operation_input_mapping','model_operation_input','model_operation_output','model_operation','model_entity','model_table_field'];
const Q='modelISNOTEMPTY^model.sys_idISEMPTY';
(async()=>{const {b,p}=await u.open();const out=[];
for(const t of T){const tn='sn_erp_integration_'+t;let first=0;let got=0;
 for(;;){await p.goto(u.H+'/'+tn+'_list.do?sysparm_query='+encodeURIComponent(Q)+'&sysparm_first_row='+(first+1),{timeout:90000}).catch(()=>{});await p.waitForTimeout(4500);
  const rows=await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>({id:x.getAttribute('sys_id'),name:(x.querySelector('a.linked')||{innerText:''}).innerText.trim()})));
  if(!rows.length)break;for(const r of rows)out.push({table:tn,...r});got+=rows.length;first+=rows.length;if(rows.length<100)break;}
 console.log(tn,got);}
fs.writeFileSync('/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/erp_orphans.json',JSON.stringify(out));
console.log('total',out.length,'unique',new Set(out.map(o=>o.id)).size);
await b.close();})();
