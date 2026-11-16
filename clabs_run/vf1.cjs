const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/x_snc_forecast_v_0_wdf_lab.do?view=%2Fexercises%2Ffundamentals',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);
await p.screenshot({path:u.S+'vf1_a.png'});
const h=await p.evaluate(()=>[...document.querySelectorAll('h1,h2,h3')].map(e=>e.tagName+': '+e.innerText.trim()).slice(0,8));console.log(JSON.stringify(h));
const nav=await p.evaluate(()=>document.body.innerText.includes('Lab Exercise: Fundamentals'));console.log('old title present:',nav);
const c=await p.evaluate(()=>/Create a Scope|Build Agent option/.test(document.body.innerText));console.log('old section present:',c);
await b.close();})();
