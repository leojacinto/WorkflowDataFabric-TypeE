const u=require('./u7021.cjs');
async function rows(p,tn,q){await p.goto(u.H+'/'+tn+'_list.do?sysparm_query='+encodeURIComponent(q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(3500);
 const t=await p.locator('text=/to \\d+ of \\d+/').first().innerText().catch(()=>'');const m=t.match(/of (\d+)/);return m?+m[1]:(await p.locator('tr.list_row').count());}
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_dictionary_list.do?sysparm_query='+encodeURIComponent('reference=sn_erp_integration_model_entity^internal_type=reference'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
const refs=await p.locator('tr.list_row').evaluateAll(r=>r.map(x=>[...x.querySelectorAll('td')].map(c=>c.innerText.trim()).filter(Boolean)));
const pairs=refs.map(r=>({t:r.find(c=>/^sn_erp_integration_/.test(c)),f:r.find(c=>/^[a-z_]+$/.test(c)&&!/^sn_erp/.test(c)&&c!=='reference')})).filter(x=>x.t&&x.f);
console.log('reference fields to entity:',pairs.map(x=>x.t.replace('sn_erp_integration_','')+'.'+x.f).join(', '));
for(const x of pairs){const n=await rows(p,x.t,x.f+'ISNOTEMPTY^'+x.f+'.model.sys_idISEMPTY^model.name=SAP Cost Center Lab');console.log('kept-model rows pointing to orphan entity:',x.t.replace('sn_erp_integration_',''),x.f,n);}
await b.close();})();
