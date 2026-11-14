// Find the tool used by the FV agent's m2m and point it at the new in-scope server
const u=require('./u7021.cjs');
const NEW='0d1593a59da81f107f44c3f1c075db7a';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_tool_m2m_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.locator('a.linked').first().click();await p.waitForTimeout(9000);
const tool=await p.evaluate(()=>g_form.getValue('tool'));const ag=await p.evaluate(()=>g_form.getDisplayValue('agent'));console.log('agent',ag,'tool',tool);
await p.goto(u.H+'/sn_aia_tool.do?sys_id='+tool,{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
console.log(await p.evaluate((n)=>{g_form.setValue('target_document',n);return g_form.getValue('target_document')+' | '+g_form.getDisplayValue('target_document')},NEW));
await p.waitForTimeout(1500);await p.screenshot({path:u.S+'mc12_pre.png'});
await p.mouse.click(1488,21);await p.waitForTimeout(8000);
await p.goto(u.H+'/sn_aia_tool.do?sys_id='+tool,{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
console.log(await p.evaluate(()=>g_form.getDisplayValue('target_document')));
await b.close();})();
