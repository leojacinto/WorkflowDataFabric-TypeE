const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await u.nav(p,'Zero Copy Connectors',O+'zcc_pg_nav.png');
await p.mouse.click(225,270);
await p.waitForTimeout(30000);const ps=p.context().pages();const q=ps[ps.length-1];console.log(ps.length,q.url());await u.dismiss(q);
await q.screenshot({path:O+'zcc_pg_hub.png'});
console.log((await q.innerText('body')).replace(/\n+/g,' | ').slice(0,500));
await b.close();})();
