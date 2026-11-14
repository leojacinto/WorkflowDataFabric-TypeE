const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/external-content-connectors/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(25000);await u.dismiss(p);
for(let i=1;i<=3;i++){
 const bb=await p.getByRole('link',{name:/^SharePoint Online \d+$/}).nth(i-1).boundingBox();
 await p.mouse.click(1165,Math.round(bb.y+bb.height/2));await p.waitForTimeout(1500);
 await p.getByText('Deactivate',{exact:true}).last().click();await p.waitForTimeout(3000);
 await p.screenshot({path:u.S+'xd5_'+i+'.png'});
 const ok=p.getByRole('button',{name:/Deactivate|Confirm|Yes/});console.log('btns',await ok.count());
 if(await ok.count())await ok.last().click();await p.waitForTimeout(6000);
}
await p.screenshot({path:u.S+'xd5_end.png'});
await b.close();})();
