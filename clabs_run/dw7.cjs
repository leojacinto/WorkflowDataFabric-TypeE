const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_flow_context_list.do?sysparm_query='+encodeURIComponent('sys_created_on>=javascript:gs.minutesAgoStart(30)^ORDERBYDESCsys_created_on'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
await p.screenshot({path:u.S+'dw7_a.png'});
await b.close();})();
