const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/353f77d19da89b107f44c3f1c075db1e',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.move(700,600);await p.mouse.wheel(0,700);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'mcp18_a.png'});
await p.mouse.wheel(0,700);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'mcp18_b.png'});
await b.close();})();
