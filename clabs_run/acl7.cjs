const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/navpage.do?sysparm_use_polaris=false',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);
await p.screenshot({path:u.S+'acl7_a.png'});console.log(p.url());
await b.close();})();
