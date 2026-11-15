const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const [n,q,t] of [['a','sys_trigger_list.do?sysparm_query='+encodeURIComponent('state=0^ORDERBYnext_action'),'trig'],['b','sys_trigger_list.do?sysparm_query='+encodeURIComponent('nameLIKEmcp^ORnameLIKEaia^ORnameLIKEagent'),'mcp']]){
await p.goto(u.H+'/'+q,{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);await p.screenshot({path:u.S+'fx1_'+n+'.png'});}
await b.close();})();
