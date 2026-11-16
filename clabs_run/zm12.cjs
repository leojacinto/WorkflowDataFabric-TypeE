const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/create-manage',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.getByText('Testing',{exact:true}).first().click();await p.waitForTimeout(10000);
console.log(p.url());await p.screenshot({path:u.S+'zm12a.png'});await b.close();})();
