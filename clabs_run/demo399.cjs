const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_app.do?sys_id=5e4866a16f2111100e6ee0d0245b3610',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);
console.log(await p.evaluate(()=>[...document.querySelectorAll('button,a.related_action,.related_links a,a')].map(e=>(e.innerText||'').trim()).filter(t=>/demo|load|update|install|version/i.test(t)).slice(0,20)));
await p.screenshot({path:u.S+'demo399_a.png'});
await b.close();})();
