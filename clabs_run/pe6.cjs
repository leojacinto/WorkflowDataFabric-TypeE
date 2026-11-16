const u=require('./u7021.cjs');
const TN=process.env.TN;
const Q='modelISNOTEMPTY^model.sys_idISEMPTY^sys_created_on>=2026-11-03 00:00:00^sys_created_on<=2026-11-03 23:59:59';
(async()=>{const {b,p}=await u.open();
for(let round=0;round<6;round++){
await p.goto(u.H+'/sn_erp_integration_'+TN+'_list.do?sysparm_query='+encodeURIComponent(Q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(5000);
const n=await p.locator('tr.list_row').count();console.log(TN,'round',round,'rows',n);if(!n)break;
if(round===0)await p.screenshot({path:u.S+'pe6_'+TN+'_before.png'});
await p.locator('input#check_all_0, th input[type=checkbox], .list_header_cell input[type=checkbox]').first().check({force:true}).catch(async()=>{await p.locator('tr.list_header th').first().click()});
await p.waitForTimeout(1500);
await p.locator('select[id^="sysverb"],select.list_action_option,select#sysverb_list_actions').first().selectOption({label:'Delete'}).catch(async e=>{const sel=await p.locator('select').evaluateAll(s=>s.map(x=>x.id+':'+[...x.options].map(o=>o.text).join('|').slice(0,80)));console.log('sel',sel.slice(0,6));throw e;});
await p.waitForTimeout(2500);await p.screenshot({path:u.S+'pe6_'+TN+'_confirm.png'});
await p.mouse.click(872,133);await p.waitForTimeout(7000);
}
await p.screenshot({path:u.S+'pe6_'+TN+'_after.png'});
await b.close();})();
