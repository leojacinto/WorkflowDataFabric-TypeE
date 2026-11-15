const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.locator('.user-menu-label').first().click({force:true});await p.waitForTimeout(6000);
await p.getByText('Elevate role',{exact:true}).first().dispatchEvent('click');await p.waitForTimeout(6000);
await p.mouse.click(533,486);await p.waitForTimeout(1000);
await p.mouse.click(1032,597);await p.waitForTimeout(8000);
await p.goto(u.H+'/sys_security_acl.do?sys_id=-1&sysparm_query='+encodeURIComponent('type=gen_ai_mcp_server^name=global.global.Neon MCP Lab'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
const [pop]=await Promise.all([p.waitForEvent('popup',{timeout:15000}).catch(()=>null),p.mouse.click(576,166)]);
await p.waitForTimeout(5000);
if(pop){await pop.waitForTimeout(4000);await pop.screenshot({path:u.S+'fx15_pop.png'});await pop.locator('a.glide_ref_item_link',{hasText:/^execute$/}).first().click();await p.waitForTimeout(3000);await p.screenshot({path:u.S+'fx15_a.png'});await p.mouse.click(1557,21);await p.waitForTimeout(10000);await p.screenshot({path:u.S+'fx15_b.png'});}
else await p.screenshot({path:u.S+'fx15_nopop.png'});
await b.close();})();
