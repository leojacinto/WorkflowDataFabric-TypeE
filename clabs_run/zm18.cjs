const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/playground',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.mouse.click(133,428);await p.waitForTimeout(6000);await p.mouse.click(590,294);await p.waitForTimeout(2000);await p.mouse.click(133,327);await p.waitForTimeout(4000);
await p.screenshot({path:u.S+'zm18a.png'});await b.close();})();
