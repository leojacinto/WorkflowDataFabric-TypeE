const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_properties_list.do?sysparm_query=nameLIKEdoc_data_extractor^nameLIKEthreshold',{timeout:90000});await p.waitForTimeout(8000);await u.dismiss(p);
await p.screenshot({path:O+'ldi_threshold_search.png'});
const t=await p.innerText('body');console.log(t.match(/\d+ to \d+ of \d+/)?.[0]);
console.log(t.split('\n').filter(l=>/threshold/.test(l)).join('\n'));
await b.close();})();
