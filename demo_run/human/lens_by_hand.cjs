// Guide (Lens and Document Intelligence, AI Lens part): setup check, Downloads page, and the Create with Lens button, by hand (headless). The desktop Lens app steps (open the app, drag the frame) cannot run headless.
const H = require('./human.cjs');
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
const deepText = page => page.evaluate(() => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { if (e.shadowRoot) walk(e.shadowRoot, a); } a.push(r.textContent || ''); return a; }; return walk(document, []).join(' ').replace(/\s+/g, ' '); });
(async () => {
  const out = {}; const { browser, page } = await H.openBrowser();
  try {
    await stepT('1-2. AI Admin Hub > AI Skills > Platform > Other > search ServiceNow AI Lens', async () => {
      await page.goto(`${H.BASE}/now/now-assist-admin/skills`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(10000); await H.clickText(page, 'AI Skills'); await page.waitForTimeout(12000);
      const p = await page.evaluate(() => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const e = walk(document, []).find(e => e.offsetParent !== null && (e.textContent || '').trim() === 'Platform' && e.children.length <= 2); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
      await page.mouse.click(p.x, p.y); await page.waitForTimeout(45000);
      await page.mouse.click(540, 229); await page.keyboard.type('ServiceNow AI Lens', { delay: 40 }); await page.keyboard.press('Enter'); await page.waitForTimeout(12000); await H.shot(page, 'lens_01_search');
      const t = await deepText(page); out.card = /ServiceNow AI Lens/.test(t); out.active = /Active/.test(t); out.turnOn = /Turn on/.test(t); H.log(`  card found: ${out.card} | shows Active: ${out.active} | shows Turn on: ${out.turnOn}`); if (!out.card) throw new Error('the ServiceNow AI Lens skill card is missing');
    });
    await stepT('Downloads page of ServiceNow AI Lens', async () => {
      const url = `${H.BASE}/sn_app_lens_core_sn_lens_downloads.do`; H.log('  module "Downloads and Preferences" of ServiceNow AI Lens: ' + url.replace(H.BASE, ''));
      await page.goto(url, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(15000); await H.shot(page, 'lens_02_downloads'); const t = await deepText(page); H.log('  page mentions download/installer: ' + /download|installer|\.dmg|\.exe|\.pkg|macOS|Windows/i.test(t));
    });
    await stepT('Create with Lens button on the Expense Transaction Event list', async () => {
      await page.goto(`${H.BASE}/x_snc_forecast_v_0_expense_transaction_event_list.do`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000); await H.shot(page, 'lens_03_event_list'); const t = await deepText(page); out.createBtn = /Create with Lens/i.test(t); H.log('  Create with Lens visible: ' + out.createBtn);
    });
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'lens_error').catch(() => {}); }
  finally { await browser.close(); H.log('---- TIMES'); for (const [n, s] of times) H.log(`  ${n.padEnd(80)} ${s}s`); H.log(`######## AI LENS BY HAND ${out.error ? 'FAILED: ' + out.error : 'DONE (desktop app steps cannot run headless)'} total ${H.elapsed()}s`); }
})();
