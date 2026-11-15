const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
console.log(await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.getAttribute('sys_id')+' | '+x.innerText.replace(/\s+/g,' ').slice(0,80))));
await b.close();})();
