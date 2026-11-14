const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const t of ['http_connection','discovery_credentials']){
await p.goto(u.H+'/'+t+'_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon^ORDERBYDESCsys_created_on'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.screenshot({path:u.S+'mc19_'+t+'.png'});}
await p.goto(u.H+'/http_connection_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon^ORDERBYDESCsys_created_on'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);await p.screenshot({path:u.S+'mc19_conn.png'});
await b.close();})();
