const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
for(let t=0;t<6;t++){if(t%2===0)await p.getByRole('button',{name:/User menu|Account|System Administrator|SA/i}).first().click({timeout:15000}).catch(()=>{});else await p.mouse.click(1536,25);await p.waitForTimeout(4000);if(await p.getByText('Elevate role',{exact:true}).count()&&await p.getByText('Elevate role',{exact:true}).first().isVisible())break;await p.keyboard.press('Escape');await p.waitForTimeout(2000);}
console.log('visible',await p.getByText('Elevate role',{exact:true}).first().isVisible().catch(()=>false));
await p.screenshot({path:u.S+'acl6_a.png'});
await p.getByText('Elevate role',{exact:true}).first().click({timeout:15000});await p.waitForTimeout(6000);await p.screenshot({path:u.S+'acl6_b.png'});
await b.close();})();
