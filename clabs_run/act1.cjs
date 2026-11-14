const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_hub_action_type_definition_list.do?sysparm_query='+encodeURIComponent('nameLIKEBudget^ORnameLIKEExpense^ORnameLIKECost'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').replace('Select record for action: ','').slice(0,120)));console.log(r.length);console.log(r.join('\n'));
await b.close();})();
