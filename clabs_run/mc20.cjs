// Set Connection URL of the new FV connection to https://mcp.neon.tech/mcp
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/http_connection_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon MCP Lab FV'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
console.log(await p.evaluate(()=>{g_form.setValue('connection_url','https://mcp.neon.tech/mcp');return g_form.getValue('connection_url')}));
await p.waitForTimeout(1000);await p.mouse.click(1281,21);await p.waitForTimeout(8000);
await p.goto(u.H+'/http_connection_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon MCP Lab FV'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
console.log(await p.evaluate(()=>g_form.getValue('connection_url')));
await b.close();})();
