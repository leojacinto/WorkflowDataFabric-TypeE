// Find the AI Agent Studio Home path the way a person does: All menu > filter AI Agent Studio > Home.
const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(8000);
    await page.mouse.click(174, 25); await page.waitForTimeout(4000);
    await page.keyboard.type('AI Agent Studio', { delay: 60 }); await page.waitForTimeout(5000); await H.shot(page, 'aia_01_menu');
    await page.mouse.click(91, 265); await page.waitForTimeout(25000); await H.shot(page, 'aia_02_home'); H.log('URL after Home: ' + page.url());
    H.log('tabs: ' + JSON.stringify((await page.locator('a, button, [role=tab]').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 40))).slice(0, 40)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'aia_error').catch(() => {}); }
  await browser.close();
})();
