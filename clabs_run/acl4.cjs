const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_security_acl.do?sys_id=-1',{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'acl4_a.png',fullPage:true});await b.close();})();
