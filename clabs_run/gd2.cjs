const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/x_snc_forecast_v_0_wdf_lab.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);
await p.getByText('Extended Exercises',{exact:true}).first().click();await p.waitForTimeout(2000);
await p.screenshot({path:u.S+'gd2_a.png'});
await p.getByText(/Model Context Protocol/).first().click();await p.waitForTimeout(8000);
console.log(p.url());
for(let i=0;i<40;i++){await p.mouse.wheel(0,1200);await p.waitForTimeout(500);}
await p.waitForTimeout(4000);
const r=await p.evaluate(()=>{const imgs=[...document.querySelectorAll('main img, article img, img')];return {total:imgs.length,ok:imgs.filter(i=>i.complete&&i.naturalWidth>0).length,broken:imgs.filter(i=>!(i.complete&&i.naturalWidth>0)).map(i=>i.src.split('/').pop())};});
console.log(JSON.stringify(r));
await b.close();})();
