const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const OUT = '/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/sp/';
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/ais-preview-utility/preview`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(30000);
    await page.mouse.click(731, 86); await page.waitForTimeout(4000);
    await page.screenshot({ path: OUT + 'dd.png' });
    console.log((await page.evaluate(() => [...document.querySelectorAll('[role=option],[role=menuitem],li')].filter(e => e.offsetParent).map(e => e.textContent.trim()).filter(Boolean).slice(0, 40).join(' | '))));
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
