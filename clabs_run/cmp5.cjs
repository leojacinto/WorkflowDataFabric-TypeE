const u=require('./u7021.cjs');const TAG=process.env.TAG||'cmp';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_tool_m2m.do?sys_id='+process.env.M2M,{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const tid=await p.evaluate(()=>g_form.getValue('tool'));console.log('tool',tid);
await p.goto(u.H+'/sn_aia_tool.do?sys_id='+tid,{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
await p.getByText('Tool ACL',{exact:true}).first().click().catch(()=>{});await p.waitForTimeout(4000);
await p.screenshot({path:u.S+TAG+'_toolacl.png',fullPage:true});
await b.close();})();
