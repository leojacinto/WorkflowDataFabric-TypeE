const u=require('./u7021.cjs');const fs=require('fs');
const md=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/main-exercises/lab-exercise-integration-hub.md','utf8');
const i=md.indexOf('In the Forecast Variance app:\n1. Create a subflow named "Extract Cost Center"');const prompt=md.slice(i,md.indexOf('```',i)).split('\n').map(s=>s.trim()).join(' ').trim();
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_glider_app/servicenow_studio.do?table=sys_app&sysId=a4fd2da13bf8be5062f31831a3e45ac9',{timeout:90000}).catch(()=>{});await p.waitForTimeout(25000);
await p.mouse.click(1062,259).catch(()=>{});await p.waitForTimeout(1500);
await p.mouse.click(26,76);await p.waitForTimeout(5000);await p.screenshot({path:u.S+'ba3_a.png'});
console.log('prompt chars',prompt.length);await b.close();})();
