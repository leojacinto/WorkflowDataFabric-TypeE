const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/353f77d19da89b107f44c3f1c075db1e',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
for(let i=1;i<=6;i++){await p.mouse.click(1486,866);await p.waitForTimeout(5000);
 const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}}
const [np]=await Promise.all([p.context().waitForEvent('page',{timeout:20000}).catch(()=>null),p.getByText('Set up').first().click()]);
const q=np||p;await q.waitForTimeout(25000);await u.dismiss(q);console.log(q.url());
await q.screenshot({path:u.S+'mcp34_a.png'});
await b.close();})();
