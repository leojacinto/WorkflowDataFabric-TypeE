const fs=require('fs');
const path='/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/';
const H=require(path+'human.cjs'),B=require(path+'buildagent.cjs');
const NAME='SAP Cost Center Lab QB';
(async()=>{const {browser,page}=await H.openBrowser();
try{
 const prompt=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit/e2e/prompts/zcc_erp.txt','utf8').replace(/<your initials>/g,'QB');
 H.log('prompt: '+prompt.split('\n')[0]);
 const r=await B.runPrompt(page,prompt,async()=>(await H.count('sn_erp_integration_model','name='+NAME))>=1,{timeoutMs:1800000});
 H.log('RESULT '+JSON.stringify(r));
 const m=await H.rows('sn_erp_integration_model','name='+NAME,'sys_id,name,system,sys_scope');H.log('model: '+JSON.stringify(m));
 if(m[0]){const id=m[0].sys_id;for(const t of ['sn_erp_integration_model_operation','sn_erp_integration_model_entity','sn_erp_integration_model_table_field','sn_erp_integration_model_operation_input','sn_erp_integration_model_operation_input_mapping','sn_erp_integration_model_operation_output'])H.log('  '+t.replace('sn_erp_integration_model_','')+': '+await H.count(t,'model='+id));}
}catch(e){H.log('ERROR '+e.message);await H.shot(page,'ba399f_err');}
await browser.close();})();
