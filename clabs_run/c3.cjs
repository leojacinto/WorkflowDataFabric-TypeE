const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_hub_flow_list.do?sysparm_query=name=Get Expense Event',{timeout:90000});await p.waitForTimeout(6000);await u.dismiss(p);
const h=await p.evaluate(()=>[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')||'').filter(x=>/sys_id/.test(x)).slice(0,3));console.log(h);const m=(h[0]||'').match(/sys_id[=%3D]+([0-9a-f]{32})/i);const id=m&&m[1];console.log('id',id);
await p.goto(u.H+'/now/workflow-studio/builder?flowSysId='+id+'&type=subflow',{timeout:90000}).catch(()=>{});
await p.waitForTimeout(30000);await u.dismiss(p);
await p.screenshot({path:u.S+'c3.png'});console.log(p.url());
await b.close();})();
