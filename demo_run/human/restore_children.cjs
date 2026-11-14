// Restores the child records that were deleted together with "Demo Data Generator (Copy)", one Undelete Record click each.
const H = require('./human.cjs');
const IDS = [['sn_aia_version', 'ab14e9033b54d390a0db3141a3e45a85']];
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    for (const [t, id] of IDS) {
      await page.goto(`${H.BASE}/sys_audit_delete.do?sys_id=${id}`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(6000);
      const b = page.locator('[id="66bed66d4657629201d76b073407176c"]').first(); if (!(await b.count())) { H.log(t + ' ' + id.slice(0, 8) + ': no Undelete button (already restored?)'); continue; }
      await b.click({ timeout: 15000 }); await page.waitForTimeout(8000); await H.shot(page, 'restore_version'); H.log(t + ' ' + id.slice(0, 8) + ': Undelete Record clicked; page text: ' + JSON.stringify((await page.locator('.outputmsg, .notification, [role=alert], .alert').evaluateAll(els => els.map(e => (e.textContent || '').trim().slice(0, 200)))).slice(0, 3)));
    }
    const dk = ['c9ee8203', '4dee8203', 'e6a1bdee', '19ee8203', '49ee8203', '8dee8203', 'f5ee0603', '84246d03'];
    H.log('tools back on the Demo Data Generator (Copy) agent: ' + (await H.count('sn_aia_agent_tool_m2m', 'agent=c1ee82038771b61466c464a70cbb3539')) + ' | versions: ' + (await H.count('sn_aia_version', 'sys_idSTARTSWITHc9ee8203')) + ' | config: ' + (await H.count('sn_aia_agent_config', 'sys_idSTARTSWITH4dee8203')));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'restore_error').catch(() => {}); }
  await browser.close();
})();
