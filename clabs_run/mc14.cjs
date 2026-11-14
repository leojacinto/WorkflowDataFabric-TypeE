// Open FV agent wizard > Tools > Add tool > MCP server tool, stop at server picker (screenshots)
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/agent-setup/9e17686d9dec9b107f44c3f1c075db75',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(1486,866);await p.waitForTimeout(5000);
let d=p.getByRole('button',{name:'Save updates'});if(await d.count()){await d.first().click();await p.waitForTimeout(8000);}
await p.mouse.click(1505,224);await p.waitForTimeout(2000);await p.mouse.click(1476,481);await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'mc14_a.png'});
await p.mouse.click(790,306);await p.waitForTimeout(2500);await p.screenshot({path:u.S+'mc14_b.png'});
await b.close();})();
