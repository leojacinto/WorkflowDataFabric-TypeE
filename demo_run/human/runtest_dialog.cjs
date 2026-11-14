// Read-only: open the Run test dialog of the QB agent in the new studio, look at the Test scenario field, never submit.
const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  await page.goto(`${H.BASE}/aiux/aia/agent/585f26efe0f3494184b0cc13ba3b92df/visualize`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(45000);
  await H.shot(page, 'rt_canvas');
  await page.getByRole('button', { name: 'Run test' }).first().click({ timeout: 15000 });
  await page.waitForTimeout(8000);
  await H.shot(page, 'rt_dialog');
  const info = await page.evaluate(() => { const o=[]; const walk=r=>{for(const e of r.querySelectorAll('*')){ if(e.shadowRoot) walk(e.shadowRoot); if(['TEXTAREA','INPUT','SELECT'].includes(e.tagName)||e.getAttribute('contenteditable')==='true') o.push(e.tagName+' '+(e.getAttribute('placeholder')||'')+' '+(e.getAttribute('aria-label')||'')+' ro='+(e.readOnly||e.disabled||false)); }}; walk(document); return o; });
  H.log(JSON.stringify(info));
  await browser.close();
})();
