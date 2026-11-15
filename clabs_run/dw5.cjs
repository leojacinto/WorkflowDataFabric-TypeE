const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_outbound_http_log_list.do?sysparm_query='+encodeURIComponent('urlLIKEdeepwiki^created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^ORDERBYsequence'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
const ids=await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>x.getAttribute('sys_id')));console.log(ids.length);
let i=0;for(const id of ids.slice(-6)){i++;await p.goto(u.H+'/sys_outbound_http_log.do?sys_id='+id,{timeout:90000}).catch(()=>{});await p.waitForTimeout(5000);
const t=await p.evaluate(()=>['sequence','http_method','url','response_status','response_time','request_headers','request_body','response_headers','response_body','error_message'].map(f=>{try{return f+'='+String(g_form.getValue(f)).slice(0,500)}catch(e){return f+'=?'}}).join('\n'));console.log('-----',i,'\n'+t);}
await b.close();})();
