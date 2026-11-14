const fs = require('fs'); const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const OUT = '/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/sp/';
const L = fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/.env', 'utf8').split(/\r?\n/);
const URLV = L[18].trim(), EMAIL = L[19].trim(), PW = L[20].trim();
(async () => {
  const { chromium } = require(require.resolve('playwright-core', { paths: ['/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/headless-toolkit'] }));
  const browser = await chromium.launch({ headless: true }); const page = await (await browser.newContext({ viewport: { width: 1400, height: 900 } })).newPage();
  try {
    await page.goto(URLV, { waitUntil: 'domcontentloaded', timeout: 60000 }); await page.waitForTimeout(8000);
    await page.locator('input[type=email], input[name*=mail i], input').first().fill(EMAIL); await page.getByRole('button', { name: /next/i }).first().click(); await page.waitForTimeout(8000);
    console.log('after email host:', new URL(page.url()).host); await page.screenshot({ path: OUT + 'spo_2.png' });
    const pw = page.locator('input[type=password]'); if (await pw.count()) { await pw.first().fill(PW); await page.keyboard.press('Enter'); await page.waitForTimeout(12000); }
    console.log('after password host:', new URL(page.url()).host); await page.screenshot({ path: OUT + 'spo_3.png' });
    console.log('text:', (await page.evaluate(() => document.body.innerText.slice(0, 300))).replace(/\s+/g, ' '));
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0].replace(URLV, '<url>')); }
  await browser.close();
})();
