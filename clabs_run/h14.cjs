const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/servicenow-ai-lens/home/8a05bbd99d289b107f44c3f1c075dbfc',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.mouse.click(677,480);await p.waitForTimeout(5000);
await p.screenshot({path:u.S+'h14_a.png'});
const n=await p.evaluate(()=>{const r=[];const w=(root)=>{root.querySelectorAll('*').forEach(e=>{if(e.tagName==='INPUT'&&e.type==='file')r.push(e.outerHTML.slice(0,120));if(e.shadowRoot)w(e.shadowRoot)})};w(document);return r});console.log(n);
await b.close();})();
