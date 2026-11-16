// Delete the extra SharePoint connectors that my failed attempts created (by exact name, dialog text verified). Keeps SharePoint Online QB2.
const u=require('./u7021.cjs');
const NAMES=['SharePoint Online 3','SharePoint Online QB','SharePoint Online 4','SharePoint Online'];
(async()=>{const {b,p}=await u.open();
 for(const NAME of NAMES){
  let ready=false;for(let i=0;i<4&&!ready;i++){await p.goto(u.H+'/now/external-content-connectors/home',{timeout:240000}).catch(()=>{});ready=await p.getByRole('button',{name:'Create',exact:true}).first().waitFor({timeout:150000}).then(()=>true).catch(()=>false);}
  await p.waitForTimeout(5000);
  const els=await p.getByText(NAME,{exact:true}).all();let target=null;for(const e of els){const bb=await e.boundingBox();if(bb&&bb.x<150&&bb.y>440){target=bb;break;}}
  if(!target){console.log('not found',NAME);continue;}
  await p.mouse.click(1165,target.y+target.height/2);await p.waitForTimeout(2500);await p.mouse.click(1195,target.y+target.height/2+126);await p.waitForTimeout(4000);
  const ok=await p.getByText('Connector '+NAME+' will be deleted').count();
  if(!ok){console.log('dialog text mismatch for',NAME);await p.screenshot({path:u.S+'xcc_v_mismatch.png'});continue;}
  await p.mouse.click(549,484);await p.waitForTimeout(800);await p.mouse.click(1001,528);await p.waitForTimeout(15000);console.log('deleted',NAME);}
 await p.goto(u.H+'/now/external-content-connectors/home',{timeout:240000}).catch(()=>{});await p.getByRole('button',{name:'Create',exact:true}).first().waitFor({timeout:150000}).catch(()=>{});await p.waitForTimeout(5000);await p.screenshot({path:u.S+'xcc_v_after.png'});
 await b.close();})();
