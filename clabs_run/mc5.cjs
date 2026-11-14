const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_alias_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'mc5_a.png'});
await p.locator('a.linked').first().click();await p.waitForTimeout(9000);
await p.screenshot({path:u.S+'mc5_b.png'});
await b.close();})();
