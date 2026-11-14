const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/290bc4ec3b56765062f31831a3e45a86',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8*60*1000);
await b.close();})();
