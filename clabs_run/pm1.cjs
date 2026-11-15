const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/manage-mcp-servers',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.screenshot({path:u.S+'pm1_a.png'});
const btn=p.getByRole('button',{name:'New'});
await btn.first().click().catch(e=>console.log('e'));await p.waitForTimeout(5000);await p.screenshot({path:u.S+'pm1_b.png'});
await b.close();})();
