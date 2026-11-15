const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/servicenow-studio/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(40000);await u.dismiss(p);
await p.getByText(/^Question only, do not change/).first().click();await p.waitForTimeout(15000);
for(let i=1;i<=6;i++){await p.waitForTimeout(20000);}
await p.mouse.move(800,400);await p.mouse.wheel(0,20000);await p.waitForTimeout(2000);await p.screenshot({path:u.S+'st5_a.png'});
await p.mouse.wheel(0,-700);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'st5_b.png'});
await b.close();})();
