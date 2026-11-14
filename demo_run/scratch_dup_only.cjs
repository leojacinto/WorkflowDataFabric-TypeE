// Guide (MCP page): duplicate the agent as "Forecast Variance Neon MCP Lab", add the MCP step and the run_sql tool from the Neon MCP server, test, clean up; by hand (headless).
const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const NAME = 'Forecast Variance Neon MCP Lab';
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
const vis = async page => [...new Set(await page.locator('button, a, [role=tab], [role=menuitem], input, textarea').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 70)))].slice(0, 70);
(async () => {
  const out = {}; const { browser, page } = await H.openBrowser();
  try {
    await stepT('1-3. AI Agent Studio > Create and manage > AI agents', async () => { await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); await H.clickText(page, 'AI agents'); await page.waitForTimeout(8000); await H.shot(page, 'mcp3_01_agents'); });
    const existing = (await H.rows('sn_aia_agent', 'nameSTARTSWITHForecast Variance QB (Copy)', 'sys_id,name', 3)); if (existing.length) throw new Error('a copy already exists, stopping'); H.log('  existing duplicate: ' + JSON.stringify(existing.map(e => e.name)));
    await stepT('3-4. open ' + (existing.length ? 'the existing duplicate (rerun)' : 'Forecast Variance QB'), async () => {
      const target = existing.length ? existing[0].name : 'Forecast Variance QB';
      const findRow = name => page.evaluate(name => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const e = walk(document, []).find(e => e.offsetParent !== null && e.getBoundingClientRect().width > 0 && (e.textContent || '').trim() === name && e.children.length <= 1 && e.getBoundingClientRect().x < 600); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + 20, y: r.y + r.height / 2 }; }, name);
      let pos = null; for (let q = 0; q < 14 && !pos; q++) { pos = await findRow(target); if (!pos) await page.waitForTimeout(5000); }
      H.log('  opening ' + target + ' at ' + JSON.stringify(pos)); if (!pos) throw new Error('agent row not found: ' + target); await page.mouse.click(pos.x, pos.y); await page.waitForTimeout(18000); await H.shot(page, 'mcp3_02_agent_open'); H.log('  agent page: ' + JSON.stringify((await vis(page)).slice(0, 45)));
    });
    if (!existing.length) await stepT('4-6. more actions > Duplicate > confirm', async () => {
      await page.locator('[aria-label="Options"]').first().click({ timeout: 15000 }); await page.waitForTimeout(2500); await H.shot(page, 'mcp3_03_menu'); H.log('  menu: ' + JSON.stringify((await vis(page)).filter(t => /duplicate|delete|export|version|archive/i.test(t))));
      await H.clickText(page, 'Duplicate'); await page.waitForTimeout(4000); await H.shot(page, 'mcp3_04_confirm'); H.log('  confirm: ' + JSON.stringify((await vis(page)).filter(t => /duplicate|cancel|close/i.test(t))));
      await page.getByRole('button', { name: 'Duplicate', exact: true }).last().click({ timeout: 10000 }); await page.waitForTimeout(15000); await H.shot(page, 'mcp3_05_new_agent');
    });
    const cp = await H.rows('sn_aia_agent', 'nameSTARTSWITHForecast Variance QB (Copy)', 'sys_id,name,strategy,active,sys_created_on', 5); H.log('copies: ' + JSON.stringify(cp));
  } catch (e) { H.log('FAIL ' + e.message.split('\n')[0]); await H.shot(page, 'dup_err').catch(() => {}); }
  await browser.close();
})();
