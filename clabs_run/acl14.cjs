const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query=operation=invoke_from_ai^type=flow',{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'acl14_a.png'});
await b.close();})();
