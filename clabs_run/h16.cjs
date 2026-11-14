const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
p.on('console',m=>{if(m.type()==='error')console.log('ERR',m.text().slice(0,150))});
p.on('response',r=>{if(r.status()>=400)console.log(r.status(),r.url().slice(0,130))});
await p.goto(u.H+'/now/servicenow-ai-lens/home/8a05bbd99d289b107f44c3f1c075dbfc',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(677,480);await p.waitForTimeout(3000);
await p.locator('input[type=file]').first().setInputFiles(u.S+'Invoice_Injection_PROD_DE_2.png');
for(let i=1;i<=4;i++){await p.waitForTimeout(4000);await p.screenshot({path:u.S+'h16_'+i+'.png'});}
console.log(p.context().pages().map(x=>x.url().slice(0,120)));
await b.close();})();
