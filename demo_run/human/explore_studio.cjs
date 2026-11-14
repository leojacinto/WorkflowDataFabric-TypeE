const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 });
    await page.waitForTimeout(15000);
    await H.shot(page, 'ex_01_agent_studio');
    const tab = page.getByRole('tab', { name: /Testing/i }).or(page.getByText('Testing', { exact: true })).first();
    await tab.click({ timeout: 20000 });
    await page.waitForTimeout(6000);
    await H.shot(page, 'ex_02_testing');
    await page.getByRole('button', { name: /Start manual test/i }).first().click({ timeout: 20000 });
    await page.waitForTimeout(6000);
    await H.shot(page, 'ex_03_manual_test_dialog');
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'ex_error').catch(() => {}); }
  await browser.close();
})();
