const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const [n,q] of [['a','sys_security_obj_oper_list.do?sysparm_query='+encodeURIComponent('sys_security_type.nameLIKEmcp')]]){
await p.goto(u.H+'/'+q,{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);await p.screenshot({path:u.S+'st9r_'+n+'.png'});}
await b.close();})();
