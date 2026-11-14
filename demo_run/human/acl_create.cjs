// Creates the execute access rule for the Forecast Variance "Neon MCP Lab" server by hand, copying the settings of the working LF rule (Allow If, execute, gen_ai_mcp_server, admin overrides, role snc_internal). Elevates ai_security_admin and security_admin for this browser session only.
const H = require('./human.cjs');
const rowPos = (page, role) => page.evaluate(r => { const walk = (x, a) => { for (const e of x.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const t = walk(document, []).find(e => e.offsetParent !== null && (e.textContent || '').trim() === r); if (!t) return null; t.scrollIntoView({ block: 'center' }); const q = t.getBoundingClientRect(); return { x: q.x - 18, y: q.y + q.height / 2 }; }, role);
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(8000);
    for (let t = 0; t < 5; t++) { if (t % 2 === 0) await page.getByRole('button', { name: /User menu|Account|System Administrator|SA/i }).first().click({ timeout: 15000 }).catch(() => {}); else await page.mouse.click(1536, 25); await page.waitForTimeout(5000); if (await page.getByText('Elevate role', { exact: true }).count()) break; await page.keyboard.press('Escape'); await page.waitForTimeout(3000); }
    await page.getByText('Elevate role', { exact: true }).first().click({ timeout: 15000 }); await page.getByText(/AVAILABLE ROLES/i).first().waitFor({ timeout: 30000 }); await page.waitForTimeout(2000);
    const state = role => page.evaluate(r => { const walk = (x, a) => { for (const e of x.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const all = walk(document, []); const t = all.find(e => e.offsetParent !== null && (e.textContent || '').trim() === r && e.children.length === 0) || all.find(e => e.offsetParent !== null && (e.textContent || '').trim() === r); if (!t) return null; t.scrollIntoView({ block: 'center' }); const q = t.getBoundingClientRect(); let n = t; let cb = null; for (let i = 0; i < 5 && n && !cb; i++, n = n.parentElement || (n.getRootNode && n.getRootNode().host)) cb = n.querySelector && n.querySelector('input[type=checkbox]'); return { x: q.x - 18, y: q.y + q.height / 2, checked: cb ? cb.checked : null }; }, role);
    let ticked = 0; const done = new Set();
    for (let r = 0; r < 10 && done.size < 2; r++) { for (const role of ['ai_security_admin', 'security_admin']) { if (done.has(role)) continue; const st = await state(role); if (!st) continue; await page.waitForTimeout(600); const st2 = await state(role); H.log(role + ' state: ' + JSON.stringify(st2)); if (st2.checked !== true) { await page.mouse.click(st2.x, st2.y); ticked++; await page.waitForTimeout(600); } done.add(role); } if (done.size < 2) { await page.mouse.move(783, 520); await page.mouse.wheel(0, 160); await page.waitForTimeout(900); } }
    H.log('roles handled: ' + JSON.stringify([...done]));
    if (ticked) { await page.getByRole('button', { name: 'Update', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(8000); } else { await page.keyboard.press('Escape'); await page.waitForTimeout(2000); } H.log('elevation step done, roles newly ticked: ' + ticked);
    await page.goto(`${H.BASE}/sys_security_acl.do?sys_id=-1`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(15000);
    const sel = page.locator('select:visible').first(); await sel.waitFor({ state: 'visible', timeout: 240000 }); H.log('type select id ' + (await sel.getAttribute('id')) + ', options: ' + JSON.stringify((await sel.locator('option').allTextContents()).filter(t => /mcp|record|rest|ui|script|processor|gen/i.test(t))));
    await sel.selectOption({ label: 'gen_ai_mcp_server' }, { timeout: 120000 });
    await page.waitForTimeout(6000); await H.shot(page, 'acl4_01_type');
    H.log('after type, fields: ' + JSON.stringify(await page.locator('input:visible, select:visible').evaluateAll(els => els.map(e => `${e.id}|${(e.value || '').slice(0, 30)}`)).then(a => a.slice(0, 14))));
    H.log('operation already: ' + await page.locator('input[id="sys_display.sys_security_acl.operation"]').first().inputValue());
    await page.locator('[id="s2id_autogen1"]').first().click({ timeout: 20000 }).catch(() => page.mouse.click(540, 313)); await page.waitForTimeout(3000); await H.shot(page, 'acl4_03_name1');
    H.log('name dropdown 1 options: ' + JSON.stringify((await page.locator('.select2-results li, .select2-result-label').evaluateAll(els => els.map(e => (e.textContent || '').trim()).filter(Boolean))).slice(0, 25)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'acl4_error').catch(() => {}); }
  await browser.close();
})();
