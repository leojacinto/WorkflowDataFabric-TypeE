const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/home/actions',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
console.log(p.url());await p.screenshot({path:u.S+'act2_a.png'});await b.close();})();
