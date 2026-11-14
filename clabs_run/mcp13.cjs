const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/353f77d19da89b107f44c3f1c075db1e',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(554,478);await p.keyboard.press('Meta+a');await p.keyboard.type('Forecast Variance Neon MCP Lab',{delay:30});
await p.mouse.click(1486,866);await p.waitForTimeout(6000);
await p.mouse.click(1011,510);await p.waitForTimeout(9000);await p.screenshot({path:u.S+'mcp13_a.png'});
await p.mouse.click(1486,866);await p.waitForTimeout(9000);await p.screenshot({path:u.S+'mcp13_b.png'});
await b.close();})();
