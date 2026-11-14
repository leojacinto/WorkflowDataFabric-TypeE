// Guide (Zero Copy Connectors page, SQL part): Data assets > public > lab_cc_summary > Create data fabric table, map columns, finish; like a participant (headless).
const H = require('./human.cjs');
const CONN = '77c3ed5d4714db54037d0fadf26d4389'; const INIT = process.env.INITIALS || 'QA';
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
const click = async (page, loc, what, ms = 20000) => { try { await loc.first().click({ timeout: ms }); } catch (e) { throw new Error(`${what}: ${e.message.split('\n')[0]}`); } };
(async () => {
  const out = {}; const { browser, page } = await H.openBrowser();
  try {
    await stepT('1-3. open the Postgres connection, Data assets, schema public', async () => {
      await page.goto(`${H.BASE}/now/wdf/connections/${CONN}?tabId=data-assets`, { waitUntil: 'load', timeout: 90000 });
      await page.getByText('public', { exact: true }).first().waitFor({ timeout: 120000 }); await page.getByText('public', { exact: true }).first().click(); await page.waitForTimeout(6000);
      await page.getByText('lab_cc_summary', { exact: true }).first().waitFor({ timeout: 30000 }); await H.shot(page, 'sql_01_public');
    });
    await stepT('1c. Create data fabric table beside lab_cc_summary', async () => {
      const pos = await page.evaluate(() => {
        const walk = (root, acc) => { for (const e of root.querySelectorAll('*')) { acc.push(e); if (e.shadowRoot) walk(e.shadowRoot, acc); } return acc; };
        const all = walk(document, []);
        const vis = e => e.offsetParent !== null && e.getBoundingClientRect().width > 0;
        const head = all.filter(e => vis(e) && (e.textContent || '').trim() === 'lab_cc_summary' && e.getBoundingClientRect().x > 380).map(e => e.getBoundingClientRect())[0];
        const btns = all.filter(e => e.tagName === 'BUTTON' && vis(e) && /Create data fabric table/i.test(e.getAttribute('aria-label') || e.textContent)).map(e => e.getBoundingClientRect());
        if (!head || !btns.length) return null;
        const b = btns.sort((x, y) => Math.abs(x.y - head.y) - Math.abs(y.y - head.y))[0];
        return { x: b.x + b.width / 2, y: b.y + b.height / 2, dy: Math.abs(b.y - head.y) };
      });
      let ok = 'no card for lab_cc_summary';
      if (pos && pos.dy < 40) { await page.mouse.click(pos.x, pos.y); ok = 'clicked'; } else if (pos) ok = 'no button on the lab_cc_summary row';
      H.log('  ' + ok); if (ok !== 'clicked') throw new Error('Create data fabric table beside lab_cc_summary: ' + ok);
      await page.waitForTimeout(8000); await H.shot(page, 'sql_02_wizard1');
      const src = await page.locator('input[aria-label^="Source table"]').first().inputValue(); H.log('  source table in the wizard: ' + src); if (src !== 'lab_cc_summary') throw new Error('wizard opened for ' + src);
    });
    await stepT('2. label cc_summ_' + INIT + ', Continue', async () => {
      await page.locator('input[aria-label^="Label"]').first().fill('cc_summ_' + INIT.toLowerCase()); await page.keyboard.press('Tab'); await page.waitForTimeout(1500);
      H.log('  name: ' + await page.locator('input[aria-label^="Name"]').first().inputValue());
      await click(page, page.getByRole('button', { name: 'Continue' }), 'Continue'); await page.waitForTimeout(8000); await H.shot(page, 'sql_03_mapping');
    });
    await stepT('3. tick the box beside Name to map all 10 columns', async () => { const cb = page.getByRole('checkbox').first(); await cb.click({ force: true, timeout: 10000 }); await page.waitForTimeout(2500);
      if (!(await page.getByText(/10 of 10 columns mapped/).count())) { await page.mouse.click(424, 458); await page.waitForTimeout(2500); }
      await H.shot(page, 'sql_04_all_mapped'); if (!(await page.getByText(/10 of 10 columns mapped/).count())) throw new Error('the columns were not mapped (header box)'); });
    await stepT('4. cost_center: Type to Reference', async () => {
      await page.mouse.click(1254, 590); await page.waitForTimeout(1500); await H.shot(page, 'sql_05_type_open');
      await page.getByText('Reference', { exact: true }).last().click({ timeout: 10000 }); await page.waitForTimeout(2500); await H.shot(page, 'sql_06_reference_chosen');
    });
    await stepT('4b-5. Set Reference: table SAP Cost Center, reference key Cost Center', async () => {
      await page.mouse.click(1318, 590); await page.waitForTimeout(4000);
      await page.mouse.click(783, 466); await page.waitForTimeout(1500); await page.keyboard.type('SAP Cost Center', { delay: 60 }); await page.waitForTimeout(3500); await H.shot(page, 'sql_07_table_search');
      await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await page.waitForTimeout(3500);
      await page.mouse.click(783, 531); await page.waitForTimeout(2500); await H.shot(page, 'sql_08_key_open');
      await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await page.waitForTimeout(2500); await H.shot(page, 'sql_09_dialog_filled');
      await page.mouse.click(912, 617); await page.waitForTimeout(4000); await H.shot(page, 'sql_10_reference_set');
    });
    await stepT('6. Primary on for gl_account, Finish', async () => {
      const sw = page.locator('[role=switch], input[type=checkbox][role=switch]'); H.log('  switches found: ' + await sw.count());
      if (await sw.count() > 5) await sw.nth(5).click({ force: true, timeout: 8000 }); else await page.mouse.click(1411, 732);
      await page.waitForTimeout(1500); await H.shot(page, 'sql_11_primary');
      const on = await sw.nth(5).getAttribute('aria-checked').catch(() => null); H.log('  gl_account primary aria-checked: ' + on);
      await click(page, page.getByRole('button', { name: 'Finish' }), 'Finish', 15000); await page.waitForTimeout(8000); await H.shot(page, 'sql_12_finish_clicked');
    });
    await stepT('7. Primary key defined: Confirm', async () => {
      await click(page, page.getByRole('button', { name: 'Confirm' }), 'Confirm', 40000); await page.waitForTimeout(12000); await H.shot(page, 'sql_13_confirmed');
    });
    await stepT('verify the data fabric table and its 24 rows', async () => {
      const t = await H.rows('sys_db_object', 'name=x_snc_forecast_v_0_df_cc_summ_' + INIT.toLowerCase(), 'sys_id,name,label'); if (!t.length) throw new Error('the data fabric table does not exist'); out.table = t[0]; H.log('  table ' + JSON.stringify(t[0]));
      const n = await H.count('x_snc_forecast_v_0_df_cc_summ_' + INIT.toLowerCase(), ''); H.log('  rows read from PostgreSQL: ' + n); if (n !== 24) throw new Error('expected 24 rows, got ' + n);
      await page.goto(`${H.BASE}/x_snc_forecast_v_0_df_cc_summ_${INIT.toLowerCase()}_list.do`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(8000); await H.shot(page, 'sql_14_list');
    });
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'sql_error').catch(() => {}); }
  finally { await browser.close(); H.log('---- TIMES'); for (const [n, s] of times) H.log(`  ${n.padEnd(70)} ${s}s`); H.log(`######## ZCC SQL WIZARD ${out.error ? 'FAILED: ' + out.error : 'DONE (table created, 24 rows read from PostgreSQL)'}`); }
})();
