const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
for(let t=0;t<4;t++){await p.mouse.click(1566,26);await p.waitForTimeout(3500);if(await p.getByText('Elevate role',{exact:true}).count())break;await p.keyboard.press('Escape');await p.waitForTimeout(1500);}
await p.getByText('Elevate role',{exact:true}).first().click({timeout:15000});await p.waitForTimeout(5000);
await p.screenshot({path:u.S+'acl1_a.png'});
const cb=p.getByRole('checkbox',{name:/security_admin/i});console.log('cb',await cb.count());
if(await cb.count()){await cb.first().check().catch(()=>{});}
await p.waitForTimeout(1000);await p.screenshot({path:u.S+'acl1_b.png'});
await p.getByRole('button',{name:'OK',exact:true}).first().click().catch(()=>{});await p.waitForTimeout(6000);
await p.goto(u.H+'/sys_security_acl.do?sys_id=-1',{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
await p.screenshot({path:u.S+'acl1_c.png',fullPage:true});await b.close();})();
