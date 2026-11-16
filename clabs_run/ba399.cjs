const path='/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/';
const H=require(path+'human.cjs'),B=require(path+'buildagent.cjs');
(async()=>{const {browser,page}=await H.openBrowser();
await B.openStudio(page);
await page.getByText(/x_snc_forecast_v_0: In the Foreca/).first().click().catch(e=>console.log('no conv',e.message.slice(0,60)));await page.waitForTimeout(8000);
for(const [i,f] of page.frames().entries()){const n1=await f.getByText('Approve plan').count().catch(()=>-1);const n2=await f.getByRole('button',{name:'Approve plan'}).count().catch(()=>-1);console.log('frame',i,f.url().slice(0,70),'text',n1,'role',n2);}
await page.screenshot({path:'/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/ba399_a.png'});
await browser.close();})();
