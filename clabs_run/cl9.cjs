const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent.do?sys_id=353f77d19da89b107f44c3f1c075db1e',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
const del=p.getByRole('button',{name:'Delete'});console.log('delbtn',await del.count());
if(await del.count()){await del.first().click();await p.waitForTimeout(3000);await p.screenshot({path:u.S+'cl9_a.png'});}
else await p.screenshot({path:u.S+'cl9_a.png'});
await b.close();})();
