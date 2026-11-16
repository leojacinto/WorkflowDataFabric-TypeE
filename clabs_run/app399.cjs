const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_app.do?sys_id=a4fd2da13bf8be5062f31831a3e45ac9',{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);
console.log(await p.evaluate(()=>[...document.querySelectorAll('button,a,.related_links_container a')].map(e=>(e.innerText||'').trim()).filter(t=>t&&t.length<50).filter((t,i,a)=>a.indexOf(t)===i).slice(0,60)));
await p.screenshot({path:u.S+'app399_a.png'});
await b.close();})();
