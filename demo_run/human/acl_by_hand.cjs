// MCP server ACL by hand: new server form > MCP Server ACL related list > New. Stage 1 only opens the form.
const H = require('./human.cjs'); const ID = process.env.SERVER_ID || '5241298f4710d390037d0fadf26d4332';
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/sn_mcp_server.do?sys_id=${ID}`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000);
    const btn = page.locator('button:has-text("New"), a:has-text("New")').filter({ visible: true }); H.log('New buttons: ' + await btn.count());
    await btn.last().click({ timeout: 15000 }); await page.waitForTimeout(12000); await H.shot(page, 'acl_01_new');
    H.log('fields: ' + JSON.stringify(await page.locator('input:visible, select:visible, textarea:visible').evaluateAll(els => els.map(e => `${e.id}|${e.tagName}|${(e.value || '').slice(0, 40)}`)).then(a => a.slice(0, 25))));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'acl_error').catch(() => {}); }
  await browser.close();
})();
