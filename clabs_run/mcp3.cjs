const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/create-manage',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(211,211);await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'mcp3_a.png'});
const t=await p.evaluate(()=>[...document.querySelectorAll('*')].map(e=>e.shadowRoot?'':'').length);
await b.close();})();
