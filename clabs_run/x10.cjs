const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
for(let i=0;i<5;i++){await p.goto(u.H+'/now/external-content-connectors/home',{timeout:240000});await p.waitForTimeout(40000);
const t=(await p.innerText('body')).replace(/\n+/g,' | ');const m=t.match(/Total documents \| ([\d,]+)/);console.log(new Date().toISOString().slice(11,19),'total docs',m&&m[1],'| in progress',(t.match(/Crawl in progress/g)||[]).length,'| completed',(t.match(/Completed|Crawl complete/g)||[]).length);
await p.screenshot({path:u.S+'x10_'+i+'.png'});await p.waitForTimeout(150000);}
await b.close();})();
