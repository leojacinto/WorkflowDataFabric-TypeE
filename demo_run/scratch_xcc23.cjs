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
    await page.goto(`${H.BASE}/now/external-content-connectors/home`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(25000);
    const c7 = page.getByText('SharePoint Online 7', { exact: true }).first(); await c7.waitFor({ timeout: 90000 }); await page.waitForTimeout(2000); await shot('70_home'); await c7.click(); await page.waitForTimeout(15000); await shot('71_c7'); await page.mouse.click(216, 187); await page.waitForTimeout(12000); await shot('72_manage_crawls'); await page.mouse.click(948, 274); await page.waitForTimeout(6000); await shot('73_perm_dialog');
    console.log((await page.evaluate(() => document.body.innerText.slice(0, 500))).replace(/\s+/g, ' '));
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); await shot('err').catch(() => {}); }
  await browser.close();
})();
