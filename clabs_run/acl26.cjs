const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tool.do?sys_id=70854bae3b4272900ad1a021a3e45a34',{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
const id=await p.evaluate(()=>g_form.getValue('target_document'));console.log('flow',id);
await p.goto(u.H+'/sys_hub_flow.do?sys_id='+id,{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);
await p.mouse.click(1559,84);await p.waitForTimeout(3000);
await p.mouse.click(1420,183);await p.waitForTimeout(5000);
await p.screenshot({path:u.S+'acl26_a.png'});
await b.close();})();
