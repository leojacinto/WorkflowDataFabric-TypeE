const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await u.nav(p,'Zero Copy Connector for ERP Home',O+'zcc_erp_home_nav.png');
await b.close();})();
