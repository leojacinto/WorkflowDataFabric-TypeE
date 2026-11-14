const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await u.nav(p,'Agentic Solutions',u.S+'mcp15_a.png');
await p.mouse.click(225,270);await p.waitForTimeout(15000);await u.dismiss(p);
const pgs=p.context().pages();const q=pgs[pgs.length-1];console.log(q.url());
await q.screenshot({path:u.S+'mcp15_b.png'});
await b.close();})();
