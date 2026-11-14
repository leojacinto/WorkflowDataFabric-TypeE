const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/create-manage',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1359,25);await p.waitForTimeout(3000);await p.screenshot({path:u.S+'sc1_a.png'});
await b.close();})();
