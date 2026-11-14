const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tools_execution_list.do?sysparm_query=ORDERBYDESCsys_created_on&sysparm_limit=10',{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
await p.screenshot({path:u.S+'mc1_a.png'});
await b.close();})();
