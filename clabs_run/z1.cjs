const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(const q of ['sn_erp_integration_model_list.do?sysparm_query=labelLIKESAP Cost Center','sn_erp_integration_model_list.do?sysparm_query=labelLIKECP: Cost Center']){
await p.goto(u.H+'/'+q,{timeout:90000});await p.waitForTimeout(7000);await u.dismiss(p);
console.log(q,(await p.innerText('body')).match(/\d+ to \d+ of \d+/)?.[0]||'none');
console.log((await p.innerText('body')).split('\n').filter(l=>/Cost Center|S4D|Lab/.test(l)).slice(0,8).join(' | '));}
await p.screenshot({path:u.S+'z1.png'});
await b.close();})();
