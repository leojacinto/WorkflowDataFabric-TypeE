const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const [n,q] of [['a','sn_mcp_client_server_session_mapping_list.do?sysparm_query=ORDERBYDESCsys_created_on'],['b','sys_outbound_http_log_list.do?sysparm_query='+encodeURIComponent('urlLIKEdeepwiki^ORurlLIKEneon^ORDERBYDESCsys_created_on')]]){
await p.goto(u.H+'/'+q,{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);await p.screenshot({path:u.S+'dw4_'+n+'.png'});}
await b.close();})();
