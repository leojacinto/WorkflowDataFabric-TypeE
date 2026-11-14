// Elevate role by hand: avatar menu > Elevate role > security_admin > Update (or remove it again with MODE=off).
const H = require('./human.cjs'); const MODE = process.env.MODE || 'on';
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(8000);
    await page.getByRole('button', { name: /User menu|Account|System Administrator|SA/i }).first().click({ timeout: 20000 }).catch(async () => { await page.mouse.click(1536, 25); }); await page.waitForTimeout(3000); await H.shot(page, 'elev_01_menu');
    await H.clickText(page, 'Elevate role'); await page.waitForTimeout(5000); await H.shot(page, 'elev_02_dialog');
    H.log('dialog: ' + JSON.stringify((await page.locator('input:visible, label:visible, button:visible').evaluateAll(els => els.map(e => (e.getAttribute('aria-label') || e.id || e.textContent || '').trim().slice(0, 40)).filter(t => /security|admin|elevat|update|cancel|impersonator/i.test(t)))).slice(0, 15)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'elev_error').catch(() => {}); }
  await browser.close();
})();
