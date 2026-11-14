// Duplicate "Forecast Variance" in Forecast Variance scope, rename, return new agent sys_id
const u=require('./u7021.cjs');
const NAME=process.env.AGENT_NAME||'Forecast Variance Neon MCP Lab FV';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/create-manage',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(211,211);await p.waitForTimeout(8000);
await p.mouse.click(105,289);await p.waitForTimeout(3000);
await p.mouse.click(385,444);await p.waitForTimeout(1500);await p.keyboard.type('Name',{delay:60});await p.waitForTimeout(2000);
await p.mouse.click(69,545);await p.waitForTimeout(2000);
await p.mouse.click(738,444);await p.waitForTimeout(1500);await p.mouse.click(540,564);await p.waitForTimeout(1000);
await p.screenshot({path:u.S+'full1_pre.png'});await p.waitForTimeout(1500);const inp=p.locator('now-input[placeholder="Enter value"] input').first();console.log('inputs',await inp.count());await inp.fill('Forecast Variance');await p.waitForTimeout(800);
await p.mouse.click(1551,483);await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'full1_a.png'});
await b.close();})();
