const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/manage-mcp-servers',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.getByText('Create and manage',{exact:true}).first().click();await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'zm4a.png'});
console.log(p.url());console.log((await p.locator('body').innerText()).slice(0,500));await b.close();})();
