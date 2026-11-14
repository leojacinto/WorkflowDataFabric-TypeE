const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/agent-studio/record/sn_mcp_server/5241298f4710d390037d0fadf26d4332`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(50000); await H.shot(page, 'aclx_10_studio_server');
    const x = page.getByRole('button', { name: /Additional actions/i }).first(); H.log('additional actions buttons: ' + await x.count());
    await x.click({ timeout: 15000 }).catch(e => H.log('click failed ' + e.message.split('\n')[0])); await page.waitForTimeout(3000); await H.shot(page, 'aclx_11_actions');
    H.log('visible actions: ' + JSON.stringify((await page.locator('button, a, li, [role=menuitem]').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 50))).slice(0, 40)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'aclx_error').catch(() => {}); }
  await browser.close();
})();
