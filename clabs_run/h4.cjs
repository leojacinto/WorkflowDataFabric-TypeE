const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/workflow-studio/home/subflow',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1217,92);await p.waitForTimeout(1000);
await p.mouse.move(135,289);await p.waitForTimeout(800);
await p.screenshot({path:u.S+'h4_a.png',clip:{x:0,y:260,width:500,height:60}});
await b.close();})();
