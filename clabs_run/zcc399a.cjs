const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/wdf/connections/77c3ed5d4714db54037d0fadf26d4389?tabId=connection-details',{timeout:90000}).catch(()=>{});await p.waitForTimeout(25000);
await p.screenshot({path:u.S+'zcc399a_a.png'});
await b.close();})();
