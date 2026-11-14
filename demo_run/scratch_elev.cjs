const fs = require('fs'); const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const OUT = '/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/xcc/';
fs.mkdirSync(OUT, { recursive: true });
const ROLE = 'ais_high_security_admin';
(async () => {
  const { browser, page } = await H.openBrowser();
  const shot = async n => page.screenshot({ path: OUT + n + '.png' });
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(15000);
    for (let t = 0; t < 5; t++) { if (t % 2 === 0) await page.getByRole('button', { name: /User menu|Account|System Administrator|SA/i }).first().click({ timeout: 15000 }).catch(() => {}); else await page.mouse.click(1536, 25); await page.waitForTimeout(5000); if (await page.getByText('Elevate role', { exact: true }).count()) break; await page.keyboard.press('Escape'); await page.waitForTimeout(3000); }
    await page.getByText('Elevate role', { exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(8000); await shot('30_elevate_dialog');
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); await shot('err').catch(() => {}); }
  await browser.close();
})();
