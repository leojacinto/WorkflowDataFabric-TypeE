const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/wdf/connections/77c3ed5d4714db54037d0fadf26d4389?tabId=data-assets`, { waitUntil: 'load', timeout: 90000 }); await page.getByText('public', { exact: true }).first().waitFor({ timeout: 90000 });
    await page.getByText('public', { exact: true }).first().click(); await page.waitForTimeout(6000); await H.shot(page, 'zx_07_public');
    const vis = await page.locator('button, a, [role=row], [role=treeitem]').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 90));
    H.log('visible: ' + JSON.stringify([...new Set(vis)].slice(0, 40)));
    await page.getByRole('button', { name: /Create data fabric table/i }).first().click({ timeout: 20000 }); await page.waitForTimeout(8000); await H.shot(page, 'zx_08_wizard1');
    const inputs = await page.locator('input:visible, textarea:visible, select:visible, [role=combobox]:visible').evaluateAll(els => els.map(e => `${e.tagName}|${e.getAttribute('aria-label') || ''}|${e.getAttribute('placeholder') || ''}|${e.id}|${e.value || ''}`));
    H.log('inputs: ' + JSON.stringify(inputs));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'zx_error').catch(() => {}); }
  await browser.close();
})();
