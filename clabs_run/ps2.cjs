const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/x_snc_forecast_v_0_wdf_lab.do?view=%2Fexercises%2Fzero-copy-connectors',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);
const r=await p.evaluate(()=>{const e=document.querySelector('pre.lab-pre');if(!e)return 'no pre';e.scrollIntoView({block:'center'});const c=getComputedStyle(e);return c.backgroundColor+' | '+c.color;});console.log(r);
await p.waitForTimeout(1500);await p.screenshot({path:u.S+'ps2_a.png'});
await b.close();})();
