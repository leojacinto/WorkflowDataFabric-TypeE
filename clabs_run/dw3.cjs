const u=require('./u7021.cjs');
const ID=process.env.AGENT_ID;
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/'+ID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
for(let i=1;i<=7;i++){await p.mouse.click(1486,866);await p.waitForTimeout(5000);const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
 const dup=p.getByRole('button',{name:'Ignore and continue'});if(await dup.count()){await dup.first().click();await p.waitForTimeout(6000);}}
const t=p.locator('textarea:visible').last();await t.click();await t.fill('Use only the DeepWiki tool to list the wiki structure of the GitHub repo modelcontextprotocol/servers. Do not use any other tool.');await p.waitForTimeout(2000);
await p.screenshot({path:u.S+'dw11_pre.png'});
await p.getByRole('button',{name:'Continue to test chat response'}).click();
for(let i=1;i<=20;i++){await p.waitForTimeout(15000);await p.screenshot({path:u.S+'dw11_'+i+'.png'});}
await b.close();})();
