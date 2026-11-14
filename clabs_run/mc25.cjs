const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_wdf_external_connection_mapping_list.do?sysparm_query='+encodeURIComponent('ORDERBYDESCsys_created_on'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);await p.screenshot({path:u.S+'mc25_a.png'});
await b.close();})();
