const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
 await p.goto(u.H+'/now/external-content-connectors/home',{timeout:240000}).catch(()=>{});await p.getByRole('button',{name:'Create',exact:true}).first().waitFor({timeout:200000}).catch(()=>{});await p.waitForTimeout(5000);
 await p.screenshot({path:u.S+'xcc_pere_home.png'});await b.close();})();
