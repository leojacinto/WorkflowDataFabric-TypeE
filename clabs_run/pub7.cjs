// Every guide page, with NO login: count images that fail to show, plus whether the home animation script runs.
const u=require('./u7021.cjs');
const {chromium}=require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit/node_modules/playwright-core');
const ROUTES=['/home','/exercises/fundamentals','/exercises/integration-hub','/exercises/zero-copy-connectors','/exercises/external-content-connector','/exercises/lens-and-document-intelligence','/exercises/mcp-server-client','/exercises/kafka-stream-connect','/conclusion/key-takeaways','/conclusion/final-activity','/demo-hub/considerations','/diagrams','/troubleshooting'];
async function run(label,ctxMaker){
 const {ctx,close}=await ctxMaker();let tb=0,tt=0;
 for(const r of ROUTES){const p=await ctx.newPage();const errs=[];p.on('response',x=>{if(x.status()>=400&&/scene|sys_attachment/.test(x.url()))errs.push(x.status());});
  await p.goto('https://perelandra.service-now.com/x_snc_forecast_v_0_wdf_lab.do?view='+encodeURIComponent(r),{timeout:120000}).catch(()=>{});await p.waitForTimeout(r==='/home'?20000:9000);
  for(let i=0;i<40;i++){await p.mouse.wheel(0,900);await p.waitForTimeout(150);}await p.waitForTimeout(3000);
  const d=await p.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>{i.loading='eager'});await new Promise(r=>setTimeout(r,4000));const a=[...document.images];return {t:a.length,b:a.filter(i=>!(i.complete&&i.naturalWidth>0)).length,canvas:[...document.querySelectorAll('canvas')].length,h:(document.querySelector('h1,h2')||{}).innerText}});
  tb+=d.b;tt+=d.t;console.log(label.padEnd(9),r.padEnd(45),'images',String(d.t).padStart(3),'broken',String(d.b).padStart(3),r==='/home'?'canvas '+d.canvas:'','failed asset requests',errs.length);await p.close();}
 console.log(label,'TOTAL images',tt,'broken',tb);await close();}
(async()=>{
 await run('NO LOGIN',async()=>{const b=await chromium.launch({headless:true});const ctx=await b.newContext({viewport:{width:1600,height:900}});return {ctx,close:()=>b.close()}});
 await run('LOGGED IN',async()=>{const b=await chromium.launch({headless:true});const ctx=await b.newContext({viewport:{width:1600,height:900}});const pg=await ctx.newPage();await pg.goto('https://perelandra.service-now.com/login.do');await pg.fill('#user_name',require('fs').readFileSync('.env','utf8').split('\n')[2].trim());await pg.fill('#user_password',require('fs').readFileSync('.env','utf8').split('\n')[3].trim());await pg.click('#sysverb_login');await pg.waitForTimeout(8000);await pg.close();return {ctx,close:()=>b.close()}});
})();
