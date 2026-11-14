const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_hub_flow.do?sys_id=2a71d9143bda72900ad1a021a3e45a0f',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.mouse.click(1461,84);await p.waitForTimeout(10000);
await p.mouse.click(1559,84);await p.waitForTimeout(2500);await p.mouse.click(1420,183);await p.waitForTimeout(5000);
await p.mouse.click(812,170);await p.keyboard.press('Meta+a');await p.keyboard.type('Budget Variance Analysis',{delay:30});await p.waitForTimeout(800);await p.screenshot({path:u.S+'fl5_pre.png'});
await p.mouse.click(1029,492);await p.waitForTimeout(3000);
await p.mouse.click(1488,84);await p.waitForTimeout(8000);await p.mouse.click(1129,282);await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'fl5_a.png'});await b.close();})();
