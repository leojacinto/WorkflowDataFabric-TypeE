const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/x_snc_lf_cr_summ_0_mcp_guide.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);
await p.evaluate(()=>{const e=document.getElementById('1-3-write-the-prompt-save-and-finalize')||[...document.querySelectorAll('h1,h2,h3,h4')].find(x=>/write the prompt/i.test(x.innerText));if(e)e.scrollIntoView();});await p.waitForTimeout(3000);
await p.screenshot({path:u.S+'ps1_ref.png'});
const css=await p.evaluate(()=>{const pre=[...document.querySelectorAll('pre,code')].map(e=>{const c=getComputedStyle(e);return e.tagName+' bg:'+c.backgroundColor+' color:'+c.color+' font:'+c.fontFamily.slice(0,40)+' size:'+c.fontSize+' pad:'+c.padding+' radius:'+c.borderRadius}).slice(0,6);return pre;});console.log(css);
await b.close();})();
