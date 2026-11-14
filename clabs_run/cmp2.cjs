const u=require('./u7021.cjs');const TAG=process.env.TAG||'cmp';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_db_object_list.do?sysparm_query=nameSTARTSWITHsn_aia_tool^ORnameSTARTSWITHsn_aia_agent_tool',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const rows=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').slice(0,120)));console.log(rows.join('\n'));
await p.screenshot({path:u.S+TAG+'_tables.png'});await b.close();})();
