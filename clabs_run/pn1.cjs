const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/stats.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
const t=await p.innerText('body');console.log(u.H,'|',(t.match(/Instance name:[^\n]*|Build name:[^\n]*|Build tag:[^\n]*/g)||[]).join(' | '));
await b.close();})();
