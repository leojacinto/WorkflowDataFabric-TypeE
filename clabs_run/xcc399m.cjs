const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
 let ready=false;for(let i=0;i<4&&!ready;i++){await p.goto(u.H+'/now/external-content-connectors/home',{timeout:240000}).catch(()=>{});ready=await p.getByRole('button',{name:'Create',exact:true}).first().waitFor({timeout:150000}).then(()=>true).catch(()=>false);}
 await p.waitForTimeout(4000);await p.screenshot({path:u.S+'xcc_k1_home.png'});
 await p.getByText('SharePoint Online 4',{exact:true}).first().click({timeout:20000});await p.waitForTimeout(25000);await p.screenshot({path:u.S+'xcc_k2_health.png'});
 await p.mouse.click(840,186);await p.waitForTimeout(20000);await p.screenshot({path:u.S+'xcc_m1_settings.png'});
 await b.close();})();
