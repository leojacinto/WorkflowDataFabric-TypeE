const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/cache.do',{timeout:120000}).catch(()=>{});await p.waitForTimeout(15000);
await p.goto(u.H+'/x_snc_forecast_v_0_wdf_lab.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const r=await p.evaluate(async()=>{const l=[...document.querySelectorAll('link[rel=stylesheet]')].map(x=>x.href).find(h=>h.includes('app.css'));const t=await fetch(l).then(x=>x.text());return {href:l.split('?')[1],len:t.length,has:t.includes('0b1417')};});console.log(JSON.stringify(r));
await b.close();})();
