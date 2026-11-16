const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/x_snc_forecast_v_0_wdf_lab.do?view=%2Fexercises%2Ffundamentals',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);
const r=await p.evaluate(()=>{const t=document.body.innerText;return {heading:/Minimum versions/.test(t),buildAgent:/Build Agent\s+2\.6\.4/.test(t),rows:document.querySelectorAll('table tr').length};});console.log(JSON.stringify(r));
await p.evaluate(()=>{const h=[...document.querySelectorAll('h3')].find(x=>/Minimum versions/.test(x.innerText));if(h)h.scrollIntoView();});await p.waitForTimeout(1500);await p.screenshot({path:u.S+'vf3_a.png'});
await b.close();})();
