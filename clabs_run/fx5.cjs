const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query='+encodeURIComponent('type.name=gen_ai_mcp_server^nameLIKEneon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'fx5_p1.png'});await p.mouse.wheel(0,800);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'fx5_p2.png'});
await b.close();})();
