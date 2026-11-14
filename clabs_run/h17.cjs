const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/servicenow-ai-lens/home/8a05bbd99d289b107f44c3f1c075dbfc',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(677,480);await p.waitForTimeout(3000);
await p.locator('input[type=file]').first().setInputFiles(u.S+'Invoice_Injection_PROD_DE_2.png');
await p.waitForTimeout(12000);await p.screenshot({path:u.S+'h17_a.png'});
await p.mouse.click(1041,648);
for(let i=1;i<=6;i++){await p.waitForTimeout(6000);await p.screenshot({path:u.S+'h17_n'+i+'.png'});}
console.log(p.context().pages().map(x=>x.url().slice(0,140)));
await b.close();})();
