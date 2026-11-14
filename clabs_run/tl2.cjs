const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_hub_flow_list.do?sysparm_query='+encodeURIComponent('nameLIKEExtract Cost Center'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.screenshot({path:u.S+'tl2_a.png'});
await p.getByRole('link',{name:'Extract Cost Center'}).first().click();await p.waitForTimeout(10000);await u.dismiss(p);
await p.screenshot({path:u.S+'tl2_b.png'});
await b.close();})();
