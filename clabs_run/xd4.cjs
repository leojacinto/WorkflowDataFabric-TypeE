const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/external-content-connectors/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(25000);await u.dismiss(p);
for(let i=1;i<=12;i++){
 const link=p.getByRole('link',{name:/^SharePoint Online/}).first();
 if(!(await link.count())){console.log('no more');break;}
 const name=(await link.innerText()).trim();const bb=await link.boundingBox();
 await p.mouse.click(1165,Math.round(bb.y+bb.height/2));await p.waitForTimeout(1500);
 const del=p.getByText('Delete',{exact:true});
 await del.last().click();await p.waitForTimeout(2500);
 await p.screenshot({path:u.S+'xd4_dlg.png'});break;const conf=p.getByRole('button',{name:'Delete'});console.log('confirm btns',await conf.count());
 await conf.last().click();await p.waitForTimeout(8000);
 console.log('deleted',name);
 await p.screenshot({path:u.S+'xd3_'+i+'.png'});
}
await b.close();})();
