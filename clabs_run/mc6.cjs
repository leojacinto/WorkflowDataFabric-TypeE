// Read-only: open the Neon MCP credential record (and connection) on LAB_HOST
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const [t,n] of [['discovery_credentials','a'],['http_connection','b']]){
 await p.goto(u.H+'/'+t+'_list.do?sysparm_query='+encodeURIComponent('nameLIKENeon'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
 await p.screenshot({path:u.S+'mc6_'+n+'_list.png'});
 const a=p.locator('a.linked').first(); if(await a.count()){await a.click();await p.waitForTimeout(8000);await p.screenshot({path:u.S+'mc6_'+n+'.png'});}
}
await b.close();})();
