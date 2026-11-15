const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/servicenow-studio/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(40000);await u.dismiss(p);
await p.getByText(/^Question only, do not change/).first().click();await p.waitForTimeout(30000);
await p.mouse.click(800,747);await p.keyboard.insertText('On my other instance (Brazil patch 2) creating an ACL of type gen_ai_mcp_server, operation execute, name global.global.Neon MCP Lab through the Access Control form fails on Submit with Invalid update and Match not found reset to original on the Operation field, even when execute is picked from the lookup. What makes that insert fail, and what is the supported way to create the ACL for an MCP server (for example from the MCP server record or a different application scope)? Answer in at most 8 lines.');await p.waitForTimeout(1000);await p.mouse.click(1158,800);
for(let i=1;i<=12;i++){await p.waitForTimeout(15000);}
await p.mouse.move(800,400);await p.mouse.wheel(0,20000);await p.waitForTimeout(2000);await p.screenshot({path:u.S+'st8_a.png'});
await p.mouse.wheel(0,-650);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'st8_b.png'});
await b.close();})();
