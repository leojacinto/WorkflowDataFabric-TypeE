const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(178,25);await p.waitForTimeout(2500);await p.keyboard.type('Studio',{delay:60});await p.waitForTimeout(3500);
await p.screenshot({path:u.S+'st1_a.png'});
await b.close();})();
