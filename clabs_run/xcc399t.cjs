// Open the kebab menu of the connector row named NAME on the XCC home (does not click delete).
const u=require('./u7021.cjs');const NAME=process.env.NAME;
(async()=>{const {b,p}=await u.open();
 let ready=false;for(let i=0;i<4&&!ready;i++){await p.goto(u.H+'/now/external-content-connectors/home',{timeout:240000}).catch(()=>{});ready=await p.getByRole('button',{name:'Create',exact:true}).first().waitFor({timeout:150000}).then(()=>true).catch(()=>false);}
 await p.waitForTimeout(5000);
 const row=p.getByText(NAME,{exact:true}).first();const bb=await row.boundingBox();console.log('row y',bb&&bb.y);
 await p.mouse.click(1165,bb.y+bb.height/2);await p.waitForTimeout(3000);await p.screenshot({path:u.S+'xcc_t1_menu.png'});
 await b.close();})();
