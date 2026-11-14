const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await u.nav(p,'ServiceNow AI Lens');
await p.mouse.click(256,271);await p.waitForTimeout(15000);await u.dismiss(p);
const pages=p.context().pages();const q=pages[pages.length-1];console.log(q.url());
await q.screenshot({path:u.S+'h10_a.png'});
console.log((await q.evaluate(()=>document.body.innerText)).slice(0,1200));
await b.close();})();
