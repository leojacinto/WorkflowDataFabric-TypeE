const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/manage-mcp-servers',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1319,26);await p.waitForTimeout(3000);
await p.screenshot({path:u.S+'sc2_a.png'});
await b.close();})();
