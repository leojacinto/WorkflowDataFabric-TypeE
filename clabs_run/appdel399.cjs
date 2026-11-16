const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_app.do?sys_id=a4fd2da13bf8be5062f31831a3e45ac9',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);
console.log('name',await p.evaluate(()=>g_form.getValue('name')));
await p.getByRole('button',{name:'Delete'}).first().click();await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'appdel399_a.png'});await p.mouse.click(901,214);await p.waitForTimeout(90000);await p.screenshot({path:u.S+'appdel399_b.png'});
await b.close();})();
