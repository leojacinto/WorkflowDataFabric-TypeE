const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const [t,q] of [['sys_flow_context','nameLIKEBudget^ORnameLIKEExtract^ORORDERBYDESCsys_created_on'],['sn_aia_execution_plan','ORDERBYDESCsys_created_on']]){
await p.goto(u.H+'/'+t+'_list.do?sysparm_query='+encodeURIComponent(q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.slice(0,5).map(x=>x.innerText.replace(/\s+/g,' ').replace('Select record for action: ','').slice(0,220)));console.log('##',t,r.length);console.log(r.join('\n'));}
await b.close();})();
