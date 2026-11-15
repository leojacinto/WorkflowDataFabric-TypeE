const u=require('./u7021.cjs');
const T=['etl_extraction_source','model_crud','model_entity','model_func_input','model_func_output','model_func_output_aggregate','model_func_output_field','model_operation','model_operation_input','model_operation_input_mapping','model_operation_output','model_repeat_condition','model_repeat_replace','model_software','model_table_field','model_table_join','model_table_join_condition','model_test','model_version','remote_table'];
(async()=>{const {b,p}=await u.open();
for(const t of T){const tn='sn_erp_integration_'+t;
await p.goto(u.H+'/'+tn+'_list.do?sysparm_query='+encodeURIComponent('modelISNOTEMPTY^model.sys_idISEMPTY'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(4500);
const n=await p.locator('tr.list_row').count();const bad=await p.locator('text=/Invalid table|does not exist/i').count();
console.log(tn,n,bad?'(table?)':'');}
await b.close();})();
