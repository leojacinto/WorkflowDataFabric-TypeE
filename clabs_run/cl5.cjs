const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_list.do?sysparm_query='+encodeURIComponent('name=Forecast Variance Neon MCP Lab'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.screenshot({path:u.S+'cl5_a.png',clip:{x:0,y:0,width:1600,height:300}});
const cb=p.getByRole('checkbox');console.log('cb',await cb.count());
await b.close();})();
