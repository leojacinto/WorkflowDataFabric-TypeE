const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/servicenow-ai-lens/home/8a05bbd99d289b107f44c3f1c075dbfc',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
console.log(await p.locator('input[type=file]').first().getAttribute('accept'));
await p.waitForTimeout(10000);await p.screenshot({path:u.S+'h15_a.png'});
console.log((await p.evaluate(()=>document.body.innerText)).slice(0,500));
await p.waitForTimeout(20000);await p.screenshot({path:u.S+'h15_b.png'});
await b.close();})();
