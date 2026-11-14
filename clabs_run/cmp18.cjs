const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const id of ['8021ddea2b0d52101d72fb466e91bfd1','bb8695d03b5e72900ad1a021a3e45ad4']){
await p.goto(u.H+'/sn_aia_tool.do?sys_id='+id,{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const o=await p.evaluate(()=>{const o={};g_form.elements.forEach(e=>{const n=e.fieldName.split('.').pop();try{o[n]=g_form.getDisplayValue?g_form.getDisplayValue(n)||g_form.getValue(n):g_form.getValue(n)}catch(x){}});return o;});
console.log('##',id.slice(0,6));for(const k of ['name','type','target_document_table','target_document','active','sys_scope','application','script'])console.log(' ',k,'=',String(o[k]).slice(0,100));}
await b.close();})();
