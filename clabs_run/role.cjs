const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const role=process.argv[2],shot=process.argv[3];const {b,p}=await u.open();
await p.goto(u.H+'/sys_user.do?sys_id=6816f79cc0a8016401c5a33be04be441',{timeout:90000});
await p.waitForTimeout(8000);await u.dismiss(p);
await p.mouse.click(1551,780);await p.waitForTimeout(6000);
await p.mouse.click(600,257);await p.keyboard.type(role);await p.waitForTimeout(3000);
const t=await p.innerText('body');
if(!t.includes(role)||/--None--/.test(t.split('Roles List')[0].slice(-200))){console.log('ROLE NOT OFFERED',role);await p.screenshot({path:O+shot+'_missing.png'});await b.close();return;}
await p.mouse.click(470,294);await p.waitForTimeout(500);await p.mouse.click(784,412);await p.waitForTimeout(1000);
await p.screenshot({path:O+shot+'.png'});await p.mouse.click(1564,22);await p.waitForTimeout(8000);
console.log('saved',role);await b.close();})();
