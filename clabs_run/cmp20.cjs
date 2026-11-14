const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_execution_task_list.do?sysparm_query=outputLIKEisAccessAllowed^descriptionLIKEForecast^ORDERBYDESCsys_created_on',{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
await p.locator('table.list_table tbody tr.list_row a.linked').first().click();await p.waitForTimeout(7000);
const j=await p.evaluate(()=>g_form.getValue('output'));
const o=JSON.parse(j);const walk=(r,d)=>{console.log(' '.repeat(d*2)+r.resourceType+' | '+r.resourceName+' | allowed='+r.isAccessAllowed+(r.reason?' | '+r.reason:'')+(r.message?' | '+r.message:''));(r.childResources||[]).forEach(c=>walk(c,d+1));};
console.log('top allowed=',o.isAccessAllowed,Object.keys(o).join(','));(o.resources||[]).forEach(r=>walk(r,0));
console.log(JSON.stringify(o).slice(-700));
await b.close();})();
