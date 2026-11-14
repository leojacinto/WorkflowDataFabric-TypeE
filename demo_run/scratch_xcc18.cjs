const fs = require('fs'); const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const OUT = __dirname + '/xcc/';
(async () => {
  const { browser, page } = await H.openBrowser();
  const shot = async n => page.screenshot({ path: OUT + n + '.png' });
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(15000);
    await page.mouse.click(1566, 25); await page.waitForTimeout(4000);
    await page.getByText('Elevate role', { exact: true }).first().click({ timeout: 15000 });
    const rl = page.getByText('ais_high_security_admin', { exact: true }).first(); await rl.waitFor({ timeout: 90000 }); await page.waitForTimeout(2000); const bb = await rl.boundingBox(); await page.mouse.click(bb.x - 16, bb.y + bb.height / 2); await page.waitForTimeout(1000); await shot('40_checked');
    await page.getByRole('button', { name: 'Update', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(8000); await shot('41_updated');
    await page.goto(`${H.BASE}/now/external-content-connectors/home`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(25000); await shot('42_home');
    const lf = page.getByText('SharePoint Online LF', { exact: true }).first(); await lf.waitFor({ timeout: 90000 }); await lf.click(); await page.waitForTimeout(15000); await shot('43_open');
    await page.mouse.click(1478, 190); await page.waitForTimeout(12000); await shot('44_switched');
    await page.mouse.click(839, 187); await page.waitForTimeout(12000); await shot('45_settings');
    console.log((await page.evaluate(() => document.body.innerText.slice(0, 900))).replace(/\s+/g, ' '));
    const E = fs.readFileSync('/Users/leo.francia/WorkflowDataFabric-TypeE/.env', 'utf8').split(/\r?\n/); const JKSPW = E[25].trim();
    await page.waitForTimeout(3000);
    await page.mouse.click(537, 593); await page.keyboard.press('Meta+A'); await page.keyboard.type(JKSPW, { delay: 15 }); await page.waitForTimeout(1500); await shot('60_pw');
    await page.mouse.click(1128, 754); await page.waitForTimeout(40000); await shot('61_validated');
    console.log((await page.evaluate(() => document.body.innerText.slice(0, 600))).replace(/\s+/g, ' '));
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); await shot('err').catch(() => {}); }
  await browser.close();
})();
