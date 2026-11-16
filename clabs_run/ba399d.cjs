const fs=require('fs');
const path='/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/';
const H=require(path+'human.cjs'),B=require(path+'buildagent.cjs');
const EVT='x_snc_forecast_v_0_expense_transaction_event',CASE='sn_spend_sdc_service_request';
(async()=>{const {browser,page}=await H.openBrowser();
try{
 for(const e of await H.rows(EVT,'event_id=EXP-2025-IT-002-1007-01','sys_id'))await H.rest('DELETE',`table/${EVT}/${e.sys_id}`);
 const before=await H.count(CASE,'sys_idISNOTEMPTY');H.log('finance cases before: '+before);
 const prompt=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit/e2e/prompts/ihub4_test.txt','utf8');
 const r=await B.runPrompt(page,prompt,async()=>(await H.count(EVT,'event_id=EXP-2025-IT-002-1007-01'))>=1,{timeoutMs:1500000});H.log('subflow ran: '+JSON.stringify(r));
 let ok=false;for(let i=0;i<60;i++){const n=await H.count(CASE,'sys_idISNOTEMPTY');if(n>before){ok=true;H.log('NEW FINANCE CASE after '+(i*30)+'s, total '+n);break;}await page.waitForTimeout(30000);}
 const c=await H.rows(CASE,'ORDERBYDESCsys_created_on','number,short_description,assigned_to',2);H.log('latest cases: '+JSON.stringify(c));
 H.log(ok?'RESULT PASS':'RESULT FAIL no finance case in 30 min');
}catch(e){H.log('ERROR '+e.message);await H.shot(page,'ba399d_err');}
await browser.close();})();
