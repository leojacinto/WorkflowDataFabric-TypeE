const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.waitForTimeout(60000);
for(const [k,q] of [['task','x_snc_forecast_v_0_variance_task_list.do?sysparm_query=short_description=CC_IT_002'],['events','x_snc_forecast_v_0_expense_transaction_event_list.do']]){
await p.goto(u.H+'/'+q,{timeout:90000});await p.waitForTimeout(7000);await u.dismiss(p);
const t=await p.innerText('body');console.log(k,t.match(/\d+ to \d+ of \d+/)?.[0]||(/No records/.test(t)?'0':'?'));
await p.screenshot({path:O+'ldi_check_'+k+'.png'});}
await b.close();})();
