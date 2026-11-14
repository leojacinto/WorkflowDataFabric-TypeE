const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/servicenow-ai-lens/home/8a05bbd99d289b107f44c3f1c075dbfc',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
const [fc]=await Promise.all([p.waitForEvent('filechooser',{timeout:20000}).catch(()=>null),p.mouse.click(677,480)]);
console.log('chooser',!!fc);
if(fc)await fc.setFiles(u.S+'Invoice_Injection_PROD_DE_2.pdf');
await p.waitForTimeout(8000);await p.screenshot({path:u.S+'h13_a.png'});
console.log((await p.evaluate(()=>document.body.innerText)).slice(0,600));
await b.close();})();
