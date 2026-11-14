const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/external-content-connectors/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(25000);await u.dismiss(p);
await p.mouse.click(1165,596);await p.waitForTimeout(2000);await p.screenshot({path:u.S+'xd2_a.png'});
await b.close();})();
