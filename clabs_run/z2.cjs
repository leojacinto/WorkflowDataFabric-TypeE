const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_erp_integration_model_list.do?sysparm_query=nameLIKECost^ORsys_nameLIKECost',{timeout:90000});await p.waitForTimeout(8000);await u.dismiss(p);
const t=await p.innerText('body');console.log(t.match(/\d+ to \d+ of \d+/)?.[0]);
console.log(t.split('\n').filter(l=>/Cost Center/i.test(l)).slice(0,10).join('\n'));
await b.close();})();
