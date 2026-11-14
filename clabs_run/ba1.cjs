const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/$studio.do?sysparm_transaction_scope=a4fd2da13bf8be5062f31831a3e45ac9&sysparm_nostack=true',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
console.log(p.url());await p.screenshot({path:u.S+'ba1_a.png'});await b.close();})();
