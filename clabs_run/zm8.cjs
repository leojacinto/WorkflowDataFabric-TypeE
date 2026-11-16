const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/c7ce73bd692817107f44eec54a7bd776',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1486,866);await p.waitForTimeout(5000);
for(const n of ['Save updates','Ignore and continue']){const d=p.getByRole('button',{name:n});if(await d.count()){await d.first().click();await p.waitForTimeout(6000);}}
await p.screenshot({path:u.S+'zm8a.png'});
console.log(p.url());await b.close();})();
