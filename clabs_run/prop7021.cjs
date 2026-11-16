const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_properties_list.do?sysparm_query='+encodeURIComponent('name=cl.enable_aislabadmin^ORname=sn_erp_integration.enableModelModification^ORname=glide.inbound_integration_metering.customer_integration_filters.disabled'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const ids=await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.getAttribute('sys_id')));console.log(ids);
for(const id of ids){await p.goto(u.H+'/sys_properties.do?sys_id='+id,{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
 console.log(id,await p.evaluate(()=>['name','value','type','sys_scope','suffix','is_private','description'].map(f=>{try{return f+'='+g_form.getValue(f)}catch(e){return f+'=?'}}).join(' | ')));}
await b.close();})();
