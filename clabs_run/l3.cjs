const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/x_snc_forecast_v_0_variance_task.do?sys_id=-1',{timeout:90000});await p.waitForTimeout(8000);await u.dismiss(p);
await p.screenshot({path:O+'ldi_variance_task_new.png'});
console.log((await p.innerText('body')).split('\n').filter(l=>/Number|Short description|State|Attach/.test(l)).slice(0,8).join(' | '));
await b.close();})();
