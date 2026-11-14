const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/classic/params/target/'+encodeURIComponent('sys_hub_flow_list.do?sysparm_query=sys_scope.scope=x_snc_forecast_v_0'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);
let r='none';for(const f of p.frames()){try{const x=await f.evaluate(()=>{const hs=[...document.querySelectorAll('th')].map(t=>t.innerText.trim());if(!hs.length)return null;const i=hs.findIndex(h=>/^internal name/i.test(h));const n=hs.findIndex(h=>/^name/i.test(h));return JSON.stringify({hs:hs.slice(0,40),i,n,rows:[...document.querySelectorAll('tr.list_row')].map(tr=>{const c=[...tr.querySelectorAll('td')];return [c[n]&&c[n].innerText.trim(),c[i]&&c[i].innerText.trim()]})})});if(x){r=x;break}}catch(e){}}
console.log(r);
await b.close();})();
