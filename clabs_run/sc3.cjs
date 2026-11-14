const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/create-manage',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.screenshot({path:u.S+'sc2_a.png',clip:{x:0,y:0,width:1600,height:60}});
await p.mouse.click(1112,26);await p.waitForTimeout(2500);await p.mouse.click(1019,258);await p.waitForTimeout(2500);await p.screenshot({path:u.S+'sc3_a.png'});
await b.close();})();
