// Elevate, open ACL by name (ACL_NAME), add admin role row
const u=require('./u7021.cjs');
const NAME=process.env.ACL_NAME;
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.locator('.user-menu-label').first().click({force:true});await p.waitForTimeout(6000);
await p.getByText('Elevate role',{exact:true}).first().dispatchEvent('click');await p.waitForTimeout(6000);
await p.mouse.click(533,486);await p.waitForTimeout(1000);
await p.mouse.click(1032,597);await p.waitForTimeout(8000);
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query=operation=invoke_from_ai^name='+NAME,{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'acl22_a.png'});
for(let k=0;k<4;k++){await p.mouse.dblclick(202,703);await p.waitForTimeout(2500);await p.keyboard.type('admin',{delay:80});await p.waitForTimeout(3500);if(await p.getByText('Showing 1 through 1 of 1').count())break;await p.keyboard.press('Escape');await p.waitForTimeout(1000);}
await p.mouse.click(171,766);await p.waitForTimeout(1500);
await p.screenshot({path:u.S+'acl22_pre.png'});await p.mouse.click(365,711);await p.waitForTimeout(3000);await p.screenshot({path:u.S+'acl22_mid.png'});await p.mouse.click(1483,21);await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'acl22_b.png'});
await b.close();})();
