const u=require('./u7021.cjs');
const NAME=process.env.ACL_NAME, GO=process.env.SUBMIT==='1';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.locator('.user-menu-label').first().click({force:true});await p.waitForTimeout(6000);
await p.getByText('Elevate role',{exact:true}).first().dispatchEvent('click');await p.waitForTimeout(6000);
await p.mouse.click(533,486);await p.waitForTimeout(1000);
await p.mouse.click(1032,597);await p.waitForTimeout(8000);
await p.goto(u.H+'/sys_security_acl.do?sys_id=-1&sysparm_query='+encodeURIComponent('type=gen_ai_mcp_server^name='+NAME),{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
await p.mouse.click(420,166);await p.keyboard.press('Meta+a');await p.keyboard.type('exec',{delay:150});await p.waitForTimeout(5000);
await p.mouse.click(313,212);await p.waitForTimeout(2000);await p.screenshot({path:u.S+'fx10_a.png'});if(GO){await p.mouse.click(1557,21);await p.waitForTimeout(10000);await p.screenshot({path:u.S+'fx10_b.png'});}
await b.close();})();
