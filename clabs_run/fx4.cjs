const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query='+encodeURIComponent('type.name=gen_ai_mcp_server^ORnameLIKENeon^ORnameLIKEneon^ORDERBYname'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'fx4_p.png'});
await b.close();})();
