const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/external-content-connectors/home',{timeout:90000});await p.waitForTimeout(30000);await u.dismiss(p);
await p.screenshot({path:O+'xcc_home.png'});console.log(p.url());
console.log((await p.innerText('body')).replace(/\n+/g,' | ').slice(0,500));
await b.close();})();
