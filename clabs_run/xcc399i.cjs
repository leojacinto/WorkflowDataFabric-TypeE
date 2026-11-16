const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
 await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
 await p.mouse.click(1566,25);await p.waitForTimeout(4000);await p.getByText('Elevate role',{exact:true}).first().click({timeout:15000});
 const rl=p.getByText('ais_high_security_admin',{exact:true}).first();const off=await rl.waitFor({timeout:15000}).then(()=>true).catch(()=>false);console.log('elevate offered',off);if(off){const bb=await rl.boundingBox();await p.mouse.click(bb.x-16,bb.y+bb.height/2);await p.waitForTimeout(1000);await p.getByRole('button',{name:'Update',exact:true}).first().click({timeout:10000});await p.waitForTimeout(8000);}
 let ready=false;for(let i=0;i<4&&!ready;i++){await p.goto(u.H+'/now/external-content-connectors/home',{timeout:240000}).catch(()=>{});ready=await p.getByRole('button',{name:'Create',exact:true}).first().waitFor({timeout:150000}).then(()=>true).catch(()=>false);}
 await p.waitForTimeout(3000);await p.screenshot({path:u.S+'xcc_e1_home.png'});
 await p.getByText('SharePoint Online 4',{exact:true}).first().click({timeout:20000});await p.waitForTimeout(30000);await p.screenshot({path:u.S+'xcc_e2_open.png'});
 await p.waitForTimeout(8000);await p.waitForTimeout(8000);await p.mouse.click(633,445);await p.waitForTimeout(6000);await p.mouse.click(1113,681);await p.waitForTimeout(8000);await p.screenshot({path:u.S+'xcc_h1_repair_click.png'});
 await p.waitForTimeout(120000);await p.screenshot({path:u.S+'xcc_h2_after_repair.png'});
 await b.close();})();
