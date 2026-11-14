const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/manage-mcp-servers',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.screenshot({path:u.S+'mc2_a.png'});
await b.close();})();
