const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_properties_list.do?sysparm_query=nameLIKEdoc_data_extractor^nameLIKEthreshold',{timeout:90000});await p.waitForTimeout(8000);await u.dismiss(p);
const hrefs=await p.evaluate(()=>[...new Set([...document.querySelectorAll('a')].map(a=>a.getAttribute('href')||'').filter(x=>/^sys_properties\.do\?sys_id=/.test(x)))]);
console.log(hrefs.length);
for(const h of hrefs){await p.goto(u.H+'/'+h,{timeout:90000});await p.waitForTimeout(6000);await u.dismiss(p);
const name=await p.inputValue('#sys_properties\\.name').catch(()=>'?');
const val=p.locator('#sys_properties\\.value');await val.fill('0.01');
await p.screenshot({path:u.S+'l2_'+name.split('.').pop()+'.png'});
await p.locator('#sysverb_update').first().click();await p.waitForTimeout(6000);console.log(name,'set');}
await b.close();})();
