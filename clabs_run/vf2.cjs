const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/x_snc_forecast_v_0_wdf_lab.do?view=%2Fexercises%2Fzero-copy-connectors',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);
const t=await p.evaluate(()=>document.body.innerText);console.log('initials in prompt:',/SAP Cost Center Lab <your initials>/.test(t),'| old unqualified prompt:',/as "SAP Cost Center Lab"\n/.test(t));
await b.close();})();
