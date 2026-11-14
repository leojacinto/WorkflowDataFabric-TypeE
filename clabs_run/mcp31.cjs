const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/now-assist-admin/now-assist-panel',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.mouse.click(1116,461);await p.waitForTimeout(4000);await p.mouse.click(1031,526);await p.waitForTimeout(10000);await p.screenshot({path:u.S+'mcp32_a.png'});
await b.close();})();
