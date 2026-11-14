// Creates the execute access rule for the new "Neon MCP Lab" server by hand (classic Access Control form), copying the settings of the working "Neon MCP Lab LF" rule. Stage 1: type and operation.
const H = require('./human.cjs');
const vis = async page => page.locator('input:visible, select:visible, textarea:visible').evaluateAll(els => els.map(e => `${e.id}|${(e.value || '').slice(0, 40)}`));
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/sys_security_acl.do?sys_id=-1`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000);
    await page.mouse.click(430, 125); await page.waitForTimeout(3000); await H.shot(page, 'acln_02_type_open');
    H.log('options: ' + JSON.stringify((await page.locator('li, [role=option], .dropdown-item, a').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.textContent || '').trim().replace(/\\s+/g, ' ')).filter(t => t && t.length < 40))).filter(t => /record|mcp|gen_ai|rest|ui page|script|processor/i.test(t)).slice(0, 25)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'acln_error').catch(() => {}); }
  await browser.close();
})();
