const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/erp-integration/erp-models',{timeout:90000});await p.waitForTimeout(25000);
for(const [x,y] of [[1062,357],[983,533]]){await p.mouse.click(x,y);await p.waitForTimeout(2000);}
await p.mouse.move(700,600);await p.mouse.wheel(0,1400);await p.waitForTimeout(1500);
await p.mouse.click(819,875);await p.waitForTimeout(4000);await p.mouse.wheel(0,-2000);await p.waitForTimeout(1000);await p.screenshot({path:u.S+'z10_p2.png'});
await p.mouse.wheel(0,1400);await p.waitForTimeout(1000);await p.mouse.click(855,875);await p.waitForTimeout(4000);await p.mouse.wheel(0,-2000);await p.waitForTimeout(1000);await p.screenshot({path:u.S+'z10_p3.png'});
await b.close();})();
