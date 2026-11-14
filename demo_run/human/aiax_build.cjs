// New AI Agent Studio (/aiux/aia): duplicate "Forecast Variance QB" as "Forecast Variance Neon MCP Lab", by hand (headless). Exploration stage 1: duplicate.
const H = require('./human.cjs'); const NAME = 'Forecast Variance Neon MCP Lab';
const vis = async page => (await page.locator('a, button, [role=tab], input, textarea, h1, h2, h3, label').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 60))).slice(0, 50);
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/aiux/aia/list?tab=recents&recentsType=agents`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(45000);
    await page.mouse.click(1016, 288); await page.waitForTimeout(45000); await H.shot(page, 'aiab_01_agent_open'); await page.getByRole('button', { name: 'More options' }).first().click({ timeout: 20000 }); await page.waitForTimeout(4000); await H.shot(page, 'aiab_02_more_options'); await page.getByText('Copy', { exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(12000); await H.shot(page, 'aiab_03_after_copy'); H.log('after Copy: ' + JSON.stringify(await vis(page)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'aiab_error').catch(() => {}); }
  await browser.close();
})();
