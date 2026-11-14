// Deletes the wrongly scoped test server through its classic form (Delete button, confirm). The Neon MCP Lab LF server is untouched.
const H = require('./human.cjs'); const ID = process.env.SERVER_ID || 'f5c5240f475c1390037d0fadf26d43a9';
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    const before = await H.rows('sn_mcp_server', 'sys_id=' + ID, 'sys_id,name', 1).catch(() => null); H.log('server row before: ' + JSON.stringify(before));
    await page.goto(`${H.BASE}/sn_mcp_server.do?sys_id=${ID}`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(10000); await H.shot(page, 'mcpd_10_classic');
    if (await page.getByText('To edit this record click here', { exact: false }).count()) { await page.getByText('To edit this record click here', { exact: false }).first().click({ timeout: 15000 }); await page.waitForTimeout(15000); }
    H.log('buttons: ' + JSON.stringify((await page.locator('button, a').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => `${e.id}|${(e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 30)}`).filter(t => /delete|update|more|option|actions/i.test(t))))));
    await page.locator('#sysverb_delete, button:has-text("Delete")').first().click({ timeout: 20000 }); await page.waitForTimeout(4000); await H.shot(page, 'mcpd_11_confirm');
    await page.locator('#ok_button, button:has-text("Delete")').last().click({ timeout: 15000 }); await page.waitForTimeout(12000); await H.shot(page, 'mcpd_12_after');
    const after = await H.rows('sn_mcp_server', 'sys_id=' + ID, 'sys_id', 1).catch(() => null); H.log('server row after: ' + JSON.stringify(after));
    H.log('servers named Neon MCP Lab now: ' + (await H.rows('sn_mcp_server', 'nameLIKENeon MCP Lab', 'name,sys_scope', 5).catch(() => []).then(r => JSON.stringify(r.map(x => x.name)))));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'mcpd_error').catch(() => {}); }
  await browser.close();
})();
