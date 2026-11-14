const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_user_list.do?sysparm_query=user_name=admin',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'acl19_a.png'});
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query=nameLIKEforecast_v_0^operation=invoke_from_ai',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'acl19_b.png'});
await b.close();})();
