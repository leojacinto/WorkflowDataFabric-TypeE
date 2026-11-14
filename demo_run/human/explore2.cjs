const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000);
    await page.getByText('Testing', { exact: true }).first().click(); await page.waitForTimeout(5000);
    await page.getByRole('button', { name: /Start manual test/i }).first().click(); await page.waitForTimeout(5000);
    const f = page.getByLabel(/Choose a test type/i).first(); if (await f.count()) await f.click({ timeout: 15000 }); else await page.mouse.click(580, 337); await page.waitForTimeout(1500);
    await H.shot(page, 'ex2_01_type_open');
    await page.mouse.click(130, 369); await page.waitForTimeout(4000);
    await H.shot(page, 'ex2_02_type_chosen');
    const inputs = await page.locator('input:visible, textarea:visible, select:visible, [role=combobox]:visible').evaluateAll(els => els.map(e => `${e.tagName}|${e.getAttribute('aria-label') || ''}|${e.getAttribute('placeholder') || ''}|${e.id}|${e.getAttribute('role') || ''}`));
    H.log('visible inputs: ' + JSON.stringify(inputs));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'ex2_error').catch(() => {}); }
  await browser.close();
})();
