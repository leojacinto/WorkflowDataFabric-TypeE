const u=require('./u7021h.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/servicenow-ai-lens/home/8a05bbd99d289b107f44c3f1c075dbfc',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.getByRole('button',{name:'Upload'}).first().click();await p.waitForTimeout(3000);
await p.getByRole('button',{name:'Next'}).first().click();await p.waitForTimeout(10000);
await p.screenshot({path:u.S+'h27_0.png'});
console.log('analyze btn',await p.getByRole('button',{name:'Analyze'}).count());
await p.getByRole('button',{name:'Analyze'}).first().click();
for(let i=1;i<=16;i++){await p.waitForTimeout(15000);await p.screenshot({path:u.S+'h27_'+i+'.png'});
 const pgs=p.context().pages();if(pgs.length>1){console.log('new page');break;}}
await b.close();})();
