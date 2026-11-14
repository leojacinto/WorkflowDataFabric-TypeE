const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/home/subflow',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1217,92).catch(()=>{});
await p.getByText('Get Expense Event',{exact:true}).first().scrollIntoViewIfNeeded().catch(()=>{});
const link=p.getByRole('link',{name:'Get Expense Event'});console.log('links',await link.count());
await p.screenshot({path:u.S+'h2_a.png'});
if(await link.count()){const [np]=await Promise.all([p.context().waitForEvent('page',{timeout:20000}).catch(()=>null),link.first().click()]);
const q=np||p;await q.waitForTimeout(25000);console.log(q.url());await q.screenshot({path:u.S+'h2_b.png'});}
await b.close();})();
