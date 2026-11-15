const u=require('./u7021.cjs');
const GO=process.env.SUBMIT==='1';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.locator('.user-menu-label').first().click({force:true});await p.waitForTimeout(6000);
await p.getByText('Elevate role',{exact:true}).first().dispatchEvent('click');await p.waitForTimeout(6000);
await p.mouse.click(533,486);await p.waitForTimeout(1000);
await p.mouse.click(1032,597);await p.waitForTimeout(8000);
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query='+encodeURIComponent('type.name=gen_ai_mcp_server'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
const op=await p.evaluate(()=>[g_form.getValue('operation'),g_form.getDisplayValue?g_form.getDisplayValue('operation'):'',g_form.getValue('type')]);console.log(op);
await p.goto(u.H+'/sys_security_acl.do?sys_id=-1&sysparm_query='+encodeURIComponent('type=gen_ai_mcp_server^name=global.Neon MCP Lab'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
await p.evaluate(o=>g_form.setValue('operation',o[0],'execute'),op);await p.waitForTimeout(2000);
await p.screenshot({path:u.S+'fx11_a.png'});
if(GO){await p.mouse.click(1557,21);await p.waitForTimeout(10000);await p.screenshot({path:u.S+'fx11_b.png'});}
await b.close();})();
