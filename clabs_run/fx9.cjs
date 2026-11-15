const u=require('./u7021.cjs');
const NAME=process.env.ACL_NAME, GO=process.env.SUBMIT==='1';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.locator('.user-menu-label').first().click({force:true});await p.waitForTimeout(6000);
await p.getByText('Elevate role',{exact:true}).first().dispatchEvent('click');await p.waitForTimeout(6000);
await p.mouse.click(533,486);await p.waitForTimeout(1000);
await p.mouse.click(1032,597);await p.waitForTimeout(8000);
await p.goto(u.H+'/sys_security_acl.do?sys_id=-1&sysparm_query='+encodeURIComponent('type=e963731e3b030350e24f43a693e45ab5^operation=execute^name='+NAME),{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'fx9b_pre.png'});
if(GO){await p.mouse.click(1557,21);await p.waitForTimeout(10000);await p.screenshot({path:u.S+'fx9b_post.png'});}
await b.close();})();
