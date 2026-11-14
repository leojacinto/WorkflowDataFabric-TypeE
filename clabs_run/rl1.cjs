const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
const q=encodeURIComponent('user=6816f79cc0a8016401c5a33be04be441^role.nameLIKEerp^ORrole.nameLIKEdecision_table^ORrole.nameLIKEsn_aia^ORrole.nameLIKEais');
await p.goto(u.H+'/sys_user_has_role_list.do?sysparm_query='+q,{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.screenshot({path:u.S+'rl1_a.png'});
await b.close();})();
