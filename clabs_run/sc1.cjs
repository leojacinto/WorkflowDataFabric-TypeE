const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_user_preference_list.do?sysparm_query='+encodeURIComponent('name=apps.current^user.user_name=admin'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'sc1_a.png'});
await b.close();})();
