const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query='+encodeURIComponent('operation.name=invoke_from_ai^nameLIKEmcp^ORoperation.name=invoke_from_ai^nameLIKEstreaming^ORDERBYname'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
console.log(await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').slice(0,160))));
await p.goto(u.H+'/sys_hub_flow_list.do?sysparm_query='+encodeURIComponent('name=MCP with Streaming - Subflow'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.locator('a.linked').first().click();await p.waitForTimeout(12000);await p.screenshot({path:u.S+'dw9_flow.png'});console.log(p.url());
await b.close();})();
