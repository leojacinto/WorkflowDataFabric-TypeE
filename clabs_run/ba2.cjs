const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/$studio.do?sysparm_transaction_scope=a4fd2da13bf8be5062f31831a3e45ac9&sysparm_nostack=true',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);
const [np]=await Promise.all([p.context().waitForEvent('page',{timeout:20000}).catch(()=>null),p.mouse.click(418,307)]);
const t=np||p;await t.waitForTimeout(25000);console.log(t.url());await t.screenshot({path:u.S+'ba2_a.png'});await b.close();})();
