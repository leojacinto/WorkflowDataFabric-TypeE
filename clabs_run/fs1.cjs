const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1319,25);await p.waitForTimeout(3000);await p.mouse.click(1452,77);await p.waitForTimeout(3000);await p.screenshot({path:u.S+'fs1_a.png'});
await b.close();})();
