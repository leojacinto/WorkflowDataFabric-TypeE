const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/classic/params/target/x_snc_forecast_v_0_expense_transaction_event_list.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1473,74);await p.waitForTimeout(12000);
const pages=p.context().pages();console.log(pages.map(x=>x.url()));
for(let i=0;i<pages.length;i++)await pages[i].screenshot({path:u.S+'h12_'+i+'.png'});
await b.close();})();
