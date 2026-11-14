const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/home/subflow',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.screenshot({path:u.S+'h1_list.png'});
console.log(p.url());
const t=await p.evaluate(()=>document.body.innerText.slice(0,1500));console.log(t);
await b.close();})();
