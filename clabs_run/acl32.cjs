// Elevate, open ACL x_snc_forecast_v_0.extract_cost_center, delete it
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.locator('.user-menu-label').first().click({force:true});await p.waitForTimeout(6000);
await p.getByText('Elevate role',{exact:true}).first().dispatchEvent('click');await p.waitForTimeout(6000);
await p.mouse.click(533,486);await p.waitForTimeout(1000);
await p.mouse.click(1032,597);await p.waitForTimeout(8000);
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query=operation=invoke_from_ai^name=x_snc_forecast_v_0.extract_cost_center',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'acl32_a.png'});
await p.mouse.click(1414,21);await p.waitForTimeout(4000);
await p.screenshot({path:u.S+'acl32_b.png'});
await b.close();})();
