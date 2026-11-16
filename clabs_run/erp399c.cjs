const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_erp_integration_model.do?sys_id=474d07c6479da2108333b13b116d4397',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);
console.log(await p.evaluate(()=>[...document.querySelectorAll('button,a')].map(e=>(e.innerText||'').trim()).filter(t=>/clone|manage|save|update/i.test(t)).slice(0,10)));
await p.screenshot({path:u.S+'erp399c_a.png'});
const cl=p.getByRole('button',{name:'Clone'});console.log('clone buttons',await cl.count());
if(await cl.count()){await cl.first().click();await p.waitForTimeout(8000);await p.screenshot({path:u.S+'erp399c_b.png'});}
await b.close();})();
