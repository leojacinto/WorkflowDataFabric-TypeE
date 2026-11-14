const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_hub_flow_list.do?sysparm_query='+encodeURIComponent('nameLIKEBudget Variance^ORnameLIKEExtract Cost^ORnameLIKEExpense Event'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').replace('Select record for action: ','').slice(0,140)));console.log(r.length);console.log(r.join('\n'));
await p.screenshot({path:u.S+'zu1_list.png'});
await p.locator('table.list_table tbody tr.list_row a.linked').first().click().catch(()=>{});await p.waitForTimeout(22000);await u.dismiss(p);
console.log(p.url());await p.screenshot({path:u.S+'zu1_flow.png'});await b.close();})();
