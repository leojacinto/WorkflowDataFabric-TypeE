const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  for (const route of ['/exercises/mcp-server-client', '/exercises/zero-copy-connectors']) {
    try {
      await page.goto(`${H.BASE}/x_snc_forecast_v_0_wdf_lab.do?view=${route}`, { waitUntil: 'load', timeout: 120000 }); await page.waitForTimeout(8000);
      for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(500); }
      await page.waitForTimeout(6000);
      const r = await page.evaluate(() => { const im = [...document.querySelectorAll('img')]; return { total: im.length, broken: im.filter(i => i.complete && i.naturalWidth === 0).map(i => decodeURIComponent((i.src || '').split('/').pop()).slice(0, 50)) }; });
      console.log(route, JSON.stringify(r));
    } catch (e) { console.log(route, 'ERR ' + e.message.split('\n')[0]); }
  }
  await browser.close();
})();
