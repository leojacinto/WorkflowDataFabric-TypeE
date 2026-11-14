const fs=require('fs');const {chromium}=require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit/node_modules/playwright-core');
const OUT=__dirname+'/xcc7021/';
const L=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/.env','utf8').split(/\r?\n/).map(s=>s.trim());
const H='https://lef-nov-7021-0001.lab.service-now.com';
(async()=>{const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1600,height:1000}});
const shot=async n=>page.screenshot({path:OUT+n+'.png'});
try{
await page.goto(H+'/login.do',{timeout:90000});await page.fill('#user_name',L[14]);await page.fill('#user_password',L[15]);await page.click('#sysverb_login');await page.waitForTimeout(8000);
await page.goto(H+'/now/nav/ui/home',{waitUntil:'domcontentloaded',timeout:90000});await page.waitForTimeout(15000);
await page.mouse.click(1566,25);await page.waitForTimeout(4000);
await page.getByText('Elevate role',{exact:true}).first().click({timeout:15000});
const rl=page.getByText('ais_high_security_admin',{exact:true}).first();
const offered=await rl.waitFor({timeout:60000}).then(()=>true).catch(()=>false);console.log('role offered',offered);
if(offered){await page.waitForTimeout(2000);const bb=await rl.boundingBox();await page.mouse.click(bb.x-16,bb.y+bb.height/2);await page.waitForTimeout(1000);await page.getByRole('button',{name:'Update',exact:true}).first().click({timeout:10000});await page.waitForTimeout(8000);}
await shot('01_elevated');
await page.goto(H+'/now/external-content-connectors/home',{waitUntil:'domcontentloaded',timeout:240000});await page.waitForTimeout(25000);
await page.getByRole('button',{name:'Create',exact:true}).first().click({timeout:30000});await page.waitForTimeout(8000);await shot('02_create');
await page.mouse.click(332,347);await page.waitForTimeout(2000);await shot('02b_selected');await page.mouse.click(1550,965);await page.waitForTimeout(10000);await page.waitForTimeout(40000);await shot('03_form_later');console.log((await page.innerText('body')).replace(/\n+/g,' | ').slice(0,700));
}catch(e){console.log('ERR '+e.message.split('\n')[0]);await shot('err').catch(()=>{});}
await browser.close();})();
