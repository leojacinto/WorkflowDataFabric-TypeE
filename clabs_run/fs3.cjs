const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1319,25);await p.waitForTimeout(2500);await p.mouse.click(1452,77);await p.waitForTimeout(2500);
await p.mouse.click(1432,72);await p.waitForTimeout(9000);
await p.mouse.click(1565,73);await p.waitForTimeout(25000);await p.screenshot({path:u.S+'fs3_a_new.png'});console.log(p.url());
await b.close();})();
