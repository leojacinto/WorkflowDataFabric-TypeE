const fs=require('fs');
const path='/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/';
const H=require(path+'human.cjs'),B=require(path+'buildagent.cjs');
(async()=>{const {browser,page}=await H.openBrowser();
try{
 const prompt=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit/e2e/prompts/zcc_pgtool.txt','utf8').replace(/<your initials>/g,'QB');
 const tools=async()=>{const a=await H.rows('sn_aia_agent','name=Forecast Variance QB','sys_id');return a.length?await H.count('sn_aia_agent_tool_m2m','agent='+a[0].sys_id):0;};
 H.log('tools before: '+await tools());
 const r=await B.runPrompt(page,prompt,async()=>(await tools())>=5,{timeoutMs:2400000});H.log('RESULT '+JSON.stringify(r)+' tools now '+await tools());
}catch(e){H.log('ERROR '+e.message);await H.shot(page,'ba399e_err');}
await browser.close();})();
