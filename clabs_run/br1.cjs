const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_dictionary_list.do?sysparm_query='+encodeURIComponent('name=x_snc_forecast_v_0_expense_transaction_event^elementLIKEowner'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.screenshot({path:u.S+'br1_a.png',clip:{x:0,y:0,width:1600,height:300}});
await p.goto(u.H+'/sys_script_list.do?sysparm_query='+encodeURIComponent('nameLIKESet Expense Event Owner'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'br1_b.png',clip:{x:0,y:0,width:1600,height:300}});
await b.close();})();
