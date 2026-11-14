const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/erp-integration/erp-models',{timeout:90000});await p.waitForTimeout(25000);
for(const [x,y] of [[1062,357],[983,533]]){await p.mouse.click(x,y);await p.waitForTimeout(2000);}
await p.mouse.move(700,600);
for(let i=1;i<=4;i++){await p.mouse.wheel(0,700);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'z9_'+i+'.png'});}
await b.close();})();
