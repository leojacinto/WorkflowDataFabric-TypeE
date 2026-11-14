const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_hub_flow.do?sys_id=2a71d9143bda72900ad1a021a3e45a0f',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.mouse.click(1461,84);await p.waitForTimeout(8000);
await p.screenshot({path:u.S+'fl7_a.png'});
const pub=p.getByRole('button',{name:'Publish',exact:true});await p.mouse.click(1129,282);await p.waitForTimeout(10000);await p.screenshot({path:u.S+'fl7_b.png'});
await b.close();})();
