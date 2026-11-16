const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/playground',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.mouse.click(133,428);await p.waitForTimeout(6000);await p.mouse.click(590,294);await p.waitForTimeout(2000);await p.mouse.click(133,327);await p.waitForTimeout(4000);
await p.mouse.click(590,376);await p.keyboard.type('Forecast Variance (Copy)',{delay:30});await p.waitForTimeout(4000);await p.mouse.click(160,437);await p.waitForTimeout(4000);
await p.mouse.click(590,526);await p.keyboard.type('Use the Read Wiki Structure DeepWiki tool with repoName facebook/react and list the first three topics.',{delay:10});await p.waitForTimeout(1500);
await p.screenshot({path:u.S+'zm19b.png'});
await p.mouse.click(1025,722);await p.waitForTimeout(15000);await p.screenshot({path:u.S+'zm19c.png'});await b.close();})();
