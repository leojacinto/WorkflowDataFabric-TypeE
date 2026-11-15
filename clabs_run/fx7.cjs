const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_mcp_server_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
const ids=await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.getAttribute('sys_id')));
for(const id of ids){await p.goto(u.H+'/sn_mcp_server.do?sys_id='+id,{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
 const v=await p.evaluate(()=>{const g=window.g_form;return g?['name','internal_name','sys_scope'].map(f=>f+'='+g.getValue(f)).join(' | '):'noform';});console.log(id,v);}
await b.close();})();
