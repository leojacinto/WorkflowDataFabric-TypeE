const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/stats.do',{timeout:90000});await p.waitForTimeout(3000);
console.log((await p.innerText('body')).split('\n').filter(l=>/Build (name|tag|date)|Instance|Zurich|Australia|Yokohama|Brazil/i.test(l)).slice(0,6).join('\n'));
await p.screenshot({path:'/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/fund_stats.png'});
await b.close();})();
