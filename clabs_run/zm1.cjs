const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/manage-mcp-servers',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
console.log(p.url());await p.screenshot({path:u.S+'zm1.png'});
console.log((await p.locator('body').innerText()).slice(0,800));await b.close();})();
