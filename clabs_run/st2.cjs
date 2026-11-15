const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(178,25);await p.waitForTimeout(2500);await p.keyboard.type('Studio',{delay:60});await p.waitForTimeout(3500);
const [pop]=await Promise.all([p.context().waitForEvent('page',{timeout:30000}).catch(()=>null),p.getByText(/^ServiceNow Studio/).first().click()]);
const t=pop||p;await t.waitForTimeout(25000);console.log(t.url());
await t.screenshot({path:u.S+'st2_a.png'});
await b.close();})();
