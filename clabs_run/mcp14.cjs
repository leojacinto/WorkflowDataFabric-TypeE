const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/353f77d19da89b107f44c3f1c075db1e',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(554,478);await p.keyboard.press('Meta+a');await p.keyboard.type('Forecast Variance Neon MCP Lab',{delay:30});
for(let i=1;i<=9;i++){
 await p.mouse.click(1486,866);await p.waitForTimeout(5000);
 const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
 await p.screenshot({path:u.S+'mcp14_'+i+'.png'});}
await b.close();})();
