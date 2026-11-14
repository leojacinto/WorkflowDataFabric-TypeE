const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await u.nav(p,'Zero Copy Connector for ERP Home');
await p.getByText('Zero Copy Connector for ERP H',{exact:false}).last().click({timeout:10000}).catch(e=>console.log('noclick'));
await p.waitForTimeout(30000);const ps=p.context().pages();console.log(ps.length,ps.map(x=>x.url()));const q=ps[ps.length-1];await u.dismiss(q);await q.screenshot({path:O+'zcc_erp_home_layout.png'});
await b.close();})();
