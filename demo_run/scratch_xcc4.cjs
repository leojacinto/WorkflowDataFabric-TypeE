const fs = require('fs'); const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const OUT = '/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/xcc/';
fs.mkdirSync(OUT, { recursive: true });
const ROLE = 'ais_high_security_admin';
(async () => {
  const { browser, page } = await H.openBrowser();
  const shot = async n => page.screenshot({ path: OUT + n + '.png' });
  try {
      await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(8000);
      for (let t = 0; t < 5; t++) { if (t % 2 === 0) await page.getByRole('button', { name: /User menu|Account|System Administrator|SA/i }).first().click({ timeout: 15000 }).catch(() => {}); else await page.mouse.click(1536, 25); await page.waitForTimeout(5000); if (await page.getByText('Elevate role', { exact: true }).count()) break; await page.keyboard.press('Escape'); await page.waitForTimeout(3000); }
      await page.getByText('Elevate role', { exact: true }).first().click({ timeout: 15000 }); await page.getByText(/AVAILABLE ROLES/i).first().waitFor({ timeout: 30000 }); await page.waitForTimeout(2000);
      const st = await page.evaluate(() => { const walk = (x, a) => { for (const e of x.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const all = walk(document, []); const t = all.find(e => e.offsetParent !== null && (e.textContent || '').trim() === 'ais_high_security_admin'); if (!t) return null; t.scrollIntoView({ block: 'center' }); const q = t.getBoundingClientRect(); return { x: q.x - 18, y: q.y + q.height / 2 }; });
      if (st) { await page.waitForTimeout(800); const st2 = await page.evaluate(() => { const walk = (x, a) => { for (const e of x.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const t = walk(document, []).find(e => e.offsetParent !== null && (e.textContent || '').trim() === 'ais_high_security_admin'); const q = t.getBoundingClientRect(); return { x: q.x - 18, y: q.y + q.height / 2 }; }); await page.mouse.click(st2.x, st2.y); await page.getByRole('button', { name: 'Update', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(8000); H.log('elevated ais_high_security_admin'); } else { await page.keyboard.press('Escape'); H.log('ais_high_security_admin not offered, already elevated'); }
    await page.goto(`${H.BASE}/now/external-content-connectors/home`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(25000); await shot('01_home');
    await page.getByText('SharePoint Online LF', { exact: true }).first().click({ timeout: 30000 }); await page.waitForTimeout(15000); await shot('10_open_lf');
    console.log(page.url().replace(/^https:\/\/[^/]+/, '')); console.log((await page.evaluate(() => document.body.innerText.slice(0, 700))).replace(/\s+/g, ' '));
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); await shot('err').catch(() => {}); }
  await browser.close();
})();
