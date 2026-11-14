const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_tool_m2m_list.do?sysparm_query='+encodeURIComponent(process.env.Q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.locator('table.list_table tbody tr.list_row a.linked').first().click();await p.waitForTimeout(8000);
const o=await p.evaluate(()=>{const o={};g_form.elements.forEach(e=>{const n=e.fieldName.split('.').pop();try{o[n]=(g_form.getDisplayValue&&g_form.getDisplayValue(n))||g_form.getValue(n)}catch(x){}});return o;});
for(const [k,v] of Object.entries(o)) if(!/^sys_(id|created|updated|mod|domain|package)/.test(k)) console.log(k,'=',String(v).slice(0,100));
await b.close();})();
