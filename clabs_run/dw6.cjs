const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tools_execution_list.do?sysparm_query=ORDERBYDESCsys_created_on',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'dw6_list.png'});
await p.locator('a.linked').first().click();await p.waitForTimeout(9000);
await p.screenshot({path:u.S+'dw6_a.png'});await p.mouse.wheel(0,800);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'dw6_b.png'});
await b.close();})();
