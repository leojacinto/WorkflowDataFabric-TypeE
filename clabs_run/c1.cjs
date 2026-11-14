const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_agent_list.do?sysparm_query=nameLIKEForecast',{timeout:90000});await p.waitForTimeout(7000);await u.dismiss(p);
console.log((await p.innerText('body')).split('\n').filter(l=>/Forecast|Active/.test(l)).slice(0,12).join(' | '));
await p.screenshot({path:u.S+'c1.png'});
await p.goto(u.H+'/sn_aia_trigger_configuration_list.do?sysparm_query=nameLIKEExpense',{timeout:90000});await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'c1b.png'});
console.log((await p.innerText('body')).split('\n').slice(8,40).join(' | '));
await b.close();})();
