const u=require('./u7021.cjs');const TAG=process.env.TAG||'cmp';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_tool_m2m_list.do?sysparm_query=agent.name=Forecast Variance QB^tool.name=Budget Variance Analysis',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.locator('table.list_table tbody tr.list_row a.linked').first().click();await p.waitForTimeout(8000);
await p.screenshot({path:u.S+TAG+'_m2mrec.png',fullPage:true});
const t=p.locator('a[href*="sn_aia_tool.do"]').first();console.log('toollinks',await t.count());
if(await t.count()){await t.click();await p.waitForTimeout(8000);}
else{const r=p.locator('button[name="viewr.sn_aia_agent_tool_m2m.tool"], a.btn-ref').first();if(await r.count()){await r.click();await p.waitForTimeout(8000);}}
console.log(p.url());
await p.getByText('Tool ACL',{exact:false}).first().click().catch(()=>{});await p.waitForTimeout(4000);
await p.screenshot({path:u.S+TAG+'_toolacl.png',fullPage:true});
await b.close();})();
