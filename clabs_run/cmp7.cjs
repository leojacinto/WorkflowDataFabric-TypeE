const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_db_object_list.do?sysparm_query='+encodeURIComponent(process.env.Q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const rows=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').replace('Select record for action: ','').slice(0,110)));console.log(rows.join('\n'));
await b.close();})();
