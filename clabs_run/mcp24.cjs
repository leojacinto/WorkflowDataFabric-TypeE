const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/353f77d19da89b107f44c3f1c075db1e',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1486,866);await p.waitForTimeout(5000);
const d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
await p.mouse.click(1505,224);await p.waitForTimeout(2000);
const [np]=await Promise.all([p.context().waitForEvent('page',{timeout:30000}).catch(()=>null),p.mouse.click(1476,481)]);
const q=np||p;await q.waitForTimeout(20000);await u.dismiss(q);console.log(q.url());
await q.mouse.click(790,306);await q.waitForTimeout(2500);await q.mouse.click(521,402);await q.waitForTimeout(15000);await q.mouse.click(780,376);await q.waitForTimeout(5000);await q.keyboard.type('Run SQL',{delay:50});await q.waitForTimeout(3000);await q.mouse.click(499,441);await q.waitForTimeout(6000);await q.screenshot({path:u.S+'mcp24_a.png'});
await b.close();})();
