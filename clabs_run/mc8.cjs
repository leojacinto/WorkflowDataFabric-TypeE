const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_tool_m2m_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'mc8_list.png'});
await p.locator('a.linked').first().click();await p.waitForTimeout(9000);
await p.screenshot({path:u.S+'mc8_a.png'});
await p.mouse.wheel(0,700);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'mc8_b.png'});
await b.close();})();
