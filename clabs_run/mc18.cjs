const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_outbound_http_log_list.do?sysparm_query='+encodeURIComponent('urlLIKEneon.tech^ORDERBYDESCsys_created_on'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(9000);
for(const t of ['2026-11-14 13:16:46','2026-11-14 00:38:33','2026-11-13 22:10:32']){const l=p.getByText(t,{exact:true}).first();await l.click();await p.waitForTimeout(7000);console.log(t,await p.evaluate(()=>{const g=n=>{try{return g_form.getValue(n)}catch(e){return '?'}};return g('url')+' | '+g('http_method')+' | '+g('response_status')}));await p.goBack();await p.waitForTimeout(6000);}
await b.close();})();
