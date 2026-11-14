const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/manage-mcp-servers',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.getByText('Neon MCP Lab',{exact:true}).first().click();await p.waitForTimeout(10000);await p.screenshot({path:u.S+'mc3_a.png'});
await b.close();})();
