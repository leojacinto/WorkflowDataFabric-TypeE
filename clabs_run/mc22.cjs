// Deactivate the old Global-scope MCP tool link on the FV agent (a1b7a0ed...), list remaining links
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_tool_m2m.do?sys_id=a1b7a0ed9dec9b107f44c3f1c075dae1',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
console.log(await p.evaluate(()=>{try{return g_form.getValue('name')+' | '+g_form.getDisplayValue('agent')+' | '+g_form.getValue('active')+' | '+g_form.getValue('sys_id')}catch(e){return 'noform'}}));
await b.close();})();
