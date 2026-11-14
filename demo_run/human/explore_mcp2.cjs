const H = require('./human.cjs');
const vis = async page => [...new Set(await page.locator('button, a, [role=tab], [role=menuitem], input').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 60)))].slice(0, 60);
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000);
    await H.clickText(page, 'AI agents').catch(e => H.log('no AI agents tab: ' + e.message)); await page.waitForTimeout(8000); await H.shot(page, 'mcp2_01_agents'); H.log('agents page: ' + JSON.stringify(await vis(page)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'mcp2_error').catch(() => {}); }
  await browser.close();
})();
