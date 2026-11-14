// Guide (MCP page, step 1): AI Agent Studio > Settings > Manage MCP servers > New, Neon MCP Lab with API Key authentication, by hand (headless). The key comes from .env and is never logged or screenshotted.
const fs = require('fs'), path = require('path');
const H = require('./human.cjs');
const NAME = process.env.SERVER_NAME || 'Neon MCP Lab'; const URLV = 'https://mcp.neon.tech/mcp';
const envLine = fs.readFileSync(path.join(__dirname, '..', '..', '.env'), 'utf8').split(/\r?\n/)[5] || '';
const m = envLine.match(/napi_[A-Za-z0-9]+/); const KEY = m ? m[0] : null;
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
const vis = async page => [...new Set(await page.locator('button, a, [role=tab], [role=menuitem], input, textarea, select').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => `${e.tagName}|${e.getAttribute('aria-label') || e.getAttribute('placeholder') || (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)}|${e.id.slice(-24)}`)))].slice(0, 70);
(async () => {
  const out = {}; const { browser, page } = await H.openBrowser();
  try {
    H.log('key found in .env line 6: ' + !!KEY + (KEY ? ' (length ' + KEY.length + ', value not shown)' : '')); if (!KEY) throw new Error('no napi_ key on .env line 6');
    if (process.env.ELEVATE) {
      await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(8000);
      for (let t = 0; t < 5; t++) { if (t % 2 === 0) await page.getByRole('button', { name: /User menu|Account|System Administrator|SA/i }).first().click({ timeout: 15000 }).catch(() => {}); else await page.mouse.click(1536, 25); await page.waitForTimeout(5000); if (await page.getByText('Elevate role', { exact: true }).count()) break; await page.keyboard.press('Escape'); await page.waitForTimeout(3000); }
      await page.getByText('Elevate role', { exact: true }).first().click({ timeout: 15000 }); await page.getByText(/AVAILABLE ROLES/i).first().waitFor({ timeout: 30000 }); await page.waitForTimeout(2000);
      const st = await page.evaluate(() => { const walk = (x, a) => { for (const e of x.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const all = walk(document, []); const t = all.find(e => e.offsetParent !== null && (e.textContent || '').trim() === 'ai_security_admin'); if (!t) return null; t.scrollIntoView({ block: 'center' }); const q = t.getBoundingClientRect(); return { x: q.x - 18, y: q.y + q.height / 2 }; });
      if (st) { await page.waitForTimeout(800); const st2 = await page.evaluate(() => { const walk = (x, a) => { for (const e of x.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const t = walk(document, []).find(e => e.offsetParent !== null && (e.textContent || '').trim() === 'ai_security_admin'); const q = t.getBoundingClientRect(); return { x: q.x - 18, y: q.y + q.height / 2 }; }); await page.mouse.click(st2.x, st2.y); await page.getByRole('button', { name: 'Update', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(8000); H.log('elevated ai_security_admin'); } else { await page.keyboard.press('Escape'); H.log('ai_security_admin not offered, already elevated'); }
    }
    const existing = await H.rows('sn_awh_registry_mcp_server', 'name=' + NAME, 'sys_id', 2).catch(() => []);
    await stepT('1-2. AI Agent Studio > Settings > Manage MCP servers > New', async () => {
      await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000);
      await page.mouse.click(508, 73); await page.waitForTimeout(9000); await H.clickText(page, 'Manage MCP servers'); await page.waitForTimeout(10000);
      await page.getByRole('button', { name: 'New', exact: true }).first().click({ timeout: 20000 }); await page.waitForTimeout(8000); await H.shot(page, 'mcps_01_new_form'); H.log('  form: ' + JSON.stringify(await vis(page)));
    });
    await stepT('3. Name, Authentication type API Key, URL, Next', async () => {
      await page.mouse.click(783, 433); await page.keyboard.type(NAME, { delay: 40 });
      await page.mouse.click(783, 497); await page.waitForTimeout(1500); await H.shot(page, 'mcps_02_auth_options'); H.log('  auth options: ' + JSON.stringify((await vis(page)).filter(t => /oauth|api key|none|basic|bearer/i.test(t))));
      await page.mouse.click(560, 561); await page.waitForTimeout(2500);
      await page.getByLabel(/MCP server URL/).first().fill(URLV, { timeout: 15000 }); await page.waitForTimeout(1500); await H.shot(page, 'mcps_03_url_typed');
      await page.getByLabel('API Key', { exact: true }).first().fill('Bearer ' + KEY, { timeout: 15000 }); await page.waitForTimeout(1500);
      await page.getByRole('button', { name: 'Add', exact: true }).last().click({ timeout: 15000 }); await page.waitForTimeout(12000); await H.shot(page, 'mcps_04_after_add');
      await page.waitForTimeout(25000);
      let row = null; for (let i = 0; i < 10 && !row; i++) { row = (await H.rows('sn_mcp_server', 'name=' + NAME, 'sys_id,name,sys_scope,connection_alias', 2, ))[0]; if (!row) await page.waitForTimeout(6000); }
      const acl = await H.rows('sys_security_acl', 'type=gen_ai_mcp_server^nameLIKENeon MCP Lab^nameNOT LIKELF', 'name,operation', 5).catch(() => []); H.log('  execute ACL for the new server: ' + JSON.stringify(acl.map(a => a.name))); out.row = row; H.log('  server row: ' + JSON.stringify(row ? { sys_id: row.sys_id, name: row.name, scope: (row.sys_scope && row.sys_scope.value) || row.sys_scope } : null)); if (!row) throw new Error('the new MCP server record does not exist');
    });
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'mcps_error').catch(() => {}); }
  finally { await browser.close(); H.log(`######## MCP SERVER (stage 1) ${out.error ? 'FAILED: ' + out.error : 'OK'}`); }
})();
