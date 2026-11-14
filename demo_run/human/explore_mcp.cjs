const H = require('./human.cjs');
const vis = async page => [...new Set(await page.locator('button, a, [role=tab], [role=menuitem], [role=row]').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 60)))].slice(0, 50);
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000);
    await page.mouse.click(508, 73); await page.waitForTimeout(10000);
    await H.clickText(page, 'Manage MCP servers'); await page.waitForTimeout(10000); await H.shot(page, 'mcp_02_servers'); const all = await page.locator('[role=row], tr, td, a, button, div').evaluateAll(els => els.map(e => (e.textContent || '').trim()).filter(t => /neon/i.test(t) && t.length < 80)); H.log('Neon entries: ' + JSON.stringify([...new Set(all)].slice(0, 8)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'mcp_error').catch(() => {}); }
  await browser.close();
})();
