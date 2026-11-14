const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_app_module_list.do?sysparm_query=titleLIKEZero Copy Connector for ERP Home&sysparm_fields=title,link_type,uib_page,query,name',{timeout:90000});await p.waitForTimeout(8000);await u.dismiss(p);
const a=await p.evaluate(()=>[...document.querySelectorAll('a')].map(x=>x.getAttribute('href')||'').filter(x=>/sys_app_module.do/.test(x)).slice(0,1));
console.log(a);
if(a[0]){await p.goto(u.H+'/'+a[0],{timeout:90000});await p.waitForTimeout(8000);console.log((await p.innerText('body')).split('\n').filter(l=>/Link type|Arguments|Workspace|Application menu|Name|Query|URL|Page/.test(l)).slice(0,14).join(' | '));}
await b.close();})();
