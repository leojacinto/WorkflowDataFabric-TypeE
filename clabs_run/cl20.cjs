// List (DRY=1) or delete records of TABLE matching QUERY on 7021 via the classic form Delete button
const u=require('./u7021.cjs');
const T=process.env.TABLE,Q=process.env.QUERY,DRY=process.env.DRY==='1';
(async()=>{const {b,p}=await u.open();
for(let n=0;n<20;n++){
 await p.goto(u.H+'/'+T+'_list.do?sysparm_query='+encodeURIComponent(Q),{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
 const links=p.locator('a.linked');const c=await links.count();
 if(!c){console.log(T,'none left');break;}
 await links.first().click();await p.waitForTimeout(7000);
 const info=await p.evaluate(()=>{try{return (g_form.getValue('name')||'')+' | '+g_form.getValue('sys_id')+' | scope '+g_form.getValue('sys_scope')}catch(e){return 'noform'}});
 console.log(T,info);
 if(DRY){ if(n>=0&&c>1){console.log('rows',c);} break;}
 await p.getByRole('button',{name:'Delete',exact:true}).first().click();await p.waitForTimeout(3000);
 const dlg=p.getByRole('button',{name:'Delete',exact:true});await dlg.last().click();await p.waitForTimeout(6000);
}
await b.close();})();
