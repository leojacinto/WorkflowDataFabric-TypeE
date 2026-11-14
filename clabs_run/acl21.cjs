const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query=nameSTARTSWITHx_snc_forecast_v_0^operation=invoke_from_ai',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'acl21_a.png'});
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'acl21_b.png'});
await b.close();})();
