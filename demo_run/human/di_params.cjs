// Guide (Document Intelligence Parameters, by hand): open the three *threshold system properties and set them to 0.01 (headless). The global scope switch is skipped; admin edits global properties from any scope.
const H = require('./human.cjs');
const NAMES = ['glide.platform_ml_di.doc_data_extractor.warning_score_threshold', 'glide.platform_ml_di.doc_data_extractor.autofill_threshold', 'glide.platform_ml_di.doc_data_extractor.straight_through_processing_threshold'];
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
(async () => {
  const out = {}; const { browser, page } = await H.openBrowser();
  try {
    await stepT('3-4. System Properties, filter *threshold', async () => { await page.goto(`${H.BASE}/sys_properties_list.do?sysparm_query=nameLIKEdoc_data_extractor^nameENDSWITHthreshold`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(5000); await H.shot(page, 'dip_01_list'); });
    for (const n of NAMES) {
      await stepT('4b. set ' + n.split('.').pop() + ' to 0.01', async () => {
        const r = (await H.rows('sys_properties', 'name=' + n, 'sys_id,value'))[0]; if (!r) throw new Error('property missing: ' + n); H.log('  value before: ' + r.value);
        await page.goto(`${H.BASE}/sys_properties.do?sys_id=${r.sys_id}`, { waitUntil: 'load', timeout: 90000 });
        await page.waitForTimeout(6000); const sw = page.getByText('To edit this record click here', { exact: false }); if (await sw.count()) { await sw.first().click({ timeout: 15000 }); H.log('  clicked "To edit this record click here" (switches the current application to Global)'); await page.waitForTimeout(12000); }
        const f = page.locator('textarea[id="sys_properties.value"]').first(); await f.waitFor({ timeout: 60000 }); await f.fill('0.01');
        await page.locator('#sysverb_update').first().click(); await page.waitForLoadState('load', { timeout: 60000 }).catch(() => {}); await page.waitForTimeout(3000);
        const a = (await H.rows('sys_properties', 'name=' + n, 'value'))[0]; H.log('  value after: ' + a.value); if (a.value !== '0.01') throw new Error(n + ' is ' + a.value);
      });
    }
    await H.shot(page, 'dip_02_done');
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'dip_error').catch(() => {}); }
  finally { await browser.close(); H.log('---- TIMES'); for (const [n, s] of times) H.log(`  ${n.padEnd(70)} ${s}s`); H.log(`######## DI PARAMETERS BY HAND ${out.error ? 'FAILED: ' + out.error : 'DONE'} total ${H.elapsed()}s`); }
})();
