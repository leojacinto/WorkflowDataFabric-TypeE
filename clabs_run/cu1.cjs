const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
await p.screenshot({path:u.S+'cu1_a.png'});
await b.close();})();
