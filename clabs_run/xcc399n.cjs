// XCC guide steps 1 to 6 on 399: scope Global, elevate ais_high_security_admin, XCC home, Create, pick SharePoint.
const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
 await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
 await p.mouse.click(1566,25);await p.waitForTimeout(4000);await p.screenshot({path:u.S+'xcc_a1_menu.png'});
 await p.getByText('Elevate role',{exact:true}).first().click({timeout:15000});await p.waitForTimeout(5000);await p.screenshot({path:u.S+'xcc_a2_elevate.png'});
 const rl=p.getByText('ais_high_security_admin',{exact:true}).first();const ok=await rl.waitFor({timeout:25000}).then(()=>true).catch(()=>false);console.log('role offered',ok);
 if(ok){const bb=await rl.boundingBox();await p.mouse.click(bb.x-16,bb.y+bb.height/2);await p.waitForTimeout(1000);await p.getByRole('button',{name:'Update',exact:true}).first().click({timeout:10000});await p.waitForTimeout(8000);}
 let ready=false;for(let i=0;i<4&&!ready;i++){await p.goto(u.H+'/now/external-content-connectors/home',{timeout:240000}).catch(()=>{});ready=await p.getByRole('button',{name:'Create',exact:true}).first().waitFor({timeout:150000}).then(()=>true).catch(()=>false);console.log('home attempt',i+1,ready);}
 await p.waitForTimeout(3000);await p.screenshot({path:u.S+'xcc_a3_home.png'});
 await p.getByRole('button',{name:'Create',exact:true}).first().click({timeout:30000});await p.waitForTimeout(10000);await p.screenshot({path:u.S+'xcc_a4_source.png'});
 await p.waitForTimeout(5000);await p.mouse.click(332,346);await p.waitForTimeout(1500);await p.mouse.click(332,346);await p.waitForTimeout(2500);await p.screenshot({path:u.S+'xcc_b0_selected.png'});console.log('next enabled:',await p.getByRole('button',{name:'Next'}).first().isEnabled());await p.getByRole('button',{name:'Next'}).first().click({timeout:20000,force:true});await p.waitForTimeout(50000);await p.screenshot({path:u.S+'xcc_b1_form.png'});
 const fs=require('fs');const E=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/.env','utf8').split(/\r?\n/);const after=re=>{const i=E.findIndex(l=>re.test(l.trim()));return i>=0?E[i+1].trim():'';};const JKSPW=after(/^JKS certificate password/i),THUMB=after(/^JKS certificate thumbprint/i);console.log('secrets found:',JKSPW.length>0,THUMB.length>0);
 const typeAt=async(x,y,t)=>{await p.mouse.click(x,y);await p.keyboard.press('Meta+A');await p.keyboard.type(t,{delay:15});};
 await typeAt(555,291,'SharePoint Online QB2');
 await typeAt(555,373,'26ec3997-e7da-4a95-91dd-d19f8c66b849');await typeAt(555,439,'53136633-b712-40ba-8c0b-0747745c05be');
 const [fc]=await Promise.all([p.waitForEvent('filechooser',{timeout:20000}),p.mouse.click(356,508)]);await fc.setFiles('/Users/leo.francia/WorkflowDataFabric-TypeE/ms-spo-connector-cert.jks');await p.waitForTimeout(6000);
 await p.screenshot({path:u.S+'xcc_c1_filled_nosecrets.png'});
 await p.waitForTimeout(6000);await typeAt(555,584,JKSPW);await typeAt(555,650,THUMB);await p.waitForTimeout(1500);await p.screenshot({path:u.S+'xcc_c1b_secrets_set.png'});
 await p.mouse.click(1497,865);await p.waitForTimeout(40000);await p.screenshot({path:u.S+'xcc_c2_validated.png'});
 await p.mouse.click(1550,865);await p.waitForTimeout(40000);await p.screenshot({path:u.S+'xcc_n1_crawlsettings.png'});
await p.screenshot({path:u.S+'xcc_a5_end.png'});
 await b.close();})();
