// Removes the test data fabric table through the same ZCC screen (three dots menu on the cc_summ_qa card).
const H = require('./human.cjs'); const CONN = '77c3ed5d4714db54037d0fadf26d4389'; const T = 'x_snc_forecast_v_0_df_cc_summ_qa';
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/wdf/connections/${CONN}?tabId=data-assets`, { waitUntil: 'load', timeout: 90000 });
    await page.getByText('public', { exact: true }).first().waitFor({ timeout: 120000 }); await page.getByText('public', { exact: true }).first().click(); await page.waitForTimeout(8000);
    await page.getByText('See more', { exact: false }).first().click({ timeout: 15000 }).catch(() => {}); await page.waitForTimeout(5000);
    await H.shot(page, 'sqlc_01_cards');
    const pos = await page.evaluate(() => {
      const walk = (root, acc) => { for (const e of root.querySelectorAll('*')) { acc.push(e); if (e.shadowRoot) walk(e.shadowRoot, acc); } return acc; };
      const all = walk(document, []); const vis = e => e.offsetParent !== null && e.getBoundingClientRect().width > 0;
      const head = all.find(e => vis(e) && (e.textContent || '').trim() === 'cc_summ_qa'); if (!head) return null; const h = head.getBoundingClientRect();
      const btns = all.filter(e => e.tagName === 'BUTTON' && vis(e) && e.getBoundingClientRect().x > 1300 && Math.abs(e.getBoundingClientRect().y - h.y) < 60 && !/Edit/.test(e.textContent)).map(e => e.getBoundingClientRect());
      return btns.length ? { x: btns[0].x + btns[0].width / 2, y: btns[0].y + btns[0].height / 2 } : { x: 1455, y: h.y + 30 };
    });
    H.log('  three-dots at ' + JSON.stringify(pos)); if (!pos) throw new Error('cc_summ_qa card not found');
    await page.mouse.click(pos.x, pos.y); await page.waitForTimeout(2500); await H.shot(page, 'sqlc_02_menu');
    const items = await page.locator('[role=menuitem], [role=option], li, button').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.textContent || '').trim()).filter(t => t && t.length < 40));
    H.log('  menu: ' + JSON.stringify([...new Set(items)].filter(t => /open|list|delete|remove|edit/i.test(t))));
    await page.getByRole('menuitem', { name: 'Delete' }).first().click({ timeout: 6000 }).catch(async () => { await page.mouse.click(1413, 692); }); await page.waitForTimeout(3000); await H.shot(page, 'sqlc_03_confirm');
    const dlg = await page.locator('button:visible').evaluateAll(els => els.map(e => (e.textContent || '').trim()).filter(t => t && t.length < 30)); H.log('  buttons: ' + JSON.stringify([...new Set(dlg)].slice(0, 20)));
    await page.getByRole('button', { name: /^(Delete|Confirm|Yes)/ }).last().click({ timeout: 10000 }); await page.waitForTimeout(25000); await H.shot(page, 'sqlc_04_after');
    const gone = (await H.rows('sys_db_object', 'name=' + T, 'sys_id')).length === 0; const kept = (await H.rows('sys_db_object', 'name=x_snc_forecast_v_0_df_cc_summ_dvn', 'sys_id')).length === 1;
    H.log('  test table gone: ' + gone + ' | cc_summ_dvn kept: ' + kept); if (!gone) throw new Error('the test table is still there');
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'sqlc_error').catch(() => {}); }
  await browser.close();
})();
