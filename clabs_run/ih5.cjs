const u=require('./u7021.cjs');
const ID=process.env.AGENT_ID;
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/'+ID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
for(let i=1;i<=3;i++){await p.mouse.click(1486,866);await p.waitForTimeout(5000);const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}}
await p.screenshot({path:u.S+'ih4_pre.png'});
// remove wrong chip if present
const x=p.locator('[aria-label*="x_snc_forecast_v_0.admin"], now-pill, now-tag');
await p.mouse.click(494,458);await p.waitForTimeout(1500);
await p.mouse.click(563,470);await p.keyboard.type('admin',{delay:60});await p.waitForTimeout(3000);
await p.mouse.move(563,650);for(let k=1;k<=4;k++){await p.mouse.wheel(0,350);await p.waitForTimeout(800);await p.screenshot({path:u.S+'ih5_'+k+'.png'});}
await b.close();})();
