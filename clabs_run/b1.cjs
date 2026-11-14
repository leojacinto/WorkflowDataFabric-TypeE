const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_alias_list.do?sysparm_query=nameLIKEExpense',{timeout:90000});await p.waitForTimeout(6000);await u.dismiss(p);
await p.screenshot({path:O+'ihub_alias_list.png'});
await p.getByText('Get Expense Event',{exact:true}).first().click();await p.waitForTimeout(8000);
await p.screenshot({path:O+'ihub_alias_open.png'});
console.log((await p.innerText('body')).split('\n').filter(l=>/Connections|Type|Name|Configuration/.test(l)).slice(0,12).join(' | '));
await b.close();})();
