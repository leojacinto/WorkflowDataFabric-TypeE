// Elevate, open new ACL form, set Type=flow, list options, screenshot
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.locator('.user-menu-label').first().click({force:true});await p.waitForTimeout(6000);
await p.getByText('Elevate role',{exact:true}).first().dispatchEvent('click');await p.waitForTimeout(6000);
await p.mouse.click(533,486);await p.waitForTimeout(1000);
await p.mouse.click(1032,597);await p.waitForTimeout(8000);
await p.goto(u.H+'/sys_security_acl.do?sys_id=-1',{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
const sel=p.locator('select').first();
console.log(JSON.stringify(await sel.locator('option').allTextContents()));
await sel.selectOption({label:'flow'}).catch(e=>console.log('selerr',e.message.slice(0,100)));await p.waitForTimeout(4000);
const ins=await p.evaluate(()=>[...document.querySelectorAll('input,select,textarea')].filter(e=>e.offsetParent).map(e=>e.tagName+'|'+e.id+'|'+(e.type||'')+'|'+(e.value||'').slice(0,30)));console.log(JSON.stringify(ins.slice(0,40),null,0));
await p.screenshot({path:u.S+'acl10_a.png'});
await b.close();})();
