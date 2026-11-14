// Point the 7021 "Get Details via Neon MCP" tool at the new Forecast Variance scoped server
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tool_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'mc11_list.png'});
await p.locator('a.linked').first().click();await p.waitForTimeout(9000);
console.log(await p.evaluate(()=>JSON.stringify({n:g_form.getValue('name'),td:g_form.getValue('target_document'),tdt:g_form.getValue('target_document_table'),scope:g_form.getValue('sys_scope')})));
await p.screenshot({path:u.S+'mc11_a.png'});
await b.close();})();
