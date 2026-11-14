const {chromium}=require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit/node_modules/playwright-core');
const fs=require('fs');
const S='/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/';
const L=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/.env','utf8').split('\n').map(s=>s.trim());
const H=process.env.LAB_HOST||'https://lef-nov-7021-0001.lab.service-now.com';
const UI=+(process.env.LAB_USER_IDX||14),PI=+(process.env.LAB_PASS_IDX||15); // 0-based .env line indexes
exports.open=async()=>{const b=await chromium.launch({headless:false,channel:'chrome'});const p=await b.newPage({viewport:{width:1600,height:900}});
await p.goto(H+'/login.do',{timeout:90000});await p.fill('#user_name',L[UI]);await p.fill('#user_password',L[PI]);await p.click('#sysverb_login');await p.waitForTimeout(8000);p.on('framenavigated',()=>{});return {b,p};};
exports.H=H;exports.S=S;
exports.dismiss=async(p)=>{for(const t of ['Got it','Close','Skip','Dismiss']){const l=p.getByRole('button',{name:t,exact:true});if(await l.count()){await l.first().click().catch(()=>{});await p.waitForTimeout(800);}}};
exports.nav=async(p,text,shot)=>{await p.goto(exports.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);await exports.dismiss(p);
await p.mouse.click(214,25);await p.waitForTimeout(2500);await p.keyboard.type(text,{delay:60});await p.waitForTimeout(3500);
if(shot)await p.screenshot({path:shot});};
