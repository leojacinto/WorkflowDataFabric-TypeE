const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent.do?sys_id=353f77d19da89b107f44c3f1c075db1e',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.getByText('To edit this record click here').first().click();await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'cl10_a.png',clip:{x:0,y:0,width:1600,height:120}});
await b.close();})();
