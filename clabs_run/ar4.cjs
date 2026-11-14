const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tool_list.do?sysparm_query='+encodeURIComponent('name=Budget Variance Analysis'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.mouse.click(152,130);await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'ar4_a.png'});await p.mouse.wheel(0,700);await p.waitForTimeout(1000);await p.screenshot({path:u.S+'ar4_b.png'});
console.log(p.url());
await b.close();})();
