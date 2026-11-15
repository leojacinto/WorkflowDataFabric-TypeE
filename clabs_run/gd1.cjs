const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/x_snc_forecast_v_0_wdf_lab.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);
console.log('url',p.url());
await p.evaluate(()=>{location.hash='#/exercises/mcp-server-client'});await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'gd1_a.png'});
const r=await p.evaluate(async()=>{const imgs=[...document.querySelectorAll('img')];window.scrollTo(0,document.body.scrollHeight);return {total:imgs.length,broken:imgs.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src.split('/').pop())};});
console.log(JSON.stringify(r));
await b.close();})();
