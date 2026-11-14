const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_mcp_server_tool_list.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
await p.screenshot({path:u.S+'mc13_a.png'});
await b.close();})();
