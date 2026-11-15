const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_glider_app/servicenow_studio.do?table=sys_app&sysId=-1',{timeout:90000}).catch(()=>{});await p.waitForTimeout(40000);
await p.mouse.click(338,500);await p.waitForTimeout(2000);await p.mouse.click(980,846);await p.waitForTimeout(8000);
await p.mouse.click(462,455);await p.keyboard.insertText('Lab QC Forecast Variance');await p.waitForTimeout(2000);
await p.screenshot({path:u.S+'fs7_a_name.png'});
await p.waitForTimeout(3000);await p.mouse.click(822,717);await p.waitForTimeout(12000);await p.screenshot({path:u.S+'fs7_b_next.png'});
await b.close();})();
