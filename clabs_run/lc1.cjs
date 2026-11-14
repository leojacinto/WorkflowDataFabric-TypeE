const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();await p.waitForTimeout(3000);console.log(p.url());await p.screenshot({path:u.S+'lc1.png'});await b.close();})();
