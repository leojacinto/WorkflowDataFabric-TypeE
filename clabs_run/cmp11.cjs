const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const t of ['sn_aia_execution_plan','sn_aia_execution_task']){
await p.goto(u.H+'/'+t+'_list.do?sysparm_query=ORDERBYDESCsys_created_on',{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
await p.locator('table.list_table tbody tr.list_row a.linked').first().click();await p.waitForTimeout(7000);
const o=await p.evaluate(()=>{const o={};g_form.elements.forEach(e=>{const n=e.fieldName.split('.').pop();try{o[n]=g_form.getValue(n)}catch(x){}});return o;});
console.log('##',t);for(const [k,v] of Object.entries(o)) if(v&&!/^sys_(id|created|updated|mod|domain|scope|package)/.test(k)) console.log(k,'=',String(v).slice(0,600));}
await b.close();})();
