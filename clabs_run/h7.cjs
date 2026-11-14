const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/home/subflow',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1217,92);await p.waitForTimeout(500);
await p.mouse.wheel(0,2000);await p.waitForTimeout(1000);
await p.mouse.click(995,843);await p.waitForTimeout(1000);await p.mouse.click(1005,810);await p.waitForTimeout(4000);
let found=0;
for(let pg=1;pg<=7&&!found;pg++){
 const link=p.getByRole('link',{name:'Get Expense Event',exact:true});
 if(await link.count()){found=1;await link.first().scrollIntoViewIfNeeded();
  const [np]=await Promise.all([p.context().waitForEvent('page',{timeout:25000}).catch(()=>null),link.first().click()]);
  const q=np||p;await q.waitForTimeout(30000);console.log('opened',q.url());await q.screenshot({path:u.S+'h7_builder.png'});break;}
 const txt=await p.evaluate(()=>[...document.querySelectorAll('a')].map(a=>a.innerText).filter(t=>/^[A-Z]/.test(t)).slice(0,1));console.log('page',pg,txt);
 await p.mouse.wheel(0,3000);await p.waitForTimeout(500);
 await p.getByText(String(pg+1),{exact:true}).last().click().catch(()=>{});await p.waitForTimeout(4000);}
console.log('found',found);
await b.close();})();
