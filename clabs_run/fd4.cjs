const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_scope_list.do?sysparm_query='+encodeURIComponent('nameLIKELab'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.screenshot({path:u.S+'fd4_a.png'});
await b.close();})();
