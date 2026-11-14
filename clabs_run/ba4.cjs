const u=require('./u7021.cjs');const fs=require('fs');
const md=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/main-exercises/lab-exercise-integration-hub.md','utf8');
const m=md.match(/In the Forecast Variance app:\s*\n\s*1\. Create a subflow named "Extract Cost Center"[\s\S]*?(?=```)/);
const prompt=m[0].split('\n').map(s=>s.trim()).join('\n').trim();
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_glider_app/servicenow_studio.do?table=sys_app&sysId=a4fd2da13bf8be5062f31831a3e45ac9',{timeout:90000}).catch(()=>{});await p.waitForTimeout(25000);
await p.mouse.click(1062,259).catch(()=>{});await p.waitForTimeout(1500);
await p.mouse.click(26,76);await p.waitForTimeout(4000);await p.mouse.click(125,147);await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'ba4_a.png'});
const box=p.locator('textarea, [contenteditable="true"]').last();console.log('inputs',await box.count());
await box.click().catch(()=>{});await p.keyboard.insertText(prompt);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'ba4_b.png'});
await p.keyboard.press('Enter');
for(let i=1;i<=6;i++){await p.waitForTimeout(20000);await p.screenshot({path:u.S+'ba4_c'+i+'.png'});}
await b.close();})();
