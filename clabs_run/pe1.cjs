const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_db_object_list.do?sysparm_query='+encodeURIComponent('nameLIKEerp^nameLIKEmodel^ORnameLIKEdata_model^nameLIKEerp'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
console.log(await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').slice(0,140))));
await p.screenshot({path:u.S+'pe1_a.png'});
await b.close();})();
