// Read-only: AI Admin Hub > Settings, look for "Manage AI models" > "Model providers" and the current provider.
const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  await page.goto(`${H.BASE}/now/now-assist-admin/plugins`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(60000);
  await H.shot(page, 'ais_settings');
  try { await page.getByRole('button', { name: 'Done' }).click({ timeout: 3000 }); } catch (e) {}
  await page.getByText('Manage AI models', { exact: true }).first().click(); await page.waitForTimeout(4000);
  await H.shot(page, 'ais_models_open');
  for (const k of ['Manage model providers', 'Model providers']) { try { await page.getByText(k, { exact: true }).first().click({ timeout: 5000 }); await page.waitForTimeout(90000); H.log('clicked ' + k); await H.shot(page, 'ais_' + k.replace(/ /g, '_')); } catch (e) { H.log('not clickable: ' + k); } }
  const t = await page.evaluate(() => { const o = []; const walk = r => { for (const e of r.querySelectorAll('*')) { if (e.shadowRoot) walk(e.shadowRoot); } o.push(r.textContent || ''); }; walk(document); return o.join(' ').replace(/\s+/g, ' '); });
  for (const k of ['Manage AI models', 'Manage model providers', 'Model providers', 'Azure OpenAI', 'Now LLM Service', 'Edit model provider']) H.log(`${k}: ${t.includes(k)}`);
  await browser.close();
})();
