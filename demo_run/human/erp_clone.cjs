// Guide (Zero Copy Connectors, ERP): clone the OOTB model "DP: Cost Center" by hand, label SAP Cost Center Lab QA, ERP system S4D (headless).
const H = require('./human.cjs');
const LABEL = 'SAP Cost Center Lab QA';
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
const vis = async page => [...new Set(await page.locator('button, a, [role=tab], [role=menuitem], [role=row], input').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 60)))].slice(0, 60);
const closeTours = async page => { for (let i = 0; i < 5; i++) { const no = page.getByRole('button', { name: 'No', exact: true }); if (await no.count()) { await no.first().click({ timeout: 5000, force: true }).catch(() => {}); await page.waitForTimeout(3000); continue; } const x = page.locator('[aria-label="Close dialog"]'); if (await x.count()) { await x.first().click({ timeout: 5000, force: true }).catch(() => {}); await page.waitForTimeout(3000); continue; } break; } };
(async () => {
  const out = {}; const { browser, page } = await H.openBrowser();
  try {
    await stepT('1. ERP home > Models', async () => {
      await page.goto(`${H.BASE}/now/erp-integration/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000);
      await page.mouse.click(23, 122); await page.waitForTimeout(8000); await H.shot(page, 'erp_02_models'); H.log('  visible: ' + JSON.stringify(await vis(page)));
    });
    await stepT('2-3. open CP: Cost Center, popup, Clone', async () => {
      await page.locator('[aria-label="Filter Model name"]').first().click({ timeout: 15000 }); await page.waitForTimeout(2500); await H.shot(page, 'erp_02b_filter_open');
      await page.mouse.click(219, 497); await page.keyboard.type('CP: Cost Center', { delay: 50 }); await page.waitForTimeout(1500); await page.mouse.click(306, 540); await page.waitForTimeout(6000); await H.shot(page, 'erp_02c_filtered');
      await H.clickText(page, 'CP: Cost Center'); await page.waitForTimeout(8000); await H.shot(page, 'erp_03_opened'); H.log('  visible: ' + JSON.stringify((await vis(page)).filter(t => /clone|ootb|data product|cancel|close|open|edit/i.test(t))));
      await page.waitForTimeout(8000); await closeTours(page); await H.shot(page, 'erp_03b_dialog_closed');
      await page.getByRole('button', { name: 'Clone', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(7000); await H.shot(page, 'erp_04_clone_dialog'); H.log('  clone dialog: ' + JSON.stringify((await vis(page)).filter(t => /clone|label|model name|target|application|cancel|ootb/i.test(t))));
    });
    await stepT('4. label SAP Cost Center Lab QA, Clone this model', async () => {
      await page.mouse.click(779, 481); await page.keyboard.type(LABEL, { delay: 40 }); await page.waitForTimeout(1500); await H.shot(page, 'erp_05_label');
      await page.mouse.click(938, 608); await page.waitForTimeout(15000); await H.shot(page, 'erp_06_cloned'); H.log('  after clone: ' + JSON.stringify((await vis(page)).filter(t => /ERP system|save|manage|SAP Cost|model name|clone/i.test(t))));
      let m = []; for (let i = 0; i < 20 && !m.length; i++) { m = await H.rows('sn_erp_integration_model', 'name=' + LABEL, 'sys_id,name,sys_scope', 3); if (!m.length) await page.waitForTimeout(6000); } H.log('  model rows: ' + JSON.stringify(m)); if (!m.length) throw new Error('the cloned model was not created'); out.model = m[0];
    });
    await stepT('5. open the cloned model from the Models list', async () => {
      await page.goto(`${H.BASE}/now/erp-integration/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(10000); await page.mouse.click(23, 122); await page.waitForTimeout(8000);
      await page.locator('[aria-label="Filter Model name"]').first().click({ timeout: 15000 }); await page.waitForTimeout(2500); await page.mouse.click(219, 497); await page.keyboard.type(LABEL, { delay: 50 }); await page.waitForTimeout(1500); await page.mouse.click(306, 540); await page.waitForTimeout(6000);
      await H.clickText(page, LABEL); await page.waitForTimeout(10000); await H.shot(page, 'erp_07_clone_open');
      await closeTours(page);
      await H.shot(page, 'erp_08_clone_form'); H.log('  form: ' + JSON.stringify((await vis(page)).filter(t => /ERP system|save|manage|model name|S4D/i.test(t))));
    });
    await stepT('5b. ERP system S4D, Save, Manage model', async () => {
      await page.mouse.click(225, 375); await page.keyboard.type('S4D', { delay: 80 }); await page.waitForTimeout(4000); await H.shot(page, 'erp_09_system_search');
      await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await page.waitForTimeout(3000);
      await page.mouse.click(1471, 128); await page.waitForTimeout(8000); await H.shot(page, 'erp_10_saved');
      const row = (await H.rows('sn_erp_integration_model', 'name=' + LABEL, 'sys_id,erp_system,sys_updated_on', 1))[0]; H.log('  model row after Save: ' + JSON.stringify(row));
      await page.mouse.click(1275, 128); await page.waitForTimeout(10000); await H.shot(page, 'erp_11_manage'); H.log('  after Manage model: ' + JSON.stringify((await vis(page)).slice(0, 25)));
    });
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'erp_error').catch(() => {}); }
  finally {
    const m2 = await H.rows('sn_erp_integration_model', 'name=' + LABEL, 'sys_id', 3); for (const r of m2) H.log('  cleanup: delete test model http=' + (await H.rest('DELETE', `table/sn_erp_integration_model/${r.sys_id}`)).status);
    await new Promise(r => setTimeout(r, 10000)); H.log('  test model rows left: ' + (await H.rows('sn_erp_integration_model', 'name=' + LABEL, 'sys_id', 3)).length + ' | SAP Cost Center Lab kept: ' + (await H.rows('sn_erp_integration_model', 'name=SAP Cost Center Lab', 'sys_id', 3)).length);
    await browser.close(); H.log(`######## ERP CLONE (stage 1) ${out.error ? 'FAILED: ' + out.error : 'OK'}`); }
})();
