const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/353f77d19da89b107f44c3f1c075db1e',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.move(700,600);await p.mouse.wheel(0,700);await p.waitForTimeout(1500);
await p.mouse.click(700,516);await p.keyboard.press('End');
await p.keyboard.type('\n- Also run the MCP tool "Get Details via Neon MCP" as a secondary check. Only return one entry (limit = 1). Columns should be ["COST_CENTER", "ACTUAL_AMOUNT_USD", "BASELINE_AMOUNT_USD", "VARIANCE", "VARIANCE_PCT"].',{delay:5});
await p.waitForTimeout(800);await p.screenshot({path:u.S+'mcp19_a.png'});
await p.mouse.click(1486,866);await p.waitForTimeout(5000);
const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
await p.mouse.click(1505,224);await p.waitForTimeout(2500);await p.screenshot({path:u.S+'mcp19_b.png'});
await b.close();})();
