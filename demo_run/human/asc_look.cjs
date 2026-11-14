const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/auth_server_connection_list.do?sysparm_query=nameLIKENeon^ORserver_nameLIKENeon`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(15000); await H.shot(page, 'asc_01_list');
    H.log('rows: ' + JSON.stringify((await page.locator('tr.list_row td a, tr.list_row').evaluateAll(els => els.map(e => (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80)).filter(Boolean))).slice(0, 12)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'asc_error').catch(() => {}); }
  await browser.close();
})();
