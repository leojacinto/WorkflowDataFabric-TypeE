const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/create-manage',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(211,211);await p.waitForTimeout(6000);
await p.mouse.click(36,289);await p.waitForTimeout(1500);await p.keyboard.type('Forecast',{delay:50});await p.keyboard.press('Enter');await p.waitForTimeout(5000);
await p.screenshot({path:u.S+'mcp2_b.png'});
await b.close();})();
