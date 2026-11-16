const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/x_snc_forecast_v_0_wdf_lab.do?view=%2Fexercises%2Fzero-copy-connectors',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);
const r=await p.evaluate(async()=>{const out=[];for(const l of document.querySelectorAll('link[rel=stylesheet]')){const t=await fetch(l.href).then(x=>x.text()).catch(()=>'');out.push(l.href.split('/').slice(-2).join('/')+' has0b1417:'+t.includes('0b1417')+' lab-pre:'+t.includes('lab-pre'));}
const st=[...document.querySelectorAll('style')].map(s=>s.textContent.includes('0b1417'));return {out,inline:st};});console.log(JSON.stringify(r));
await b.close();})();
