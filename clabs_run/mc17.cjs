const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_outbound_http_log_list.do?sysparm_query='+encodeURIComponent('urlLIKEneon.tech^ORDERBYDESCsys_created_on'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
await p.locator('a.linked').first().click();await p.waitForTimeout(9000);await p.screenshot({path:u.S+'mc17_a.png'});await p.mouse.wheel(0,600);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'mc17_b.png'});
await b.close();})();
