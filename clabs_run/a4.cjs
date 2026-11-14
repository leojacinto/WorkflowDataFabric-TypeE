const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/classic/params/target/sys_user_has_role_list.do%3Fsysparm_query%3Duser.user_name%3Dadmin%5Erole.name%3Dsn_aia.admin',{timeout:90000});
await p.waitForTimeout(10000);await u.dismiss(p);await p.waitForTimeout(2000);
await p.screenshot({path:u.S+'a4_role.png'});
console.log((await p.innerText('body').catch(()=>'')).slice(0,200));
await b.close();})();
