const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const n of ['Budget Variance Analysis']){
await p.goto(u.H+'/sys_hub_flow_list.do?sysparm_query='+encodeURIComponent('name='+n),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.locator('table.list_table tbody tr.list_row a.linked').first().click().catch(()=>{});await p.waitForTimeout(45000);await u.dismiss(p);
await p.screenshot({path:u.S+'zu2_'+n.replace(/ /g,'_')+'.png'});}
await b.close();})();
