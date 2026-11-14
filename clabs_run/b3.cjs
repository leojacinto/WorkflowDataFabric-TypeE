const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_alias_list.do?sysparm_query=nameLIKEExpense',{timeout:90000});await p.waitForTimeout(6000);await u.dismiss(p);
await p.getByText('Get Expense Event',{exact:true}).first().click();await p.waitForTimeout(8000);
await p.mouse.click(1554,543);await p.waitForTimeout(8000);
await p.mouse.click(437,75);await p.keyboard.type('Get Expense Event');await p.mouse.click(437,343);await p.keyboard.type('https://wdflab.servicenow.workers.dev');await p.screenshot({path:O+'ihub_connection_filled.png'});await p.mouse.click(1556,22);await p.waitForTimeout(8000);await p.screenshot({path:O+'ihub_connection_saved.png'});
console.log(p.url());
await b.close();})();
