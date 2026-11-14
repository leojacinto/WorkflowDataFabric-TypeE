// Compare tool record + Tool ACL on a host. LAB_HOST/LAB_USER_IDX/LAB_PASS_IDX env; TAG names the screenshots.
const u=require('./u7021.cjs');const TAG=process.env.TAG||'cmp';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tool_list.do?sysparm_query=nameSTARTSWITHBudget',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+TAG+'_toollist.png'});
const a=p.locator('a.linked.formlink').first();console.log('rows',await a.count());
if(await a.count()){await a.click();await p.waitForTimeout(9000);await p.screenshot({path:u.S+TAG+'_toolrec.png',fullPage:true});
for(const t of ['Tool ACL','Agent Tools','Tool Role Masking Configuration']){const l=p.getByText(t,{exact:false}).first();if(await l.count()){await l.click().catch(()=>{});await p.waitForTimeout(3000);await p.screenshot({path:u.S+TAG+'_'+t.replace(/ /g,'_')+'.png'});}}}
await b.close();})();
