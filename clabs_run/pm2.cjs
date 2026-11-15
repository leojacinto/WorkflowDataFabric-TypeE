const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/manage-mcp-servers',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.getByRole('button',{name:'New'}).first().click();await p.waitForTimeout(4000);
await p.mouse.click(800,392);await p.keyboard.type('DeepWiki MCP',{delay:40});
await p.mouse.click(800,458);await p.waitForTimeout(2000);await p.mouse.click(556,522);await p.waitForTimeout(1500);await p.mouse.click(800,524);await p.keyboard.type('https://mcp.deepwiki.com/mcp',{delay:20});await p.waitForTimeout(1000);await p.mouse.click(1049,580);await p.waitForTimeout(5000);await p.screenshot({path:u.S+'pm2_a.png'});
await b.close();})();
