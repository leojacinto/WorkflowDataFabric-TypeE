const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/classic/params/target/'+encodeURIComponent('sys_hub_flow_list.do?sysparm_query=sys_scope.scope=x_snc_forecast_v_0'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);
await p.screenshot({path:u.S+'acl28_a.png'});
await b.close();})();
