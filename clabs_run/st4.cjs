const u=require('./u7021.cjs');
const Q=process.env.Q;
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/servicenow-studio/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(40000);await u.dismiss(p);
await p.mouse.click(800,247);await p.keyboard.type(Q,{delay:5});await p.waitForTimeout(1500);await p.mouse.click(1178,361);
for(let i=1;i<=16;i++){await p.waitForTimeout(15000);await p.screenshot({path:u.S+'st4_'+i+'.png'});}
await b.close();})();
