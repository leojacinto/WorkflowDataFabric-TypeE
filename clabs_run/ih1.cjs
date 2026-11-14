const u=require('./u7021.cjs');
const AG=process.env.AGENT_LINK||'Forecast Variance Integration Hub Trigger';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/create-manage',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(211,211);await p.waitForTimeout(8000);
await p.mouse.click(105,289);await p.waitForTimeout(3000);
await p.mouse.click(385,444);await p.waitForTimeout(1500);await p.keyboard.type('Name',{delay:60});await p.waitForTimeout(2000);
await p.mouse.click(69,545);await p.waitForTimeout(2000);
await p.mouse.click(738,444);await p.waitForTimeout(1500);await p.mouse.click(540,564);await p.waitForTimeout(1000);
await p.waitForTimeout(1500);await p.locator('now-input[placeholder="Enter value"] input').first().fill(AG);await p.waitForTimeout(800);
await p.mouse.click(1551,483);await p.waitForTimeout(6000);
await p.getByRole('link',{name:AG,exact:true}).first().click();await p.waitForTimeout(15000);await u.dismiss(p);
console.log(p.url());
for(let i=1;i<=6;i++){await p.mouse.click(1486,866);await p.waitForTimeout(5000);const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
 const dup=p.getByRole('button',{name:'Ignore and continue'});if(await dup.count()){await dup.first().click();await p.waitForTimeout(6000);}}
await p.mouse.click(592,580);await p.keyboard.type('Help me process EXP-2025-IT-002-1007-01',{delay:20});
await p.mouse.click(1028,720);
for(let i=1;i<=8;i++){await p.waitForTimeout(15000);await p.screenshot({path:u.S+'ih1_'+i+'.png'});}
await b.close();})();
