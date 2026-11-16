const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_user_list.do?sysparm_query='+encodeURIComponent('user_name=admin'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
await p.locator('a.linked').first().click();await p.waitForTimeout(10000);
await p.evaluate(()=>{const t=document.getElementById('tabs2_section');if(t)t.scrollIntoView();});
console.log(await p.evaluate(()=>[...document.querySelectorAll('button,a')].filter(e=>/^Edit/.test((e.innerText||'').trim())||/edit/i.test(e.id)).map(e=>e.tagName+'#'+e.id+' "'+(e.innerText||'').trim()+'"').slice(0,8)));
await p.screenshot({path:u.S+'role_probe.png',fullPage:true});
await b.close();})();
