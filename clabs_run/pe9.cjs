const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_audit_delete_list.do?sysparm_query='+encodeURIComponent('tablenameSTARTSWITHsn_erp_integration^sys_created_on>=javascript:gs.daysAgoStart(2)')+'&sysparm_groupby=tablename',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'pe9_group.png'});
const t=await p.locator('tr.list_group, tr.group_row, .list_group_row, tr:has(.list_group_toggle)').allInnerTexts().catch(()=>[]);console.log(t.map(x=>x.replace(/\s+/g,' ')).slice(0,20));
await b.close();})();
