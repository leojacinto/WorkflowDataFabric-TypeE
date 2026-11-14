const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/sys_security_acl.do?sys_id=339d608f47538314037d0fadf26d439b`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000); await H.shot(page, 'aclx_01_lf_acl');
    H.log('fields: ' + JSON.stringify(await page.locator('input:visible, select:visible, textarea:visible').evaluateAll(els => els.map(e => `${e.id}|${e.tagName}|${(e.value || '').slice(0, 40)}`)).then(a => a.filter(t => /name|type|operation|decision|admin|active|script|advanced|condition|resource/i.test(t)).slice(0, 25))));
    H.log('buttons: ' + JSON.stringify(await page.locator('button:visible').evaluateAll(els => els.map(e => (e.id + '|' + (e.textContent || '').trim()).slice(0, 40)).filter(t => /update|delete|new|insert|submit|elevate|save/i.test(t)))));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'aclx_error').catch(() => {}); }
  await browser.close();
})();
