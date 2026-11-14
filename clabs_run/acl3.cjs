const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.locator('.user-menu-label').first().click({force:true}).catch(()=>{});await p.waitForTimeout(3000);
await p.getByText('Elevate role',{exact:true}).first().click({force:true});await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'acl3_a.png'});
const cb=p.getByRole('checkbox');console.log('checkboxes',await cb.count());
await b.close();})();
