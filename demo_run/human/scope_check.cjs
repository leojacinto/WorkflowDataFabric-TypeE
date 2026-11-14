const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000);
  await page.getByRole('button', { name: /Application scope|application|scope|globe/i }).first().click({ timeout: 30000 }); await page.waitForTimeout(5000); await H.shot(page, 'scope_30_check');
  await browser.close();
})();
