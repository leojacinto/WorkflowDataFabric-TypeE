const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1566,26);await p.waitForTimeout(2500);
await p.mouse.click(1450,+process.env.Y);await p.waitForTimeout(5000);
await p.screenshot({path:u.S+'acl5_b.png'});await b.close();})();
