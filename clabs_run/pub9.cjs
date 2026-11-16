const {chromium}=require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit/node_modules/playwright-core');
const S='/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/';
(async()=>{const b=await chromium.launch({headless:true});const p=await (await b.newContext({viewport:{width:1600,height:900}})).newPage();
 const bad=[];p.on('response',x=>{if(x.status()>=400)bad.push(x.status()+' '+x.url().replace('https://perelandra.service-now.com','').slice(0,90))});
 await p.goto('https://perelandra.service-now.com/x_snc_forecast_v_0_wdf_lab.do',{timeout:120000}).catch(()=>{});await p.waitForTimeout(25000);
 const fr=[];for(const f of p.frames()){fr.push(await f.evaluate(()=>({canvas:document.querySelectorAll('canvas').length,hasScene:!!document.getElementById('scene'),w:window.innerWidth})).catch(()=>null));}
 console.log('frames',JSON.stringify(fr));console.log('failed requests',bad);
 const a=await p.screenshot({path:S+'pub9_a.png'});await p.waitForTimeout(3000);await p.screenshot({path:S+'pub9_b.png'});
 const eq=require('fs').readFileSync(S+'pub9_a.png').equals(require('fs').readFileSync(S+'pub9_b.png'));console.log('screen changed over 3 s (animation running):',!eq);
 await b.close();})();
