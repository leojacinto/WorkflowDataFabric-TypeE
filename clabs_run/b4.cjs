const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/http_connection_list.do?sysparm_query=nameLIKEExpense',{timeout:90000});await p.waitForTimeout(6000);await u.dismiss(p);
await p.screenshot({path:u.S+'b4.png'});console.log((await p.innerText('body')).match(/\d+ to \d+ of \d+/)?.[0]||'none');
await b.close();})();
