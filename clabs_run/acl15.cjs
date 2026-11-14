const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query=operation=invoke_from_ai^type=flow^name=sn_itsm_aia.action_engagement',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.getByText('sn_itsm_aia.action_engagement',{exact:true}).first().click();await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'acl15_a.png'});
await b.close();})();
