const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_scope_list.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
await p.getByRole('button',{name:'New'}).first().click().catch(async()=>{await p.mouse.click(1565,73)});
await p.waitForTimeout(12000);
console.log(p.url(),(await p.context().pages()).length);
await p.screenshot({path:u.S+'fs4_a.png'});
const q=p.context().pages();for(const [i,pg] of q.entries()){console.log(i,pg.url().slice(0,140));await pg.screenshot({path:u.S+'fs4_pg'+i+'.png'});}const f=p.frames().map(x=>x.url().slice(0,100));console.log(f);
await b.close();})();
