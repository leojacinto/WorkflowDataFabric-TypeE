// Open wdf_lab UI page record on LAB_HOST, show header menu (read-only look)
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_ui_page.do?sys_id=f172cab24f2a48bfac40103f9e43dfce',{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'cp2_a.png'});
await p.mouse.click(1498,21);await p.waitForTimeout(2500);
await p.screenshot({path:u.S+'cp2_b.png'});
console.log(await p.evaluate(()=>{try{return JSON.stringify({name:g_form.getValue('name'),endpoint:g_form.getValue('endpoint'),scope:g_form.getValue('sys_scope'),dirty:g_form.modified})}catch(e){return 'err'}}));
await b.close();})();
