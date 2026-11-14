const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    for (const [tag, path] of [['home', '/aiux/aia/home'], ['list', '/aiux/aia/list']]) {
      await page.goto(`${H.BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(45000); await H.shot(page, 'aiax_' + tag); H.log(tag + ' URL: ' + page.url());
      H.log(tag + ' items: ' + JSON.stringify((await page.locator('a, button, [role=tab], h1, h2').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 50))).slice(0, 45)));
    }
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'aiax_error').catch(() => {}); }
  await browser.close();
})();
