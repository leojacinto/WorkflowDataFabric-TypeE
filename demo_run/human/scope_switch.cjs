// Sets the current application scope to Forecast Variance by hand: globe icon > Application scope row > Filter > Enter > pick the exact entry. Positions are looked up, not fixed.
const H = require('./human.cjs');
const TARGET = process.env.APP || 'Forecast Variance';
const findPos = (page, pred) => page.evaluate(src => { const f = new Function('t', 'r', 'return ' + src); const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const hits = walk(document, []).filter(e => e.offsetParent !== null && e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().y < 460 && e.getBoundingClientRect().x > 1000 && f((e.textContent || '').trim().replace(/\s+/g, ' '), e.getBoundingClientRect())).map(e => { const r = e.getBoundingClientRect(); return { t: (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60), x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2), w: Math.round(r.width) }; }); hits.sort((a, b) => a.w - b.w); return hits[0] || null; }, pred);
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(10000); await page.waitForTimeout(5000);
    await page.getByRole('button', { name: /Application scope|application|scope|globe/i }).first().click({ timeout: 30000 }); await page.waitForTimeout(5000);
    const row = await findPos(page, "/^Application scope:/.test(t) && r.width > 150 && r.y > 55"); H.log('scope row: ' + JSON.stringify(row)); if (!row) throw new Error('Application scope row not found'); await page.mouse.click(row.x, row.y); await page.waitForTimeout(6000); await H.shot(page, 'scope_b_list');
    let flt = await findPos(page, "t === 'Filter'"); if (!flt) flt = { x: row.x, y: 114 }; H.log('filter: ' + JSON.stringify(flt)); await page.mouse.move(flt.x, 250); await page.waitForTimeout(800); await page.mouse.click(flt.x, flt.y); await page.waitForTimeout(1000);
    await page.keyboard.type(TARGET, { delay: 100 }); await page.waitForTimeout(1500); await page.keyboard.press('Enter'); await page.waitForTimeout(30000); await H.shot(page, 'scope_20_filtered');
    const opt = await findPos(page, "t === '" + TARGET + "' && r.y > 130"); H.log('option: ' + JSON.stringify(opt)); if (!opt) throw new Error('exact entry ' + TARGET + ' not shown');
    await page.mouse.click(opt.x, opt.y); await page.waitForTimeout(12000); H.log('clicked ' + opt.t);
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'scope_error').catch(() => {}); }
  await browser.close();
})();
