const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_hub_flow.do?sys_id=2a71d9143bda72900ad1a021a3e45a0f',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.mouse.click(1461,84);await p.waitForTimeout(10000);
await p.mouse.click(1559,84);await p.waitForTimeout(2500);await p.mouse.click(1420,183);await p.waitForTimeout(5000);
await p.mouse.move(800,400);await p.mouse.wheel(0,400);await p.waitForTimeout(1500);await p.mouse.click(799,397);await p.waitForTimeout(2000);await p.mouse.wheel(0,500);await p.waitForTimeout(1500);await p.mouse.click(812,267);await p.waitForTimeout(1500);await p.mouse.click(716,341);await p.waitForTimeout(1000);await p.mouse.click(1029,492);await p.waitForTimeout(3000);await p.screenshot({path:u.S+'fl3_d.png'});await p.mouse.click(1488,84);await p.waitForTimeout(8000);await p.mouse.click(1129,282);await p.waitForTimeout(10000);await p.screenshot({path:u.S+'fl3_e.png'});await b.close();})();
