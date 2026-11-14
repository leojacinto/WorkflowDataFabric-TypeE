const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/$flow-designer.do#/subflow-designer/35b5bb183bda365062f31831a3e45aa1',{timeout:90000}).catch(()=>{});await p.waitForTimeout(30000);await u.dismiss(p);
await p.mouse.click(270,28);await p.waitForTimeout(15000);
await p.screenshot({path:O+'ihub_subflow_designer.png'});
console.log((await p.innerText('body')).slice(0,300).replace(/\n/g,' | '));
await b.close();})();
