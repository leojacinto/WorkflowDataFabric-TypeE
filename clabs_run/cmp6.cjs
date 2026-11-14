// Dump field values of all agents named Forecast Variance* via g_form (UI only). OUT=file
const u=require('./u7021.cjs');const fs=require('fs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_list.do?sysparm_query=nameSTARTSWITHForecast Variance',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const ids=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.getAttribute('sys_id')));console.log(ids.length);
const out={};
for(const id of ids){await p.goto(u.H+'/sn_aia_agent.do?sys_id='+id,{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
out[id]=await p.evaluate(()=>{const o={};g_form.elements.forEach(e=>{try{o[e.fieldName]=g_form.getValue(e.fieldName.replace(/^sn_aia_agent\./,''))}catch(x){}});return o;}).catch(e=>({err:String(e)}));}
fs.writeFileSync(process.env.OUT,JSON.stringify(out,null,1));await b.close();})();
