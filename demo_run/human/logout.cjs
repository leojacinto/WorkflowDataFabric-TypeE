const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(8000); await page.waitForTimeout(5000);
    for (let t = 0; t < 5; t++) { if (t % 2 === 0) await page.getByRole('button', { name: /User menu|Account|System Administrator|SA/i }).first().click({ timeout: 15000 }).catch(() => {}); else await page.mouse.click(1536, 25); await page.waitForTimeout(5000); if (await page.getByText('Log out', { exact: true }).count()) break; await page.keyboard.press('Escape'); await page.waitForTimeout(2000); }
    await page.getByText('Log out', { exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(8000); H.log('logged out: elevated roles ended');
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
