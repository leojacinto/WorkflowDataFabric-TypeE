const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
 let ready=false;for(let i=0;i<4&&!ready;i++){await p.goto(u.H+'/now/external-content-connectors/home',{timeout:240000}).catch(()=>{});ready=await p.getByRole('button',{name:'Create',exact:true}).first().waitFor({timeout:150000}).then(()=>true).catch(()=>false);}
 await p.waitForTimeout(4000);await p.screenshot({path:u.S+'xcc_k1_home.png'});
 await p.getByText('SharePoint Online QB2',{exact:true}).first().click({timeout:20000});await p.getByText('Connector health').first().waitFor({timeout:120000}).catch(()=>{});await p.waitForTimeout(10000);await p.screenshot({path:u.S+'xcc_k2_health.png'});
 await p.mouse.click(216,186);await p.waitForTimeout(30000);await p.screenshot({path:u.S+'xcc_q1_crawls.png'});
 await p.mouse.click(1119,274);await p.waitForTimeout(12000);await p.screenshot({path:u.S+'xcc_r1_crawl_dialog.png'});
 await b.close();})();
