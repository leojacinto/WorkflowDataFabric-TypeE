const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/home/subflow',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1217,92);await p.waitForTimeout(1000);
await p.mouse.click(827,289);await p.waitForTimeout(1500);
await p.screenshot({path:u.S+'h3_a.png'});
await b.close();})();
