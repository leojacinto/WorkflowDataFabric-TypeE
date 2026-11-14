// Guide (Fundamentals page, steps 7-14): create the scoped table "Expense Transaction Event <initials>" by hand with its 17 columns, like a participant (headless).
// Deviation: the throw-away scope of steps 1-6 is NOT created (the repo rules say never create another app); the table is created in the Forecast Variance scope.
const H = require('./human.cjs');
const INIT = process.env.INITIALS || 'QA'; const LABEL = `Expense Transaction Event ${INIT}`;
const COLS = [['Amount USD', 'decimal', 15], ['Timestamp', 'glide_date_time', ''], ...['Cost Center', 'Source System', 'Billing Period', 'Vendor', 'Invoice ID', 'GL Account', 'Business Unit', 'Sent From', 'Correlation ID', 'Service Category', 'Schema Version', 'Region', 'Event ID', 'Priority', 'Event Type'].map(n => [n, 'string', 40])];
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '_');
(async () => {
  const out = {}; let tableName = null; const { browser, page } = await H.openBrowser();
  try {
    await stepT('9-10. open a new table form, label, untick Create module, application Forecast Variance', async () => {
      await page.goto(`${H.BASE}/sys_db_object.do?sys_id=-1`, { waitUntil: 'load', timeout: 90000 });
      await page.waitForSelector('input[id="sys_db_object.label"]', { timeout: 60000 });
      await page.fill('input[id="sys_db_object.label"]', LABEL); await page.keyboard.press('Tab'); await page.waitForTimeout(1500);
      const cm = page.getByRole('checkbox', { name: 'Create module', exact: true });
      if (await cm.count()) await cm.uncheck({ force: true }).catch(async () => { await cm.click({ force: true }); });
      H.log('  application shown: ' + (await page.locator('input[id="sys_display.sys_db_object.sys_scope"], input[id="sys_db_object.sys_scope"]').first().inputValue().catch(() => 'read-only field')));
      await H.shot(page, 'fund_01_new_table');
    });
    await stepT('11. Save', async () => {
      await page.locator('#sysverb_insert_and_stay, #sysverb_insert, button:has-text("Submit")').first().click(); await page.waitForLoadState('load', { timeout: 60000 }).catch(() => {}); await page.waitForTimeout(5000);
      const r = await H.rows('sys_db_object', `label=${LABEL}`, 'sys_id,name,sys_scope'); if (!r.length) throw new Error('the table was not saved'); tableName = r[0].name; out.table = r[0]; H.log('  table ' + tableName + ' scope ' + JSON.stringify(r[0].sys_scope));
      await H.shot(page, 'fund_02_saved');
    });
    let n = 0;
    for (const [label, type, len] of COLS) {
      n++;
      await stepT(`13/14. column ${n}/17: ${label} (${type}${len ? ' ' + len : ''})`, async () => {
        await page.goto(`${H.BASE}/sys_dictionary.do?sys_id=-1&sysparm_query=${encodeURIComponent(`name=${tableName}^internal_type=${type}`)}`, { waitUntil: 'load', timeout: 90000 });
        await page.waitForSelector('input[id="sys_dictionary.column_label"]', { timeout: 60000 });
        await page.fill('input[id="sys_dictionary.column_label"]', label); await page.keyboard.press('Tab'); await page.waitForTimeout(800);
        if (len) { const ml = page.locator('input[id="sys_dictionary.max_length"]').first(); if (await ml.count()) await ml.fill(String(len)); }
        if (n === 1) await H.shot(page, 'fund_03_column_form');
        await page.locator('#sysverb_insert, button:has-text("Submit")').first().click(); await page.waitForLoadState('load', { timeout: 60000 }).catch(() => {}); await page.waitForTimeout(1500);
      });
    }
    await stepT('verify the 17 columns exist', async () => {
      const have = (await H.rows('sys_dictionary', `name=${tableName}^elementISNOTEMPTY`, 'element,internal_type,max_length', 60)).map(x => x.element); out.have = have;
      const want = COLS.map(c => slug(c[0])); const missing = want.filter(w => !have.some(h => h === w || h.includes(w) || w.includes(h)));
      H.log(`  ${have.length} dictionary entries; missing: ${JSON.stringify(missing)}`); if (missing.length) throw new Error('missing columns: ' + missing.join(', '));
    });
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'fund_error').catch(() => {}); }
  finally {
    await stepT('cleanup (delete the test table)', async () => { if (out.table) { const c = await H.rest('DELETE', `table/sys_db_object/${out.table.sys_id}`); H.log(`  delete table http=${c.status}`); await new Promise(r => setTimeout(r, 20000)); H.log('  table gone: ' + ((await H.rows('sys_db_object', `label=${LABEL}`, 'sys_id')).length === 0)); } });
    await browser.close(); H.log('---- TIMES'); for (const [n2, s] of times) H.log(`  ${n2.padEnd(76)} ${s}s`);
    H.log(`######## FUNDAMENTALS TABLE ${out.error ? 'FAILED: ' + out.error : 'DONE'} total ${H.elapsed()}s`);
  }
})();
