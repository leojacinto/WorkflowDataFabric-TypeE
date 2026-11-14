const {chromium}=require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit/node_modules/playwright-core');
const fs=require('fs');
const L=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/.env','utf8').split('\n').map(s=>s.trim());
(async()=>{
const b=await chromium.launch({headless:true});const p=await b.newPage({viewport:{width:1600,height:900}});
await p.goto('https://lef-nov-7021-0001.lab.service-now.com/login.do',{timeout:90000});
await p.fill('#user_name',L[14]);await p.fill('#user_password',L[15]);await p.click('#sysverb_login');
await p.waitForTimeout(10000);
console.log(p.url());
await p.screenshot({path:'/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/l7021.png'});
console.log((await p.innerText('body')).slice(0,300));
await b.close();})();
