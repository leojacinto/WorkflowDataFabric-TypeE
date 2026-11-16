const u=require('./u7021.cjs');
const URL_='/sn_aia_trigger_configuration.do?sys_id=9932a89048ef41aa821ab392621cfe63';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+URL_,{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
console.log(await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>/click here/i.test(a.textContent)).map(a=>a.outerHTML.slice(0,200))));
const a=p.locator('a',{hasText:/click here/i}).first();console.log('links',await a.count());
if(await a.count()){await a.click();await p.waitForTimeout(12000);}
console.log('readonly?',await p.evaluate(()=>{const f=document.querySelector('#sys_readonly\\.sn_aia_trigger_configuration\\.name');return f?f.value:'n/a'}));
await p.mouse.click(1487,21);await p.waitForTimeout(12000);await p.screenshot({path:u.S+'resave399b_b.png'});
await b.close();})();
