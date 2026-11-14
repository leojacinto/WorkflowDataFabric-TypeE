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
    await page.goto(`${H.BASE}/now/external-content-connectors/home`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(25000);
    const lf = page.getByText('SharePoint Online LF', { exact: true }).first(); await lf.waitFor({ timeout: 90000 }); await page.waitForTimeout(3000); const lb = await lf.boundingBox();
    await page.mouse.click(1165, lb.y + lb.height / 2); await page.waitForTimeout(3000); await page.mouse.click(1195, lb.y + lb.height / 2 + 126); await page.waitForTimeout(4000);
    if (Math.abs(lb.y - 598) > 30) throw new Error('LF row is not where expected: ' + lb.y);
    await page.mouse.click(549, 535); await page.mouse.click(1001, 578); await page.waitForTimeout(15000); await shot('20_deleted');
    await page.goto(`${H.BASE}/now/external-content-connectors/home`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(25000); await shot('01_home');
    const cr = page.getByRole('button', { name: 'Create', exact: true }).first(); await cr.click({ timeout: 30000 }); await page.waitForTimeout(8000); await shot('02_create');
    await page.mouse.click(400, 730); await page.waitForTimeout(2000); await page.mouse.click(1550, 965); await page.waitForTimeout(10000); await shot('03_form');
    const E = fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/.env', 'utf8').split(/\r?\n/); const JKSPW = E[25].trim(), THUMB = E[29].trim();
    const typeAt = async (x, y, t) => { await page.mouse.click(x, y); await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A'); await page.keyboard.type(t, { delay: 15 }); };
    await typeAt(555, 291, 'SharePoint Online LF');
    await typeAt(555, 373, '26ec3997-e7da-4a95-91dd-d19f8c66b849'); await typeAt(555, 439, '53136633-b712-40ba-8c0b-0747745c05be');
    const [fc] = await Promise.all([page.waitForEvent('filechooser', { timeout: 20000 }), page.mouse.click(365, 508)]); await fc.setFiles('/Users/leo.francia/WorkflowDataFabric-TypeE/ms-spo-connector-cert.jks'); await page.waitForTimeout(6000);
    await shot('04_filled_nosecrets');
    await typeAt(555, 584, JKSPW); await typeAt(555, 650, THUMB); await page.waitForTimeout(1500);
    await page.mouse.click(1497, 965); await page.waitForTimeout(30000); await shot('05_validated');
    console.log('validated');
    const step = async (n) => { await page.waitForTimeout(8000); await shot(n); console.log(n + ': ' + (await page.evaluate(() => document.body.innerText.slice(0, 500))).replace(/\s+/g, ' ').slice(0, 420)); };
    await page.mouse.click(1550, 965); await step('21_after_validate_next');
    await page.mouse.click(1550, 965); await step('22_next2');
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); await shot('err').catch(() => {}); }
  await browser.close();
})();
