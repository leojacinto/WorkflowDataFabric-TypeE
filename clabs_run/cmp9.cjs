const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_dictionary_list.do?sysparm_query=name=sn_aia_agent_config^element=public',{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.locator('table.list_table tbody tr.list_row a.linked').first().click();await p.waitForTimeout(8000);
const o=await p.evaluate(()=>{const o={};g_form.elements.forEach(e=>{const n=e.fieldName.split('.').pop();try{o[n]=g_form.getValue(n)}catch(x){}});return o;});
for(const k of ['column_label','internal_type','default_value','comments','sys_scope','sys_package','sys_update_name'])console.log(k,'=',String(o[k]).slice(0,300));
await p.screenshot({path:u.S+'pub_dict.png',fullPage:true});
// scripts mentioning .public on agent config
await p.goto(u.H+'/sys_script_include_list.do?sysparm_query=scriptLIKEconfig.public^ORscriptLIKE"public"^nameSTARTSWITHAgent^ORnameLIKEAIA^script%20LIKEpublic',{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').slice(0,100)));console.log('SI',r.length);console.log(r.slice(0,15).join('\n'));
await b.close();})();
