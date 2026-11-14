const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_hub_flow_list.do?sysparm_query=name=Budget Variance Analysis^type=subflow^ORname=Budget Variance Analysis',{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
const n=await p.locator('table.list_table tbody tr.list_row').count();console.log('flows',n);
await p.locator('table.list_table tbody tr.list_row a.linked').first().click();await p.waitForTimeout(8000);
const o=await p.evaluate(()=>{const o={};g_form.elements.forEach(e=>{const n=e.fieldName.split('.').pop();try{o[n]=g_form.getValue(n)}catch(x){}});return o;});
for(const [k,v] of Object.entries(o)) if(v&&!/^sys_(id|created|updated|mod|domain|package)|^(label_cache|flow_variables|attributes|description|latest|natlang)/.test(k)) console.log(k,'=',String(v).slice(0,120));
await b.close();})();
