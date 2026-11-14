// Revert guesswork edits on 7021: credential header, tool target, old m2m active
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
// 1. credential header back to empty
await p.goto(u.H+'/discovery_credentials_list.do?sysparm_query='+encodeURIComponent('name=Neon MCP Lab_1794584798216'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
console.log('cred before',await p.evaluate(()=>g_form.getValue('api_key_header')));
await p.evaluate(()=>g_form.setValue('api_key_header',''));await p.mouse.click(1281,21);await p.waitForTimeout(8000);
// 2. tool target back to old server
await p.goto(u.H+'/sn_aia_tool.do?sys_id=e9b760ed9dec9b107f44c3f1c075dbc2',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
console.log('tool before',await p.evaluate(()=>g_form.getDisplayValue('target_document')));
await p.evaluate(()=>g_form.setValue('target_document','40dda6519dec5b107f44c3f1c075db0a'));await p.waitForTimeout(1000);await p.mouse.click(1488,21);await p.waitForTimeout(8000);
// 3. old m2m active again
await p.goto(u.H+'/sn_aia_agent_tool_m2m_list.do?sysparm_query='+encodeURIComponent('name=Get Details via Neon MCP'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
await p.evaluate(()=>g_form.setValue('active','true'));await p.mouse.click(1416,21);await p.waitForTimeout(8000);
// verify
for(const [t,q,f] of [['discovery_credentials','name=Neon MCP Lab_1794584798216','api_key_header'],['sn_aia_tool','sys_id=e9b760ed9dec9b107f44c3f1c075dbc2','target_document'],['sn_aia_agent_tool_m2m','name=Get Details via Neon MCP','active']]){
 await p.goto(u.H+'/'+t+'_list.do?sysparm_query='+encodeURIComponent(q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
 await p.locator('a.linked').first().click();await p.waitForTimeout(7000);
 console.log('after',t,await p.evaluate((f)=>g_form.getDisplayValue(f)||g_form.getValue(f),f));}
await b.close();})();
