const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
const q='sourceINsn_mcp_client,sn_mcp_server,sn_wdf_mcp_client,sn_mcp_universal_client^ORnameLIKEModel Context Protocol^ORnameLIKEMCP';
await p.goto(u.H+'/sys_store_app_list.do?sysparm_query='+encodeURIComponent(q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').replace('Select record for action: ','').slice(0,200)));
console.log(u.H);console.log(r.join('\n')||await p.locator('body').innerText().then(t=>t.slice(0,300)));
await p.screenshot({path:u.S+'vc1_'+(process.env.TAG||'x')+'.png'});await b.close();})();
