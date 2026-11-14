const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent.do?sys_id=353f77d19da89b107f44c3f1c075db1e',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.getByText('To edit this record click here').first().click();await p.waitForTimeout(10000);
await p.getByRole('button',{name:'Delete'}).first().click();await p.waitForTimeout(3000);await p.screenshot({path:u.S+'cl11_a.png'});const c=p.getByRole('button',{name:'Delete'});console.log('btns',await c.count());await c.last().click();await p.waitForTimeout(8000);await p.screenshot({path:u.S+'cl11_b.png',clip:{x:0,y:0,width:1600,height:300}});
await b.close();})();
