const fs=require('fs'),path=require('path');const {chromium}=require('playwright-core');
const L=fs.readFileSync(path.resolve(__dirname,'..','..','.env'),'utf8').split(/\r?\n/).map(x=>x.trim());const host=L[0];
(async()=>{const b=await chromium.launch({headless:true});
const ctx=await b.newContext({viewport:{width:1400,height:1000},storageState:path.join(__dirname,'ba/state.json')});
const p=await ctx.newPage();
await p.goto(`https://${host}.service-now.com/login.do`);await p.fill('#user_name',L[1]);await p.fill('#user_password',L[2]);await p.click('#sysverb_login');await p.waitForTimeout(8000);
await p.goto(`https://${host}.service-now.com/x_snc_forecast_v_0_wdf_lab.do?view=${process.argv[2]}`,{waitUntil:'domcontentloaded'});
await p.waitForTimeout(15000);
const info=await p.evaluate(()=>{const f=document.querySelector('iframe');const d=f?f.contentDocument:document;
return {url:location.href.slice(0,80),ols:[...d.querySelectorAll('ol')].map(o=>`${o.getAttribute('start')||1}+${o.children.length}`),
mcpNew:/Otto panel/.test(d.body.innerText),title:(d.querySelector('h1,h2')||{}).textContent}});
console.log(JSON.stringify(info));
const el=null;
await p.getByText(process.argv[4]).first().scrollIntoViewIfNeeded();await p.waitForTimeout(2500);
await p.screenshot({path:process.argv[3]});await b.close();})();
