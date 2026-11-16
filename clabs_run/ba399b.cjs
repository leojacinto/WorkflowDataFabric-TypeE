const fs=require('fs');
const path='/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/';
const H=require(path+'human.cjs'),B=require(path+'buildagent.cjs');
const S='/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/';
(async()=>{const {browser,page}=await H.openBrowser();
const prompt=fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit/e2e/prompts/ihub1.txt','utf8').replace(/<your initials>/g,'QB');
await B.openStudio(page);await B.sendPrompt(page,prompt);await page.waitForTimeout(120000);
await page.screenshot({path:S+'ba399b_a.png'});
for(const [i,f] of page.frames().entries()){const r=await f.evaluate(()=>{const out=[];const walk=(root,d)=>{for(const e of root.querySelectorAll('*')){if(e.shadowRoot)walk(e.shadowRoot,d+1);if(/^Approve plan$/.test((e.textContent||'').trim())&&e.children.length<=2)out.push(e.tagName+'.'+(e.className||'').toString().slice(0,40)+' vis:'+(e.offsetParent!==null)+' d:'+d);}};walk(document,0);return out.slice(0,4);}).catch(()=>['err']);console.log('frame',i,f.url().slice(0,60),JSON.stringify(r));}
await page.waitForTimeout(90000);await page.screenshot({path:S+'ba399b_b.png'});
await browser.close();})();
