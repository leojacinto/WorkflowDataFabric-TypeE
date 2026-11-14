const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/erp-integration/erp-models',{timeout:90000});await p.waitForTimeout(25000);
for(const [x,y] of [[1062,357],[983,533]]){await p.mouse.click(x,y);await p.waitForTimeout(2000);}
await p.mouse.click(1494,230);await p.waitForTimeout(3000);
await p.screenshot({path:u.S+'z8.png'});
await b.close();})();
