const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tool_list.do?sysparm_query='+encodeURIComponent('nameLIKEExtract Cost Center'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.screenshot({path:u.S+'tl1_a.png'});
await b.close();})();
