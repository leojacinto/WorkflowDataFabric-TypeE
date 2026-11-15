const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_dictionary_list.do?sysparm_query='+encodeURIComponent('reference=sn_erp_integration_model^ORDERBYname'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
console.log(await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').slice(0,120))));
await p.goto(u.H+'/sn_erp_integration_model_list.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
console.log(await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').slice(0,160))));
await p.screenshot({path:u.S+'pe2_models.png'});
await b.close();})();
