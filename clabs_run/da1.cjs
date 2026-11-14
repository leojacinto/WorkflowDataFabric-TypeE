const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const [n,id] of [['copy','9e17686d9dec9b107f44c3f1c075db75']]){
await p.goto(u.H+'/now/agent-studio/agent-setup/'+id,{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
for(let i=1;i<=3;i++){await p.mouse.click(1486,866);await p.waitForTimeout(5000);const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}}
await p.screenshot({path:u.S+'da1_'+n+'.png'});}
await b.close();})();
