const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/create-manage',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.getByText('AI agents',{exact:true}).first().click();await p.waitForTimeout(7000);
await p.screenshot({path:u.S+'zm5a.png'});await b.close();})();
