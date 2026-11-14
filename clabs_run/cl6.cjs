const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_list.do?sysparm_query='+encodeURIComponent('name=Forecast Variance Neon MCP Lab'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.screenshot({path:u.S+'cl6_pre.png',clip:{x:0,y:0,width:1600,height:300}});
const cb=p.getByRole('checkbox');await p.locator('#check_container_sn_aia_agent_353f77d19da89b107f44c3f1c075db1e').click();await p.waitForTimeout(1000);await p.locator('select').first().selectOption({label:'Delete'}).catch(e=>console.log('sel',e.message.slice(0,80)));await p.waitForTimeout(4000);await p.screenshot({path:u.S+'cl6_a.png'});
await b.close();})();
