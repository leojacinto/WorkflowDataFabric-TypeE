const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_scope_list.do?sysparm_query='+encodeURIComponent('nameLIKELab QC'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
console.log(await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.getAttribute('sys_id')+' | '+x.innerText.replace(/\s+/g,' ').slice(0,120))));
await b.close();})();
