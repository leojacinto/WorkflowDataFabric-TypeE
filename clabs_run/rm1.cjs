const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tool.do?sys_id='+process.env.TID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
await p.getByText('Tool Role Masking Configuration',{exact:true}).first().click().catch(()=>{});await p.waitForTimeout(4000);
await p.screenshot({path:u.S+process.env.TAG+'_mask.png',fullPage:true});
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').slice(0,200)));console.log('mask rows',r.length,r.join(' | '));
await b.close();})();
