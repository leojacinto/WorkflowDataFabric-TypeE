const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tool.do?sys_id='+process.env.TID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const o=await p.evaluate(()=>({t:g_form.getValue('target_document'),tt:g_form.getValue('target_document_table'),type:g_form.getValue('type')}));console.log(JSON.stringify(o));
for(const q of ['nameLIKE'+o.t,'descriptionLIKE'+o.t]){
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query='+encodeURIComponent(q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(5000);
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').replace('Select record for action: ','').slice(0,200)));console.log(q.slice(0,20),r.length,r.join('\n'));}
await b.close();})();
