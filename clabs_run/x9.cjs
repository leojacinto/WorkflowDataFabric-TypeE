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
await page.mouse.click(332,347);await page.waitForTimeout(2000);await shot('02b_selected');await page.mouse.click(1550,965);await page.waitForTimeout(10000);await page.waitForTimeout(40000);
const nx=lab=>{const i=L.findIndex(l=>l.toLowerCase().includes(lab));return (L[i].includes(':')&&L[i].split(':').slice(1).join(':').trim())||L[i+1];};const JKSPW=nx('jks certificate password'),THUMB=nx('jks certificate thumbprint');console.log('pw len',JKSPW.length,'thumb len',THUMB.length);
const typeAt=async(x,y,t)=>{await page.mouse.click(x,y);await page.keyboard.press('Meta+A');await page.keyboard.type(t,{delay:15});};
await typeAt(555,291,'SharePoint Online LF');
await typeAt(555,373,'26ec3997-e7da-4a95-91dd-d19f8c66b849');await typeAt(555,439,'53136633-b712-40ba-8c0b-0747745c05be');
const [fc]=await Promise.all([page.waitForEvent('filechooser',{timeout:20000}),page.mouse.click(365,508)]);await fc.setFiles('/Users/leo.francia/WorkflowDataFabric-TypeE/ms-spo-connector-cert.jks');await page.waitForTimeout(6000);
await typeAt(555,584,JKSPW);await typeAt(555,650,THUMB);await page.waitForTimeout(1500);

await page.mouse.click(1497,965);await page.waitForTimeout(40000);console.log('validated');
const step=async n=>{await page.waitForTimeout(8000);await shot(n);console.log(n+': '+(await page.evaluate(()=>document.body.innerText.slice(0,500))).replace(/\s+/g,' ').slice(0,420));};
await page.mouse.click(1550,965);await step('21_next1');
await page.mouse.click(1550,965);await step('22_next2');
await page.mouse.click(1550,965);await step('23_next3');
await page.mouse.click(362,486);await page.waitForTimeout(1000);await shot('24_crawl_opts');await page.mouse.click(1550,965);await page.waitForTimeout(60000);await step('25_after_crawl_next');
await page.mouse.click(955,379);await page.keyboard.type('Forecast Variance',{delay:40});await page.waitForTimeout(4000);await shot('26_profile_typed');await page.mouse.click(955,420);await page.waitForTimeout(1500);await shot('27_profile_picked');await page.mouse.click(1210,379);await page.waitForTimeout(4000);await shot('28_added');


await page.mouse.click(1550,965);await page.waitForTimeout(20000);await shot('29_saved');console.log('saved');
await page.waitForTimeout(540000);
await page.goto(H+'/now/external-content-connectors/home',{waitUntil:'domcontentloaded',timeout:240000});await page.waitForTimeout(30000);await shot('30_home_after_wait');
console.log((await page.innerText('body')).replace(/\n+/g,' | ').slice(0,900));
await page.goto(H+'/now/ais-preview-utility/preview',{waitUntil:'domcontentloaded',timeout:240000});await page.waitForTimeout(45000);await shot('31_preview');
}catch(e){console.log('ERR '+e.message.split('\n')[0]);await shot('err').catch(()=>{});}
await browser.close();})();
