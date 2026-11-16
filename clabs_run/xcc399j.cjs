const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
 let ready=false;for(let i=0;i<4&&!ready;i++){await p.goto(u.H+'/now/external-content-connectors/home',{timeout:240000}).catch(()=>{});ready=await p.getByRole('button',{name:'Create',exact:true}).first().waitFor({timeout:150000}).then(()=>true).catch(()=>false);}
 await p.waitForTimeout(3000);
 p.on('response',r=>{const x=r.url();if(/repair|plugin/i.test(x)&&!/\.(js|css|png|svg)/.test(x))console.log('NET',r.request().method(),r.status(),x.slice(0,150));});
 await p.getByRole('button',{name:/Repair\s*plugin/i}).first().click({timeout:20000});await p.waitForTimeout(15000);
 for(const [i,pg] of p.context().pages().entries()){console.log('page',i,pg.url().slice(0,150));await pg.screenshot({path:u.S+'xcc_j_page'+i+'.png'});}
 await b.close();})();
