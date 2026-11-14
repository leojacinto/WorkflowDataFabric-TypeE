const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/home/subflow',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1217,92);await p.waitForTimeout(500);
await p.mouse.wheel(0,2000);await p.waitForTimeout(1000);
await p.mouse.click(995,843);await p.waitForTimeout(1500);
await p.screenshot({path:u.S+'h6_a.png'});
await b.close();})();
