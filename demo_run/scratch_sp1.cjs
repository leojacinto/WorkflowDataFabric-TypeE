const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/ais-preview-utility/preview`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(30000);
    await H.shot(page, 'sp_1_open');
    console.log(page.url());
    console.log((await page.evaluate(() => document.body.innerText.slice(0, 900))).replace(/\n+/g, ' | '));
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
