// Sets the key on the Forecast Variance "Neon MCP Lab" API key credential through its classic form. MODE=raw writes the bare key, MODE=bearer writes "Bearer <key>". The key is never logged.
const fs = require('fs'), path = require('path');
const H = require('./human.cjs'); const MODE = process.env.MODE || 'raw';
const KEY = (fs.readFileSync(path.join(__dirname, '..', '..', '.env'), 'utf8').split(/\r?\n/)[5] || '').match(/napi_[A-Za-z0-9]+/)[0];
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    const cr = (await H.rows('api_key_credentials', 'nameSTARTSWITH' + (process.env.CRED_PREFIX || 'Neon MCP Lab_') + '^nameNOT LIKELF^ORDERBYDESCsys_created_on', 'sys_id,name', 1))[0]; if (!cr) throw new Error('no hand-made credential found'); const ID = cr.sys_id; H.log('credential: ' + cr.name);
    await page.goto(`${H.BASE}/api_key_credentials.do?sys_id=${ID}`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(10000);
    const inputs = await page.locator('input:visible, textarea:visible').evaluateAll(els => els.map(e => `${e.id}|${e.type}|${(e.getAttribute('aria-label') || '').slice(0, 30)}`)); H.log('fields: ' + JSON.stringify(inputs.filter(t => /api|key|auth|password|name/i.test(t)).slice(0, 12)));
    const mk = m => m === 'bearer' ? 'Bearer ' + KEY : m === 'raw' ? KEY : ''; const aM = process.env.API_MODE || MODE, uM = process.env.AUTH_MODE || MODE; await page.locator('input[id="api_key_credentials.api_key"]').first().fill(mk(aM), { timeout: 15000 }); await page.locator('input[id="api_key_credentials.authentication_key"]').first().fill(mk(uM), { timeout: 15000 }); H.log('API Key mode ' + aM + ', Authentication Key mode ' + uM);
    await page.locator('#sysverb_update').first().click({ timeout: 15000 }); await page.waitForTimeout(10000); H.log('updated; mod count now ' + ((await H.rows('api_key_credentials', 'sys_id=' + ID, 'sys_mod_count', 1))[0] || {}).sys_mod_count);
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'cred_error').catch(() => {}); }
  await browser.close();
})();
