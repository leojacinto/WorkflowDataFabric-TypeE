const u=require('./u7021.cjs');
const ID=process.env.AGENT_ID;
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/'+ID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
for(let i=1;i<=3;i++){await p.mouse.click(1486,866);await p.waitForTimeout(5000);const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}}
await p.mouse.click(563,458);await p.keyboard.type('admin',{delay:60});await p.waitForTimeout(3000);const o=p.getByText('admin',{exact:true});console.log('opts',await o.count());await o.last().click();await p.waitForTimeout(1500);await p.screenshot({path:u.S+'ih3_a.png'});await p.mouse.click(1486,866);await p.waitForTimeout(6000);const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}await p.screenshot({path:u.S+'ih3_b.png'});
await b.close();})();
