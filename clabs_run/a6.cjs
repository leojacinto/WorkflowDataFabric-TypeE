const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_user.do?sys_id=6816f79cc0a8016401c5a33be04be441',{timeout:90000});
await p.waitForTimeout(8000);await u.dismiss(p);
await p.mouse.click(1551,780);await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'a6_a.png'});
await b.close();})();
