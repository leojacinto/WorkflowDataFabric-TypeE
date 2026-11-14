const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    const r = (await H.rows('sys_properties', 'name=glide.platform_ml_di.doc_data_extractor.warning_score_threshold', 'sys_id'))[0];
    await page.goto(`${H.BASE}/sys_properties.do?sys_id=${r.sys_id}`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(8000);
    await page.getByText('To edit this record click here', { exact: false }).first().click({ timeout: 15000 }); await page.waitForTimeout(12000); await H.shot(page, 'prop_01_after_switch');
    const vis = await page.locator('button, a, input, textarea, [role=menuitem]').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => `${e.tagName}|${e.id}|${(e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 30)}`).filter(t => t.length > 8));
    H.log('visible: ' + JSON.stringify(vis.slice(0, 40)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'prop_error').catch(() => {}); }
  await browser.close();
})();
