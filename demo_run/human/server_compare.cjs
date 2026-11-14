const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  for (const [tag, id] of [['lf', 'ca7d6c4f47538314037d0fadf26d4365'], ['new', '5241298f4710d390037d0fadf26d4332']]) {
    await page.goto(`${H.BASE}/sn_mcp_server.do?sys_id=${id}`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000); await H.shot(page, 'cmp_' + tag);
  }
  await browser.close();
})();
