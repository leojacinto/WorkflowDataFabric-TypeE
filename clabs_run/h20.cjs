const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/servicenow-ai-lens/home/8a05bbd99d289b107f44c3f1c075dbfc',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(677,480);await p.waitForTimeout(4000);
await p.screenshot({path:u.S+'h20_0.png'});
await p.mouse.click(1012,549);await p.waitForTimeout(3000);
await p.screenshot({path:u.S+'h20_1.png'});
await b.close();})();
