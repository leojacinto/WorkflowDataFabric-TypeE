const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/now-assist-admin/skills`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000); await H.clickText(page, 'AI Skills'); await page.waitForTimeout(15000); await H.shot(page, 'na_01_skills'); H.log('url ' + page.url());
    const vis = await page.locator('button, a, [role=tab], input, [role=menuitem]').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 60));
    H.log('visible: ' + JSON.stringify([...new Set(vis)].slice(0, 50)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'na_error').catch(() => {}); }
  await browser.close();
})();
