// Guide (Lens and Document Intelligence): Walkthrough Document Intelligence Setup, read-only tour like a participant (headless). Exits instead of Save and Continue.
const H = require('./human.cjs');
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
const vis = async page => [...new Set(await page.locator('button, a, [role=tab], [role=menuitem], input, [role=row]').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 70)))].slice(0, 60);
(async () => {
  const out = {}; const { browser, page } = await H.openBrowser();
  try {
    await stepT('1-2. AI Admin Hub > AI Skills > Platform > Other > Extract information from documents', async () => {
      await page.goto(`${H.BASE}/now/now-assist-admin/skills`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(10000); await H.clickText(page, 'AI Skills'); await page.waitForTimeout(12000);
      const where = async text => page.evaluate(t => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; return walk(document, []).filter(e => e.offsetParent !== null && e.getBoundingClientRect().width > 0 && (e.textContent || '').trim() === t && e.children.length <= 2).map(e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }); }, text);
      const plat = (await where('Platform'))[0]; await page.mouse.click(plat.x, plat.y); await page.waitForTimeout(3000); await H.shot(page, 'na_02a_platform');
      const others = (await where('Other')).filter(o => o.y > plat.y).sort((x, y) => x.y - y.y); H.log('  Platform > Other is pre-selected after expanding Platform'); await page.waitForTimeout(45000);
      await page.mouse.click(540, 229); await page.keyboard.type('Extract information from documents', { delay: 40 }); await page.keyboard.press('Enter'); await page.waitForTimeout(12000);
      await H.shot(page, 'na_02_search'); H.log('  visible: ' + JSON.stringify((await vis(page)).filter(t => /extract|edit|document|more|option/i.test(t))));
    });
    await stepT('2b. three dots on the skill card > Edit', async () => {
      const pos = await page.evaluate(() => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const all = walk(document, []); const vis = e => e.offsetParent !== null && e.getBoundingClientRect().width > 0;
        const head = all.find(e => vis(e) && (e.textContent || '').trim() === 'Extract information from documents'); if (!head) return null; const h = head.getBoundingClientRect();
        const btns = all.filter(e => e.tagName === 'BUTTON' && vis(e) && Math.abs(e.getBoundingClientRect().y - h.y) < 80 && e.getBoundingClientRect().x > h.x).map(e => e.getBoundingClientRect()); btns.sort((a, b) => b.x - a.x); return btns.length ? { x: btns[0].x + btns[0].width / 2, y: btns[0].y + btns[0].height / 2 } : { x: h.x + 250, y: h.y }; });
      H.log('  card three-dots: ' + JSON.stringify(pos)); if (!pos) throw new Error('skill card not found'); await H.shot(page, 'na_03_card');
      H.log('  menu: ' + JSON.stringify((await vis(page)).filter(t => /edit|view|activate|deactivate|archive/i.test(t))));
    });
    await stepT('2c-3. Edit Configuration, Create Usecase, Expense Transaction Event', async () => {
      await page.locator('[aria-label="Edit Configuration for Extract information from documents"]').first().click({ timeout: 20000 }); await page.waitForTimeout(25000); await H.shot(page, 'na_04_config'); H.log('  config page: ' + JSON.stringify((await vis(page)).slice(0, 30)));
      await page.mouse.click(445, 470); await page.waitForTimeout(15000); await H.shot(page, 'na_05_usecase');
    });
    await stepT('4-5. use case tour, Integrations tab, the two flows', async () => {
      H.log('  use case page: ' + JSON.stringify((await vis(page)).slice(0, 40)));
      await H.clickText(page, 'Integrations').catch(async () => { H.log('  tabs: ' + JSON.stringify((await vis(page)).slice(0, 40))); throw new Error('Integrations tab not found'); }); await page.waitForTimeout(10000); await H.shot(page, 'na_06_integrations');
      const body = await page.evaluate(() => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { if (e.shadowRoot) walk(e.shadowRoot, a); } a.push(r.textContent || ''); return a; }; return walk(document, []).join(' '); });
      const ex = /DocIntel Extract Values Flow - Expense Transaction Event - Extract/.test(body), pr = /DocIntel Task Processing Flow - Expense Transaction Event - Process/.test(body);
      H.log(`  Extract flow assigned: ${ex} | Process flow assigned: ${pr}`); if (!ex || !pr) throw new Error('the integrations tab does not show both flows');
    });
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'na_error').catch(() => {}); }
  finally { await browser.close(); H.log(`######## DI SETUP WALKTHROUGH (stage 1) ${out.error ? 'FAILED: ' + out.error : 'OK'}`); }
})();
