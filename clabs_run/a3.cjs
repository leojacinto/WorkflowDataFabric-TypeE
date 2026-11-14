const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/classic/params/target/sys_app.do%3Fsys_id%3D-1',{timeout:90000}).catch(()=>{});
await p.waitForTimeout(9000);
await p.screenshot({path:u.S+'a3_home.png'});
await b.close();})();
