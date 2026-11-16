const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/x_snc_forecast_v_0_wdf_lab.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const r=await p.evaluate(async()=>{const base='/uxta/eb721c3f0610419b9951e030574f8cdf.assetx?path=app.css';const o={};for(const q of ['&v=98653427','&v=999','']){const t=await fetch(base+q).then(x=>x.text()).catch(e=>'ERR');o[q||'(none)']=t.includes('0b1417');}return o;});console.log(JSON.stringify(r));
await p.goto(u.H+'/sys_ux_theme_asset_list.do?sysparm_query='+encodeURIComponent('sys_id=eb721c3f0610419b9951e030574f8cdf'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(5000);
console.log(await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').slice(0,200))));
await b.close();})();
