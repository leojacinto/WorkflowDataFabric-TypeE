const path='/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/';
const H=require(path+'human.cjs'),B=require(path+'buildagent.cjs');
const EVT='x_snc_forecast_v_0_expense_transaction_event';
(async()=>{const {browser,page}=await H.openBrowser();
try{const r=await B.runPrompt(page,"In the Forecast Variance app, run the existing subflow \"Get Expense Event\" once as the user who starts it, and tell me how many expense events it created. Do not change or rebuild anything.",async()=>(await H.count(EVT,'event_id=EXP-2025-IT-002-1007-01'))>=1,{timeoutMs:1500000});H.log('RESULT '+JSON.stringify(r));console.log('events',await H.count(EVT,'sys_idISNOTEMPTY'));}
catch(e){H.log('ERROR '+e.message);await H.shot(page,'ba399c_err');}
await browser.close();})();
