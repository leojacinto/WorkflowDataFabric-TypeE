const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const OUT = '/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/sp/';
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/ais-preview-utility/preview`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(30000);
    await page.mouse.click(410, 86); await page.waitForTimeout(3000); await page.screenshot({ path: OUT + 'pt.png' });
    await page.mouse.click(409, 173); await page.waitForTimeout(4000);
    await page.screenshot({ path: OUT + 'tv.png' });
    // open the profile list
    await page.mouse.click(731, 86); await page.waitForTimeout(3000);
    await page.keyboard.type('sharepoint', { delay: 40 }); await page.waitForTimeout(2500);
    await page.mouse.click(716, 149); await page.waitForTimeout(3000);
    await page.mouse.click(880, 87); await page.keyboard.type('***', { delay: 30 }); await page.keyboard.press('Enter'); await page.waitForTimeout(40000); await page.mouse.click(1078, 93).catch(() => {}); await page.waitForTimeout(3000);
    await page.screenshot({ path: OUT + 'result.png' });
    console.log((await page.evaluate(() => document.body.innerText.slice(0, 1500))).replace(/\n+/g, ' | '));
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); await page.screenshot({ path: OUT + 'err.png' }); }
  await browser.close();
})();
