const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_mcp_server_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon^ORnameLIKEMCP'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
console.log(await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').slice(0,200))));
await p.screenshot({path:u.S+'fx6_a.png'});
await b.close();})();
