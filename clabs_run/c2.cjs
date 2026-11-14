const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/home/subflow',{timeout:90000});await p.waitForTimeout(25000);await u.dismiss(p);
await p.screenshot({path:u.S+'c2.png'});
await b.close();})();
