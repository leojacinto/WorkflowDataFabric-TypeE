// Guide (External Content Connector): Admin Home review and the Employee Center Now Assist query, by hand (headless). Connection creation needs the JKS certificate and secrets from ServiceNow internal SharePoint, which are not available.
const H = require('./human.cjs');
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
const deepText = page => page.evaluate(() => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { if (e.shadowRoot) walk(e.shadowRoot, a); } a.push(r.textContent || ''); return a; }; return walk(document, []).join(' ').replace(/\s+/g, ' '); });
(async () => {
  const out = {}; const { browser, page } = await H.openBrowser();
  try {
    await stepT('prep: admin email and ais_high_security_admin role', async () => {
      const u = (await H.rows('sys_user', 'user_name=admin', 'sys_id,email'))[0]; const r = await H.count('sys_user_has_role', `user=${u.sys_id}^role.name=ais_high_security_admin`); H.log(`  admin email ${u.email} | role present ${r === 1}`); if (u.email !== 'demouser@wdfdemo.onmicrosoft.com' || r !== 1) throw new Error('preparation values differ from the guide');
    });
    await stepT('External Content Admin Home', async () => {
      await page.goto(`${H.BASE}/now/external-content-connectors/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(25000); await H.shot(page, 'ecc_01_home'); const t = await deepText(page); out.sharepoint = /SharePoint/i.test(t); H.log('  page mentions SharePoint connector: ' + out.sharepoint + ' | Create button: ' + /Create/.test(t));
    });
    await stepT('Employee Center > Ask Now Assist query', async () => {
      await page.goto(`${H.BASE}/esc`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(25000); await H.shot(page, 'ecc_02_ec_home');
      const ph = await page.locator('input:visible, textarea:visible').evaluateAll(els => els.map(e => `${e.tagName}|${e.getAttribute('placeholder') || ''}|${e.getAttribute('aria-label') || ''}`)); H.log('  inputs: ' + JSON.stringify(ph.slice(0, 8)));
      await page.mouse.click(815, 210); await page.waitForTimeout(2500);
      await page.keyboard.type('Marketing team cost centre in France seems to have gone over-budget. Can you look for any documents that can assist in checking if there are management directives which might have triggered this?', { delay: 8 }); await page.keyboard.press('Enter');
      const t1 = Date.now(); let found = false; while (Date.now() - t1 < 240000) { await page.waitForTimeout(15000); const t = await deepText(page); if (/Strategic Memo/i.test(t)) { found = true; break; } }
      await H.shot(page, 'ecc_03_answer'); out.found = found; H.log('  answer cites "Strategic Memo - European Product Launch.pdf": ' + found); if (!found) throw new Error('the answer does not cite the Strategic Memo');
    });
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'ecc_error').catch(() => {}); }
  finally { await browser.close(); H.log('---- TIMES'); for (const [n, s] of times) H.log(`  ${n.padEnd(60)} ${s}s`); H.log(`######## EXTERNAL CONTENT CONNECTOR BY HAND ${out.error ? 'FAILED: ' + out.error : 'DONE'} total ${H.elapsed()}s`); }
})();
