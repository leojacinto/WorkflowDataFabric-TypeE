const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const q of [process.env.Q]){
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query='+encodeURIComponent(q)+'^ORDERBYname',{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').replace('Select record for action: ','').slice(0,170)));
console.log('## '+q.slice(0,50),r.length);console.log(r.slice(0,30).join('\n'));}
await b.close();})();
