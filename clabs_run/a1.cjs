const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_scope_list.do?sysparm_query=scopeLIKEforecast^ORnameLIKEforecast^ORnameLIKEWDF',{timeout:90000});await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'a1_scope.png'});
console.log((await p.innerText('body')).slice(0,600));
await b.close();})();
