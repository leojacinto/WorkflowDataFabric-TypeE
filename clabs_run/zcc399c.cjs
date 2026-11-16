const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/wdf/connections/77c3ed5d4714db54037d0fadf26d4389?tabId=connection-details',{timeout:90000}).catch(()=>{});await p.waitForTimeout(25000);
const r=await p.evaluate(()=>{const out=[];const walk=root=>{for(const e of root.querySelectorAll('*')){if(e.shadowRoot)walk(e.shadowRoot);const v=(e.value||e.textContent||'').toString();if(/^jdbc:postgresql:/.test(v.trim())&&v.length<400)out.push(v.trim());}};walk(document);return [...new Set(out)];});
console.log(JSON.stringify(r));
await b.close();})();
