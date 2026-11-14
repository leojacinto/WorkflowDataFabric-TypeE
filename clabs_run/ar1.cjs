const u=require('./u7021.cjs');
const ID=process.env.AGENT_ID;
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/'+ID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
for(let i=1;i<=7;i++){await p.mouse.click(1486,866);await p.waitForTimeout(5000);const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
 const dup=p.getByRole('button',{name:'Ignore and continue'});if(await dup.count()){await dup.first().click();await p.waitForTimeout(6000);}}
await p.screenshot({path:u.S+'ih8_pre.png'});
await p.mouse.click(592,580);await p.keyboard.type('Help me process EXP-2025-IT-002-1007-01',{delay:20});
await p.waitForTimeout(2500);await p.mouse.click(1026,720);
for(let i=1;i<=2;i++){await p.waitForTimeout(15000);await p.screenshot({path:u.S+'ar1_'+i+'.png'});}await p.mouse.click(1150,257);await p.waitForTimeout(3000);await p.screenshot({path:u.S+'ar1_detail.png'});
await b.close();})();
