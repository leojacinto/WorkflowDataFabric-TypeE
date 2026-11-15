const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/servicenow-studio/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(40000);await u.dismiss(p);
await p.screenshot({path:u.S+'st3_a.png'});
await b.close();})();
