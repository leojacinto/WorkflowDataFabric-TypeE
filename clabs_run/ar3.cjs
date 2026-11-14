const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tool_list.do?sysparm_query='+encodeURIComponent('name=Budget Variance Analysis'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);await u.dismiss(p);
await p.getByRole('link',{name:'Budget Variance Analysis'}).first().click();await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'ar3_a.png'});await p.mouse.wheel(0,600);await p.waitForTimeout(1000);await p.screenshot({path:u.S+'ar3_b.png'});
await b.close();})();
