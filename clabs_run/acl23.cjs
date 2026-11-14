const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tool.do?sys_id=70854bae3b4272900ad1a021a3e45a34',{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'acl23_a.png'});
await b.close();})();
