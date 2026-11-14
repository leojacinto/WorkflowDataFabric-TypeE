const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
const id='35b5bb183bda365062f31831a3e45aa1';
for(const [i,path] of ['/$flow-designer.do?sysparm_nostack=true#/flow-designer/'+id,'/$flow-designer.do#/subflow-designer/'+id].entries()){
await p.goto(u.H+path,{timeout:90000}).catch(()=>{});await p.waitForTimeout(25000);await u.dismiss(p);
const t=await p.innerText('body').catch(()=>'');console.log(i,/Asset not found/.test(t)?'notfound':'ok',/Test/.test(t));
await p.screenshot({path:u.S+'c4_'+i+'.png'});}
await b.close();})();
