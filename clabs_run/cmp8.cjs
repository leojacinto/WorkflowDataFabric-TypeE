const u=require('./u7021.cjs');const fs=require('fs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_config_list.do?sysparm_query=agent.nameSTARTSWITHForecast Variance',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const ids=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.getAttribute('sys_id')));console.log('configs',ids.length);
const out={};
for(const id of ids){await p.goto(u.H+'/sn_aia_agent_config.do?sys_id='+id,{timeout:90000}).catch(()=>{});await p.waitForTimeout(5000);
out[id]=await p.evaluate(()=>{const o={};g_form.elements.forEach(e=>{const n=e.fieldName.split('.').pop();try{o[n]=g_form.getDisplayValue?g_form.getDisplayValue(n)||g_form.getValue(n):g_form.getValue(n)}catch(x){}});return o;}).catch(e=>({err:String(e)}));}
fs.writeFileSync(process.env.OUT,JSON.stringify(out,null,1));await b.close();})();
