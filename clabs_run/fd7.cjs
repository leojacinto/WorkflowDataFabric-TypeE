const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/$sn-appcreator.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
console.log(p.url());await p.screenshot({path:u.S+'fd7_a.png'});
await b.close();})();
