const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.locator('.user-menu-label').first().click({force:true});await p.waitForTimeout(6000);
const el=p.getByText('Elevate role',{exact:true}).first();console.log('vis',await el.isVisible().catch(()=>false));
await el.dispatchEvent('click');await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'acl8_a.png'});await b.close();})();
