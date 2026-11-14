const fs = require('fs'); const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const OUT = __dirname + '/xcc/';
(async () => {
  const { browser, page } = await H.openBrowser();
  const shot = async n => page.screenshot({ path: OUT + n + '.png' });
  try {
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(15000);
    await page.mouse.click(1566, 25); await page.waitForTimeout(4000);
    await page.getByText('Elevate role', { exact: true }).first().click({ timeout: 15000 });
    await page.waitForTimeout(12000); await shot('31_after_click');
    const info = await page.evaluate(() => { const out=[]; const walk=r=>{ r.querySelectorAll('*').forEach(e=>{ if(e.shadowRoot) walk(e.shadowRoot); if(/high_security|Elevate|elevat/i.test(e.textContent||'') && e.children.length===0) out.push(e.tagName+':'+(e.textContent||'').trim().slice(0,80)); }); }; walk(document); return out.slice(0,20); });
    console.log(JSON.stringify(info));
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
