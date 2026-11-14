const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_scope_list.do?sysparm_query='+encodeURIComponent('nameLIKELab'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.getByRole('button',{name:'New'}).first().click();await p.waitForTimeout(15000);await u.dismiss(p);await p.screenshot({path:u.S+'fd6_a.png'});console.log(p.url());
await b.close();})();
