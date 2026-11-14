// Cleanup by hand: elevate security_admin, delete the three ACLs the platform auto-created for my deleted test servers (exact sys_ids; neon_mcp_lab_lf is kept), then log out to end the elevation.
const H = require('./human.cjs');
const IDS = [['neon_mcp_lab', 'd8d5a80f475c1390037d0fadf26d430a'], ['neon_mcp_lab_1', '3c516d433bd0d390a0db3141a3e45aa0'], ['neon_mcp_lab_2', 'd7a0020b47901790037d0fadf26d4371']];
const state = (page, role) => page.evaluate(r => { const walk = (x, a) => { for (const e of x.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const all = walk(document, []); const t = all.find(e => e.offsetParent !== null && (e.textContent || '').trim() === r && e.children.length === 0) || all.find(e => e.offsetParent !== null && (e.textContent || '').trim() === r); if (!t) return null; t.scrollIntoView({ block: 'center' }); const q = t.getBoundingClientRect(); let n = t; let cb = null; for (let i = 0; i < 5 && n && !cb; i++, n = n.parentElement || (n.getRootNode && n.getRootNode().host)) cb = n.querySelector && n.querySelector('input[type=checkbox]'); return { x: q.x - 18, y: q.y + q.height / 2, checked: cb ? cb.checked : null }; }, role);
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(8000);
    for (let t = 0; t < 5; t++) { if (t % 2 === 0) await page.getByRole('button', { name: /User menu|Account|System Administrator|SA/i }).first().click({ timeout: 15000 }).catch(() => {}); else await page.mouse.click(1536, 25); await page.waitForTimeout(5000); if (await page.getByText('Elevate role', { exact: true }).count()) break; await page.keyboard.press('Escape'); await page.waitForTimeout(3000); }
    await page.getByText('Elevate role', { exact: true }).first().click({ timeout: 15000 }); await page.getByText(/AVAILABLE ROLES/i).first().waitFor({ timeout: 30000 }); await page.waitForTimeout(2000);
    let ticked = 0; const done = new Set();
    for (let r = 0; r < 10 && done.size < 1; r++) { const st = await state(page, 'security_admin'); if (st) { await page.waitForTimeout(600); const s2 = await state(page, 'security_admin'); if (s2.checked !== true) { await page.mouse.click(s2.x, s2.y); ticked++; await page.waitForTimeout(600); } done.add('security_admin'); } else { await page.mouse.move(783, 520); await page.mouse.wheel(0, 160); await page.waitForTimeout(900); } }
    if (ticked) { await page.getByRole('button', { name: 'Update', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(8000); } else { await page.keyboard.press('Escape'); await page.waitForTimeout(2000); } H.log('security_admin elevation: newly ticked ' + ticked);
    for (const [name, id] of IDS) {
      await page.goto(`${H.BASE}/sys_security_acl.do?sys_id=${id}`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000);
      const nm = await page.locator('input[id="sys_readonly.sys_security_acl.name"], input[id="sys_security_acl.name"]').first().inputValue().catch(() => ''); H.log(`${id.slice(0, 8)}: name field "${nm}"`);
      if (nm && !nm.includes(name.replace(/_\d$/, '')) && !/neon_mcp_lab/.test(nm)) { H.log('name does not look like mine, skipped'); continue; }
      await page.locator('[id="sysverb_delete"], button:has-text("Delete")').first().click({ timeout: 20000 }); await page.waitForTimeout(4000); await page.locator('#ok_button, button:has-text("Delete")').last().click({ timeout: 15000 }); await page.waitForTimeout(10000);
      H.log(`${name}: ACL rows left with that id: ${await H.count('sys_security_acl', 'sys_id=' + id)}`);
    }
    H.log('ACLs named neon_mcp_lab* now: ' + JSON.stringify((await H.rows('sys_security_acl', 'nameSTARTSWITHneon_mcp_lab', 'name', 10)).map(x => x.name)));
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000);
    for (let t = 0; t < 4; t++) { await page.mouse.click(1536, 25); await page.waitForTimeout(4000); if (await page.getByText('Log out', { exact: true }).count()) break; await page.keyboard.press('Escape'); await page.waitForTimeout(2000); }
    await page.getByText('Log out', { exact: true }).first().click({ timeout: 15000 }).catch(() => H.log('log out click failed')); await page.waitForTimeout(8000); H.log('logged out, elevation ended');
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'acld_error').catch(() => {}); }
  await browser.close();
})();
