const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/erp-integration/home',{timeout:90000});await p.waitForTimeout(25000);
await p.mouse.click(1062,357);await p.waitForTimeout(2500);await p.mouse.click(983,533);await p.waitForTimeout(2500);
await p.mouse.click(24,125);await p.waitForTimeout(15000);
await p.screenshot({path:O+'zcc_models.png'});console.log(p.url());
await b.close();})();
