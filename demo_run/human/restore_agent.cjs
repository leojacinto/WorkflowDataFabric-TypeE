// Restores the agent record "Demo Data Generator (Copy)" that my REST cleanup deleted by mistake, through Deleted Records (sys_audit_delete).
const H = require('./human.cjs'); const ID = 'af142d033b54d390a0db3141a3e45a0f';
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/sys_audit_delete.do?sys_id=${ID}`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(10000); await H.shot(page, 'restore_01_record');
    H.log('buttons and links: ' + JSON.stringify((await page.locator('button, a').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => `${e.id}|${(e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 40)}`).filter(t => /restore|undelete|recover|related|rollback/i.test(t))))));
    await page.locator('[id="66bed66d4657629201d76b073407176c"]').first().click({ timeout: 15000 }); await page.waitForTimeout(8000); await H.shot(page, 'restore_02_after_click');
    H.log('dialog or page buttons: ' + JSON.stringify((await page.locator('button').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.textContent || '').trim()).filter(t => t && t.length < 40))).slice(0, 15)));
    for (const name of ['Undelete', 'Restore', 'OK', 'Continue']) { const b = page.getByRole('button', { name: new RegExp('^' + name) }); if (await b.count() && await page.getByText(/related|restore|undelete/i).count() > 1) { await b.last().click({ timeout: 8000 }).catch(() => {}); H.log('clicked ' + name); await page.waitForTimeout(8000); break; } }
    await H.shot(page, 'restore_03_final'); H.log('agent restored (exists): ' + (await H.count('sn_aia_agent', 'sys_idSTARTSWITHc1ee8203')));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'restore_error').catch(() => {}); }
  await browser.close();
})();
