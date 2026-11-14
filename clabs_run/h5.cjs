const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/home/subflow',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1217,92);await p.waitForTimeout(1000);
await p.mouse.click(394,289);await p.waitForTimeout(1500);
await p.keyboard.type('Get Expense Event',{delay:40});await p.waitForTimeout(500);
await p.screenshot({path:u.S+'h5_a.png'});
await p.keyboard.press('Enter');await p.waitForTimeout(4000);
await p.screenshot({path:u.S+'h5_b.png'});
const link=p.getByRole('link',{name:'Get Expense Event'});console.log('links',await link.count());
if(await link.count()){const [np]=await Promise.all([p.context().waitForEvent('page',{timeout:20000}).catch(()=>null),link.first().click()]);
const q=np||p;await q.waitForTimeout(25000);console.log(q.url());await q.screenshot({path:u.S+'h5_c.png'});}
await b.close();})();
