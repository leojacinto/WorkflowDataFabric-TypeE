const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_glider_app/servicenow_studio.do?table=sys_app&sysId=-1',{timeout:90000}).catch(()=>{});await p.waitForTimeout(40000);
await p.mouse.click(338,500);await p.waitForTimeout(2000);await p.mouse.click(980,846);await p.waitForTimeout(8000);
await p.mouse.click(462,455);await p.keyboard.type('Lab QC Forecast Variance',{delay:60});await p.waitForTimeout(10000);await p.screenshot({path:u.S+'fs10_pre.png'});
await p.keyboard.press('Enter');
for(let i=1;i<=8;i++){await p.waitForTimeout(10000);await p.screenshot({path:u.S+'fs10_'+i+'.png'});}
console.log(p.url());
await b.close();})();
