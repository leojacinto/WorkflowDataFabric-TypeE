// Elevate ai_security_admin and security_admin if offered, then check whether the new Access Control form becomes editable.
const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(8000);
    await page.getByRole('button', { name: /User menu|Account|System Administrator|SA/i }).first().click({ timeout: 20000 }).catch(async () => { await page.mouse.click(1536, 25); }); await page.waitForTimeout(4000); await H.clickText(page, 'Elevate role'); await page.waitForTimeout(5000);
    const roles = await page.evaluate(() => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; return walk(document, []).filter(e => e.offsetParent !== null && /^[a-z_]*admin[a-z_]*$/.test((e.textContent || '').trim()) && e.children.length === 0).map(e => (e.textContent || '').trim()); });
    H.log('roles offered: ' + JSON.stringify([...new Set(roles)]));
    for (const role of ['ai_security_admin', 'security_admin']) {
      const box = await page.evaluate(r => { const walk = (x, a) => { for (const e of x.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const t = walk(document, []).find(e => e.offsetParent !== null && (e.textContent || '').trim() === r && e.children.length === 0); if (!t) return null; t.scrollIntoView({ block: 'center' }); const q = t.getBoundingClientRect(); return { x: q.x - 18, y: q.y + q.height / 2 }; }, role);
      if (box) { await page.waitForTimeout(800); const b2 = await page.evaluate(r => { const walk = (x, a) => { for (const e of x.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const t = walk(document, []).find(e => e.offsetParent !== null && (e.textContent || '').trim() === r && e.children.length === 0); const q = t.getBoundingClientRect(); return { x: q.x - 18, y: q.y + q.height / 2 }; }, role); await page.mouse.click(b2.x, b2.y); H.log('ticked ' + role); await page.waitForTimeout(1000); } else H.log(role + ' not offered');
    }
    await H.shot(page, 'acl3_01_ticked'); await page.getByRole('button', { name: 'Update', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(8000);
    await page.goto(`${H.BASE}/sys_security_acl.do?sys_id=-1`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(15000); await H.shot(page, 'acl3_02_new_acl');
    H.log('type field: ' + JSON.stringify(await page.locator('input[id="sys_security_acl.type_label"]').first().evaluate(e => ({ readOnly: e.readOnly, cls: e.className.slice(0, 40) }))));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'acl3_error').catch(() => {}); }
  await browser.close();
})();
