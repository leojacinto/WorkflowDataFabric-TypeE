const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/9e17686d9dec9b107f44c3f1c075db75',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1486,866);await p.waitForTimeout(5000);
let d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
await p.mouse.click(1505,224);await p.waitForTimeout(2000);await p.mouse.click(1476,481);await p.waitForTimeout(8000);
await p.mouse.click(790,306);await p.waitForTimeout(2500);await p.mouse.click(533,433);await p.waitForTimeout(15000);await p.screenshot({path:u.S+'mc16_server.png'});
await p.mouse.click(780,376);await p.waitForTimeout(5000);await p.keyboard.type('Run SQL',{delay:50});await p.waitForTimeout(3000);await p.screenshot({path:u.S+'mc16_search.png'});await p.mouse.click(499,441);await p.waitForTimeout(6000);
await p.mouse.move(790,550);await p.mouse.wheel(0,1500);await p.waitForTimeout(1500);
await p.mouse.click(790,321);await p.keyboard.press('Meta+a');await p.keyboard.type('Get Details via Neon MCP',{delay:20});
await p.mouse.click(790,407);await p.keyboard.press('Meta+a');
await p.keyboard.type('Use this tool to read cost center budget variance from Neon. Always pass these inputs: project_id: bitter-lab-28038915 (snake_case, not projectId); sql: SELECT cost_center, actual_amount_usd, baseline_amount_usd, variance, variance_pct FROM "VARIANCE_BASELINE_V" WHERE cost_center = \'{{cost_center}}\' LIMIT 1',{delay:5});
await p.mouse.click(562,499);await p.waitForTimeout(800);await p.screenshot({path:u.S+'mc16_pre_add.png'});
await b.close();})();
