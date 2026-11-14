const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/290bc4ec3b56765062f31831a3e45a86',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1486,866);await p.waitForTimeout(5000);
await p.screenshot({path:u.S+'tl1_a.png'});
const t=p.getByText('Budget Variance Analysis',{exact:true});console.log('found',await t.count());
if(await t.count()){await t.first().click().catch(()=>{});await p.waitForTimeout(4000);await p.screenshot({path:u.S+'tl1_b.png'});}
await b.close();})();
