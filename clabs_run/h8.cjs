const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/builder?table=sys_hub_flow&sysId=35b5bb183bda365062f31831a3e45aa1',{timeout:90000}).catch(()=>{});await p.waitForTimeout(30000);await u.dismiss(p);
await p.mouse.click(1580,172);await p.waitForTimeout(4000);
await p.screenshot({path:u.S+'h8_a.png'});
await b.close();})();
