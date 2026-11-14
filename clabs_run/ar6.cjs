const u=require('./u7021.cjs');
const ID=process.env.AGENT_ID;
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/'+ID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1486,866);await p.waitForTimeout(5000);
let d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
await p.mouse.move(700,600);await p.mouse.wheel(0,500);await p.waitForTimeout(1000);
await p.screenshot({path:u.S+'ar6_a.png'});
await p.getByRole('link',{name:'Budget Variance Analysis'}).first().click();await p.waitForTimeout(5000);
await p.screenshot({path:u.S+'ar6_b.png'});
const adv=p.getByText('Advanced settings');if(await adv.count()){await adv.first().click();await p.waitForTimeout(2000);}
await p.mouse.move(790,550);await p.mouse.wheel(0,1500);await p.waitForTimeout(1500);
await p.screenshot({path:u.S+'ar6_c.png'});
await b.close();})();
