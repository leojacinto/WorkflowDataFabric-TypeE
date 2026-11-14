const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/classic/params/target/x_snc_forecast_v_0_expense_transaction_event_list.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.screenshot({path:u.S+'h11_a.png'});
const btn=p.getByText('Create with Lens');console.log('lens btn',await btn.count());
const f=p.frames().length;console.log('frames',f);
for(const fr of p.frames()){const c=await fr.getByText('Create with Lens').count().catch(()=>0);if(c)console.log('in frame',fr.url().slice(0,80));}
await b.close();})();
