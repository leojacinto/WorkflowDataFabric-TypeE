const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/erp-integration/erp-models',{timeout:90000});await p.waitForTimeout(25000);
for(const [x,y] of [[1062,357],[983,533]]){await p.mouse.click(x,y);await p.waitForTimeout(2000);}
const l=p.getByText('CP: Cost Center',{exact:true});
for(let i=0;i<40&&!(await l.count());i++){await p.mouse.move(700,600);await p.mouse.wheel(0,500);await p.waitForTimeout(600);}
console.log('found',await l.count());console.log((await p.innerText('body')).split('\n').filter(x=>/^(CP|SAP|Cost)/i.test(x.trim())).join(' | '));
if(await l.count()){await l.first().click();await p.waitForTimeout(8000);await p.screenshot({path:O+'zcc_clone_popup.png'});}
await b.close();})();
