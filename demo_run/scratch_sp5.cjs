const fs = require('fs'); const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const OUT = '/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/xcc/';
fs.mkdirSync(OUT, { recursive: true });
const ROLE = 'ais_high_security_admin';
(async () => {
  const { browser, page } = await H.openBrowser();
  const shot = async n => page.screenshot({ path: OUT + n + '.png' });
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(15000);
    await page.mouse.click(1566, 25); await page.waitForTimeout(4000);
    await page.getByText('Elevate role', { exact: true }).first().click({ timeout: 15000 });
    const rl = page.getByText('ais_high_security_admin', { exact: true }).first();
    const offered = await rl.waitFor({ timeout: 25000 }).then(() => true).catch(() => false);
    if (offered) { await page.waitForTimeout(2000); const bb = await rl.boundingBox(); await page.mouse.click(bb.x - 16, bb.y + bb.height / 2); await page.waitForTimeout(1000); await page.getByRole('button', { name: 'Update', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(8000); H.log('elevated'); } else { await page.keyboard.press('Escape'); H.log('role not offered (already elevated)'); }
    await page.goto(`${H.BASE}/now/ais-preview-utility/preview`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(45000); await shot('sp_a_loaded');
    await page.getByText('Full visual view', { exact: true }).first().click({ timeout: 20000 }); await page.waitForTimeout(3000); await shot('sp_b_types');
    console.log((await page.evaluate(() => document.body.innerText.slice(0, 600))).replace(/\s+/g, ' | '));
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); await page.screenshot({ path: OUT + 'sp_err.png' }); }
  await browser.close();
})();
