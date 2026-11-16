const u=require('./u7021.cjs');
const ID=process.env.AGENT_ID;
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/'+ID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1486,866);await p.waitForTimeout(5000);
let d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
await p.mouse.click(1505,224);await p.waitForTimeout(2000);await p.mouse.click(1476,481);await p.waitForTimeout(8000);
await p.mouse.click(790,306);await p.waitForTimeout(2500);await p.screenshot({path:u.S+'nm2_servers.png'});
await p.mouse.click(522,370);await p.waitForTimeout(20000);
await p.mouse.click(780,376);await p.waitForTimeout(5000);await p.screenshot({path:u.S+'nm2_tools.png'});
await p.keyboard.type('Run SQL',{delay:50});await p.waitForTimeout(3000);await p.screenshot({path:u.S+'nm2_search.png'});
await b.close();})();
