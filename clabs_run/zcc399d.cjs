const u=require('./u7021.cjs');const fs=require('fs');
const env=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/.env','utf8').split('\n');
const line=env.find(l=>/^Neon wdf_lab_reader password/i.test(l));const PW=line.slice(line.indexOf(':')+1).trim();
const URL_='jdbc:postgresql://ep-crimson-fog-augocrge.c-10.us-east-1.aws.neon.tech:5432/neondb?ssl=true&sslmode=require';
const CONN=u.H+'/now/wdf/connections/77c3ed5d4714db54037d0fadf26d4389?tabId=connection-details';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.goto(u.H+'/now/nav/ui/home',{timeout:90000}).catch(()=>{});await p.waitForTimeout(20000);await u.dismiss(p);
await p.mouse.click(1319,25);await p.waitForTimeout(8000);await p.getByText(/^Application scope:/).first().click();await p.waitForTimeout(8000);
await p.getByPlaceholder('Filter').first().fill('Forecast Variance');await p.waitForTimeout(4000);await p.mouse.click(1237,158);await p.waitForTimeout(8000);
await p.goto(CONN,{timeout:90000}).catch(()=>{});await p.waitForTimeout(25000);
const eb=p.getByRole('button',{name:'Edit'}).first();console.log('edit disabled?',await eb.isDisabled().catch(()=>'n/a'));
if(!(await eb.isDisabled().catch(()=>true))){
 await eb.click();await p.waitForTimeout(4000);
 await p.getByLabel('Username').first().fill('wdf_lab_reader').catch(e=>console.log('user fill',e.message.slice(0,60)));
 await p.getByLabel('Password').first().fill(PW).catch(e=>console.log('pw fill',e.message.slice(0,60)));
 await p.getByLabel('Connection URL').first().fill(URL_).catch(e=>console.log('url fill',e.message.slice(0,60)));
 await p.screenshot({path:u.S+'zcc399d_filled.png'});
 await p.keyboard.press('Tab');await p.waitForTimeout(2000);
 await p.getByText('Save and connect').first().scrollIntoViewIfNeeded().catch(()=>{});await p.getByText('Save and connect').first().click({timeout:15000,force:true}).catch(e=>console.log('save',e.message.slice(0,80)));await p.waitForTimeout(5000);await p.getByText('Continue',{exact:true}).first().click({timeout:10000}).catch(e=>console.log('continue',e.message.slice(0,60)));await p.waitForTimeout(40000);
}
await p.screenshot({path:u.S+'zcc399d_result.png'});
await b.close();})();
