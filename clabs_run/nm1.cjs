const u=require('./u7021.cjs');
const ID=process.env.AGENT_ID;
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/'+ID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1486,866);await p.waitForTimeout(5000);
let d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
await p.screenshot({path:u.S+'nm1_a.png'});
await p.mouse.click(1505,224);await p.waitForTimeout(2000);await p.screenshot({path:u.S+'nm1_b.png'});
await p.mouse.click(1476,481);await p.waitForTimeout(8000);await p.screenshot({path:u.S+'nm1_c.png'});
await b.close();})();
