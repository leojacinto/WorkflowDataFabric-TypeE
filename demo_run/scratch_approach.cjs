const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const heads = async page => page.evaluate(() => [...document.querySelectorAll('h3,h4,h5')].map(h => h.textContent.trim()).filter(t => /^Hands[- ]on/i.test(t)));
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    for (const route of ['/exercises/zero-copy-connectors', '/exercises/servicenow-lens-and-document-intelligence'.replace('servicenow-', ''), '/exercises/fundamentals']) {
      await page.goto(`${H.BASE}/x_snc_forecast_v_0_wdf_lab.do?view=${route}`, { waitUntil: 'load', timeout: 120000 }); await page.waitForTimeout(9000);
      const sw = await page.locator('.lab-approach').count();
      console.log(route, 'switch:', sw, '| default heads:', JSON.stringify(await heads(page)));
      if (sw) {
        await page.getByRole('radio', { name: /Manual/ }).click(); await page.waitForTimeout(1500);
        console.log('  manual heads:', JSON.stringify(await heads(page)), '| hidden notes:', await page.locator('.lab-approach-hidden').count());
        await page.locator('.lab-approach').scrollIntoViewIfNeeded(); await page.waitForTimeout(800);
        await H.shot(page, 'approach_' + route.split('/').pop());
        await page.getByRole('radio', { name: /Build Agent/ }).click(); await page.waitForTimeout(1000);
        console.log('  back to BA heads:', JSON.stringify(await heads(page)));
      }
    }
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
