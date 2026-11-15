const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.locator('.user-menu-label').first().click({force:true});await p.waitForTimeout(6000);
await p.getByText('Elevate role',{exact:true}).first().dispatchEvent('click');await p.waitForTimeout(6000);
await p.mouse.click(533,486);await p.waitForTimeout(1000);
await p.mouse.click(1032,597);await p.waitForTimeout(8000);
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query=name=global.Neon MCP Lab^type.name=mcp_server_ai_acl',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
if(await p.locator('tr.list_row').count()!==1){console.log('abort count',await p.locator('tr.list_row').count());await b.close();return;}
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
const nm=await p.evaluate(()=>g_form.getValue('name'));if(nm!=='global.Neon MCP Lab'){console.log('abort name',nm);await b.close();return;}
await p.mouse.click(1414,21);await p.waitForTimeout(3000);await p.screenshot({path:u.S+'fx19_a.png'});
await b.close();})();
