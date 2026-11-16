const {chromium}=require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit/node_modules/playwright-core');
(async()=>{const b=await chromium.launch({headless:true});const p=await b.newPage({viewport:{width:1400,height:800}});
await p.goto('https://lef-nov-7021-0001.lab.service-now.com/login.do',{timeout:90000});await p.waitForTimeout(15000);
await p.getByText('Wake',{exact:true}).first().click();await p.waitForTimeout(5000);console.log((await p.locator('body').innerText()).slice(0,300));await p.screenshot({path:'/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/vc2.png'});await b.close();})();
