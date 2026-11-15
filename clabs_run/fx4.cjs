const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_security_acl_list.do?sysparm_query='+encodeURIComponent('type.name=mcp_server_ai_acl^ORtype.name=gen_ai_mcp_server^ORnameLIKENeon^ORDERBYname'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'fx4_d.png'});
await b.close();})();
