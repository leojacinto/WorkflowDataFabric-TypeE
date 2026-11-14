const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/erp-integration/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(15000); await H.shot(page, 'erp_01_home');
    const vis = await page.locator('button, a, [role=tab], [role=menuitem]').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 50));
    H.log('visible: ' + JSON.stringify([...new Set(vis)].slice(0, 45)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'erp_error').catch(() => {}); }
  await browser.close();
})();
