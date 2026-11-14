const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const t of ['sn_aia_execution_plan','sn_aia_execution_task','sn_aia_tools_execution']){
await p.goto(u.H+'/'+t+'_list.do?sysparm_query=ORDERBYDESCsys_created_on',{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.slice(0,6).map(x=>x.innerText.replace(/\s+/g,' ').replace('Select record for action: ','').slice(0,260)));
console.log('##',t,r.length);console.log(r.join('\n'));await p.screenshot({path:u.S+'ex_'+t+'.png'});}
await b.close();})();
