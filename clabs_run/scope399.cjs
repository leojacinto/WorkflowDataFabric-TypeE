const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.mouse.click(1319,25);await p.waitForTimeout(8000);
await p.getByText(/^Application scope:/).first().click();await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'scope399_c.png'});
await p.getByPlaceholder('Filter').first().fill('Forecast Variance').catch(()=>console.log('no filter box'));await p.waitForTimeout(4000);
await p.screenshot({path:u.S+'scope399_d.png'});
await b.close();})();
