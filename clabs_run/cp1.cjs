// Read-only: does a sys_ui_page with endpoint ...wdf_clab.do exist on LAB_HOST?
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_ui_page_list.do?sysparm_query='+encodeURIComponent('endpointLIKEwdf'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
await p.screenshot({path:u.S+'cp1_a.png'});
await b.close();})();
