const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/c7ce73bd692817107f44eec54a7bd776',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1486,866);await p.waitForTimeout(5000);
for(const n of ['Save updates','Ignore and continue']){const d=p.getByRole('button',{name:n});if(await d.count()){await d.first().click();await p.waitForTimeout(6000);}}
await p.mouse.click(1504,224);await p.waitForTimeout(2000);await p.mouse.click(1475,449);await p.waitForTimeout(5000);
await p.mouse.click(790,306);await p.waitForTimeout(2500);await p.mouse.click(538,370);await p.waitForTimeout(8000);
await p.mouse.click(790,376);await p.waitForTimeout(2500);await p.mouse.click(538,546);await p.waitForTimeout(3000);await p.mouse.click(790,580);await p.keyboard.type('Read Wiki Structure DeepWiki',{delay:20});await p.mouse.click(790,665);await p.keyboard.type('Get a list of documentation topics for a GitHub repository.',{delay:10});await p.mouse.move(790,600);await p.mouse.wheel(0,600);await p.waitForTimeout(1500);await p.mouse.click(562,517);await p.waitForTimeout(800);await p.mouse.click(1110,693);await p.waitForTimeout(6000);await p.screenshot({path:u.S+'zm11d.png'});for(let i=1;i<=5;i++){await p.mouse.click(1486,866);await p.waitForTimeout(5000);for(const n of ['Save updates','Ignore and continue']){const d=p.getByRole('button',{name:n});if(await d.count()){await d.first().click();await p.waitForTimeout(6000);}}await p.screenshot({path:u.S+'zm11e'+i+'.png'});}
await b.close();})();
