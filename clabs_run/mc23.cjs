const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_tool_m2m_list.do?sysparm_query='+encodeURIComponent('name=Get Details via Neon MCP'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.locator('a.linked').first().click();await p.waitForTimeout(9000);
console.log(await p.evaluate(()=>{g_form.setValue('active','false');return g_form.getValue('name')+' active='+g_form.getValue('active')}));
await p.mouse.click(1416,21);await p.waitForTimeout(8000);
await p.goto(u.H+'/sn_aia_agent_tool_m2m_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.screenshot({path:u.S+'mc23_a.png'});
await b.close();})();
