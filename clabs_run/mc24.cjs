const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const [t,q,n] of [['sys_store_app','nameLIKEMCP^ORnameLIKEModel Context','a'],['sys_plugins','nameLIKEMCP^ORnameLIKEModel Context^ORidLIKEmcp','b']]){
await p.goto(u.H+'/'+t+'_list.do?sysparm_query='+encodeURIComponent(q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);await p.screenshot({path:u.S+'mc24_'+n+'.png'});}
await b.close();})();
