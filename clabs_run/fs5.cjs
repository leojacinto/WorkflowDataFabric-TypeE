const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_glider_app/servicenow_studio.do?table=sys_app&sysId=-1',{timeout:90000}).catch(()=>{});await p.waitForTimeout(45000);
console.log(p.url());await p.screenshot({path:u.S+'fs5_a.png'});
await b.close();})();
