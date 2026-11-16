const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/now-assist-admin/now-assist-panel',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.mouse.click(1116,461);await p.waitForTimeout(4000);await p.mouse.click(1031,525);await p.waitForTimeout(8000);await p.screenshot({path:u.S+'zm14a.png'});
for(const n of ['Turn on','Confirm','Activate','Save','Done']){const d=p.getByRole('button',{name:n,exact:true});if(await d.count()>0&&n!=='Turn on'){await d.first().click().catch(()=>{});await p.waitForTimeout(5000);}}
await p.screenshot({path:u.S+'zm14b.png'});
await p.goto(u.H+'/now/agent-studio/playground',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await p.screenshot({path:u.S+'zm14c.png'});
await b.close();})();
