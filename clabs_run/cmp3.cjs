const u=require('./u7021.cjs');const TAG=process.env.TAG||'cmp';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_tool_m2m_list.do?sysparm_query=tool.nameSTARTSWITHBudget^ORtool.nameSTARTSWITHExtract',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const rows=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').slice(0,200)));console.log(rows.length);console.log(rows.join('\n'));
await p.screenshot({path:u.S+TAG+'_m2m.png'});await b.close();})();
