const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_security_operation_list.do?sysparm_query='+encodeURIComponent('nameLIKEexecute^ORnameLIKEinvoke'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'fx13_a.png'});
await b.close();})();
