const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/playground',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
const [pg]=await Promise.all([p.context().waitForEvent('page',{timeout:20000}).catch(()=>null),p.mouse.click(863,121)]);
const t=pg||p;await t.waitForTimeout(15000);console.log(t.url());await t.screenshot({path:u.S+'zm15a.png'});await b.close();})();
