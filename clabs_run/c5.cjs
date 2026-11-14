const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/home/subflow',{timeout:90000});await p.waitForTimeout(25000);await u.dismiss(p);
const l=p.getByText('Get Expense Event',{exact:true});
for(let i=0;i<60&&!(await l.count());i++){await p.mouse.move(500,600);await p.mouse.wheel(0,900);await p.waitForTimeout(700);}
console.log('found',await l.count());
if(await l.count()){await l.first().click();await p.waitForTimeout(30000);await u.dismiss(p);await p.screenshot({path:u.S+'c5.png'});console.log(p.url());}
await b.close();})();
