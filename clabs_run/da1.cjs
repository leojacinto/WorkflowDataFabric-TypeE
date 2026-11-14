const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/'+process.env.AID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.getByText('Define data access',{exact:true}).first().click();await p.waitForTimeout(5000);
await p.screenshot({path:u.S+process.env.TAG+'_da.png'});await b.close();})();
