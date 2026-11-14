const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const q of ['nameSTARTSWITHsys_hub_flow^operation=execute^ORnameSTARTSWITHsys_hub_flow^operation=read^active=true','nameSTARTSWITHsn_aia^active=true','nameLIKEflow^operation=execute^active=true']){
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query='+encodeURIComponent(q)+'^ORDERBYname',{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').replace('Select record for action: ','').slice(0,140)));
console.log('## '+q,r.length);console.log(r.slice(0,40).join('\n'));}
await b.close();})();
