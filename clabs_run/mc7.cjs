// Set API Key Header = Authorization on the Neon MCP credential (7021), then Update
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/discovery_credentials_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
await p.mouse.click(437,153);await p.keyboard.type('Authorization',{delay:50});await p.waitForTimeout(1000);
await p.screenshot({path:u.S+'mc7_pre.png'});
await p.mouse.click(1281,21);await p.waitForTimeout(8000);
await p.goto(u.H+'/discovery_credentials_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'mc7_post.png'});
await b.close();})();
