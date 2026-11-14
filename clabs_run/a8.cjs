const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
const Q=[['alias','sys_alias_list.do?sysparm_query=nameLIKEExpense'],['action','sys_hub_action_type_definition_list.do?sysparm_query=nameLIKEExpense'],['subflow','sys_hub_flow_list.do?sysparm_query=nameLIKEExpense^ORnameLIKEBudget^ORnameLIKECost Center'],['agent','sn_aia_agent_list.do?sysparm_query=nameLIKEForecast'],['table','sys_db_object_list.do?sysparm_query=nameLIKEx_snc_forecast_v_0'],['trigger','sn_aia_trigger_configuration_list.do?sysparm_query=nameLIKEExpense']];
for(const [k,q] of Q){await p.goto(u.H+'/'+q,{timeout:90000});await p.waitForTimeout(6000);await u.dismiss(p);
const t=await p.innerText('body');const m=t.match(/(\d+)\s*to\s*(\d+)\s*of\s*(\d+)/);console.log(k,m?m[0]:(/No records/.test(t)?'0':'?'));}
await b.close();})();
