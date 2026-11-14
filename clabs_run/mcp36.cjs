const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/conversational-studio/builder?table=sys_now_assist_deployment&sysId=7bd9820f14475650f87711349c1171be',{timeout:90000}).catch(()=>{});await p.waitForTimeout(25000);await u.dismiss(p);
await p.mouse.click(1525,80);await p.waitForTimeout(6000);await p.screenshot({path:u.S+'mcp36_a.png'});
await b.close();})();
