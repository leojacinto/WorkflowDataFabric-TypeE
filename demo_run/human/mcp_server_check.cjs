const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000); await page.mouse.click(508, 73); await page.waitForTimeout(9000); await H.clickText(page, 'Manage MCP servers'); await page.waitForTimeout(12000); await H.shot(page, 'mcps_05_list');
    const names = await page.locator('a').evaluateAll(els => els.map(e => (e.textContent || '').trim()).filter(t => /MCP/i.test(t) && t.length < 60)); H.log('servers: ' + JSON.stringify([...new Set(names)]));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
