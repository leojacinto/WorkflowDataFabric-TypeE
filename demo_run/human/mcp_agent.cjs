// Guide (MCP page): duplicate the agent as "Forecast Variance Neon MCP Lab", add the MCP step and the run_sql tool from the Neon MCP server, test, clean up; by hand (headless).
const H = require('./human.cjs');
const NAME = 'Forecast Variance Neon MCP Lab';
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
const vis = async page => [...new Set(await page.locator('button, a, [role=tab], [role=menuitem], input, textarea').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 70)))].slice(0, 70);
(async () => {
  const out = {}; const { browser, page } = await H.openBrowser();
  try {
    await stepT('1-3. AI Agent Studio > Create and manage > AI agents', async () => { await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); await H.clickText(page, 'AI agents'); await page.waitForTimeout(8000); await H.shot(page, 'mcp3_01_agents'); });
    const existing = (await H.rows('sn_aia_agent', `name=${NAME}^ORname=Forecast Variance QB (Copy)`, 'sys_id,name', 3)); H.log('  existing duplicate: ' + JSON.stringify(existing.map(e => e.name)));
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
    await page.locator('textarea[id$="details_step-instructions"]').first().waitFor({ state: 'attached', timeout: 90000 }).catch(() => {}); await page.locator('textarea[id$="details_step-instructions"]').first().scrollIntoViewIfNeeded().catch(() => {});
    const saved = (await page.locator('textarea[id$="details_step-instructions"]').first().inputValue().catch(() => '')).includes('Get Details via Neon MCP'); H.log('  agent already saved with the MCP bullet: ' + saved);
    if (!saved) await stepT('6. rename to ' + NAME, async () => {
      const inputs = page.locator('input:visible'); const ic = await inputs.count(); let renamed = false;
      for (let i = 0; i < ic; i++) { const val = await inputs.nth(i).inputValue().catch(() => ''); if (/Forecast Variance QB \(Copy\)|Forecast Variance Neon MCP Lab/.test(val)) { await inputs.nth(i).fill(NAME, { timeout: 30000 }); renamed = true; break; } }
      if (!renamed) throw new Error('the AI agent name field was not found'); await page.waitForTimeout(1500); await H.shot(page, 'mcp3_06_renamed');
    });
    if (!saved) await stepT('7-8. add the MCP bullet under Step 2, Save and continue', async () => {
      const BULLET = 'Also run the MCP tool "Get Details via Neon MCP" as a secondary check. Only return one entry (limit = 1). Columns should be ["COST_CENTER", "ACTUAL_AMOUNT_USD", "BASELINE_AMOUNT_USD", "VARIANCE", "VARIANCE_PCT"].';
      const all = page.locator('textarea'); const cnt = await all.count(); let ta = null; for (let q = 0; q < cnt; q++) { const t = all.nth(q); const val = await t.inputValue().catch(() => ''); if (/Step 2:/.test(val) && await t.isVisible().catch(() => false)) { ta = t; break; } }
      if (!ta) { for (let q = 0; q < cnt; q++) { const t = all.nth(q); const val = await t.inputValue().catch(() => ''); if (/Step 2:/.test(val)) { ta = t; H.log('  steps textarea found but hidden, id ' + (await t.getAttribute('id'))); break; } } }
      if (!ta) throw new Error('no textarea holds the agent steps'); await ta.scrollIntoViewIfNeeded().catch(() => {}); await page.waitForTimeout(1500); const v = await ta.inputValue();
      const paras = v.split('\n\n'); const k = paras.findIndex(p => /^Step 2:/.test(p.trim())); if (k < 0) { H.log('  instructions text: ' + JSON.stringify(v).slice(0, 1800)); throw new Error('Step 2 not found in the agent steps'); }
      if (v.includes('Get Details via Neon MCP')) H.log('  bullet already there (rerun)'); else { paras[k] = paras[k].trimEnd() + '\n- ' + BULLET;
        let box = null; for (let w = 0; w < 14 && !box; w++) { const bb = await ta.boundingBox(); if (bb && bb.width > 0 && bb.y > 120 && bb.y + 40 < 950) box = { x: bb.x + bb.width / 2, y: bb.y + 30 }; if (!box) { await page.mouse.move(800, 650); await page.mouse.wheel(0, 350); await page.waitForTimeout(800); } }
        if (!box) { H.log('  boundingBox of the textarea: ' + JSON.stringify(await ta.boundingBox()) + ' visible=' + await ta.isVisible()); H.log('  geometry: ' + JSON.stringify(await page.evaluate(() => ({ h: window.innerHeight, tas: [...document.querySelectorAll('textarea')].map(e => { const r = e.getBoundingClientRect(); return [e.id.slice(-30), Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; }), scrollers: [...document.querySelectorAll('*')].filter(e => e.scrollHeight > e.clientHeight + 50 && getComputedStyle(e).overflowY !== 'visible').map(e => e.tagName + '.' + (e.className || '').toString().slice(0, 30) + ':' + e.scrollTop + '/' + e.scrollHeight).slice(0, 6) })))); await H.shot(page, 'mcp3_noview'); throw new Error('the steps textarea never came into view'); }
        await page.mouse.click(box.x, box.y); await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A'); await page.keyboard.insertText(paras.join('\n\n')); H.log('  bullet added under Step 2 (typed like a person)'); } await page.waitForTimeout(1500); await H.shot(page, 'mcp3_07_bullet');
      await page.getByRole('button', { name: 'Save and continue' }).first().click({ timeout: 15000 }); await page.waitForTimeout(5000); if (await page.getByText('Save updates?').count()) { await page.getByRole('button', { name: 'Save updates' }).first().click({ timeout: 10000 }); H.log('  extra dialog "Save updates?" confirmed'); } await page.waitForTimeout(15000); await H.shot(page, 'mcp3_08_after_save'); H.log('  page: ' + JSON.stringify((await vis(page)).slice(0, 30)));
    });
    await stepT('9. Add tools and information > Add tool > MCP server tool', async () => {
      if (!(await page.getByText('Add tool', { exact: true }).count())) { await H.clickText(page, 'Add tools and information'); await page.waitForTimeout(10000); }
      await H.shot(page, 'mcp3_09_tools'); H.log('  tools page: ' + JSON.stringify((await vis(page)).slice(0, 30)));
      await page.mouse.click(1474, 269); await page.waitForTimeout(3000); await H.shot(page, 'mcp3_10_add_tool_menu'); H.log('  add tool menu: ' + JSON.stringify((await vis(page)).filter(t => /mcp|server|subflow|flow|action|catalog|script|search|capability|tool/i.test(t))));
    });
    await stepT('9b. MCP server tool dialog: server, run_sql', async () => {
      const dt = await page.evaluate(() => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { if (e.shadowRoot) walk(e.shadowRoot, a); } a.push(r.textContent || ''); return a; }; return walk(document, []).join(' '); });
      if (/Get Details via Neon MCP/.test(dt)) { H.log('  tool already on the agent (rerun)'); out.toolExists = true; return; }
      await page.mouse.click(1446, 521); await page.waitForTimeout(6000); await H.shot(page, 'mcp3_11_mcp_dialog');
      await page.mouse.click(775, 349); await page.waitForTimeout(3000); await H.shot(page, 'mcp3_12_server_list'); H.log('  server options: ' + JSON.stringify((await vis(page)).filter(t => /neon|mcp|aws|azure|datadog/i.test(t))));
      const sp = await page.evaluate((srv) => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const hits = walk(document, []).filter(e => e.offsetParent !== null && e.getBoundingClientRect().width > 0 && (e.textContent || '').trim() === srv && e.getBoundingClientRect().y > 380).map(e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }); return hits[0] || null; }, process.env.MCP_SERVER || 'Neon MCP Lab');
      H.log('  server option "' + (process.env.MCP_SERVER || 'Neon MCP Lab') + '" at ' + JSON.stringify(sp)); if (!sp) throw new Error('the server is not in the dropdown'); await page.mouse.click(sp.x, sp.y); await page.waitForTimeout(30000); await H.shot(page, 'mcp3_13_server_chosen'); { const fe = await page.getByText('Unable to fetch the tools for the MCP server').count(); H.log('  TOOL FETCH ERROR shown: ' + (fe > 0)); if (process.env.PROBE) throw new Error('probe done, tool fetch error shown: ' + (fe > 0)); } H.log('  after server: ' + JSON.stringify((await vis(page)).filter(t => /tool|run_sql|name|save|execution|autonomous|supervised|neon|sql|project/i.test(t))));

      await page.mouse.click(775, 417); await page.waitForTimeout(2500); await page.keyboard.type('Run SQL', { delay: 50 }); await page.waitForTimeout(3500); await H.shot(page, 'mcp3_14_tool_list');
      await page.mouse.click(700, 495); await page.waitForTimeout(6000); await H.shot(page, 'mcp3_15_tool_chosen');
      const DESC = 'project_id: bitter-lab-28038915 (snake_case, not projectId)\nsql: SELECT cost_center, actual_amount_usd, baseline_amount_usd, variance, variance_pct FROM "VARIANCE_BASELINE_V" WHERE cost_center = \'{{cost_center}}\' LIMIT 1';
      await page.locator('input[id$="tools_step-tool_name"]').first().fill('Get Details via Neon MCP'); await page.locator('textarea[id$="tools_step-tool_description"]').first().fill(DESC);
      await page.locator('input[id$="tool_exec_mode-autopilot"]').first().check({ force: true }); await page.waitForTimeout(1500); await H.shot(page, 'mcp3_16_filled');
      await page.getByRole('button', { name: 'Add', exact: true }).last().click({ timeout: 15000 }); await page.waitForTimeout(12000); await H.shot(page, 'mcp3_17_saved');
      const dt2 = await page.evaluate(() => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { if (e.shadowRoot) walk(e.shadowRoot, a); } a.push(r.textContent || ''); return a; }; return walk(document, []).join(' '); });
      out.toolAdded = /Get Details via Neon MCP/.test(dt2); H.log('  tool visible on the agent after Save: ' + out.toolAdded);
    });
    await stepT('9c-12. Save and continue through security, triggers, channels', async () => {
      for (let i = 0; i < 6; i++) {
        if (await page.getByText('Define who can access this AI agent').count()) { const empty = (await page.getByText('Role(s)').count()) > 0; if (empty) { await page.mouse.click(543, 474); await page.keyboard.type('admin', { delay: 60 }); await page.waitForTimeout(4000); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await page.waitForTimeout(2500); H.log('  user access: Role(s) set to admin'); await H.shot(page, 'mcp3_roles'); } }
        const btn = page.getByRole('button', { name: /^(Save and continue|Save)$/ }).last(); if (!(await btn.count())) break;
        await btn.click({ timeout: 15000 }).catch(() => {}); await page.waitForTimeout(8000);
        if (await page.getByText('Save updates?').count()) await page.getByRole('button', { name: 'Save updates' }).first().click({ timeout: 8000 }).catch(() => {});
        for (const name of ['Ignore and continue', 'Continue']) { const b = page.getByRole('button', { name }); if (await b.count()) { await b.first().click({ timeout: 8000 }).catch(() => {}); H.log('  clicked ' + name); await page.waitForTimeout(6000); } }
        await H.shot(page, 'mcp3_2' + i); const heading = (await vis(page)).filter(t => /define security|define user|define data|add triggers|select channels|test|activate/i.test(t)); H.log('  page ' + i + ': ' + JSON.stringify(heading.slice(0, 8)));
        if (/Test AI reasoning|Continue to test chat response/.test(await page.evaluate(() => document.body.innerText).catch(() => ''))) break;
      }
    });
    await stepT('12-13. channels on, Save and test, Ignore and continue', async () => {
      const sw = page.locator('input[role=switch], [role=switch]'); const cnt = await sw.count(); let clicked = 0;
      for (let i = 0; i < Math.min(cnt, 2); i++) { const on = await sw.nth(i).evaluate(e => e.checked === true || e.getAttribute('aria-checked') === 'true'); if (!on) { await sw.nth(i).click({ force: true }).catch(async () => { await page.mouse.click(1133, i ? 661 : 439); }); clicked++; } }
      H.log(`  channel switches found ${cnt}, turned on ${clicked}`); await page.waitForTimeout(2000); await H.shot(page, 'mcp3_30_channels');
      await page.getByRole('button', { name: 'Save and test' }).first().click({ timeout: 15000 }); await page.waitForTimeout(5000); if (await page.getByText('Save updates?').count()) { await page.getByRole('button', { name: 'Save updates' }).first().click({ timeout: 8000 }).catch(() => H.log('  Save updates button gone already')); H.log('  extra dialog "Save updates?" handled'); await page.waitForTimeout(6000); }
      const ig = page.getByRole('button', { name: /Ignore and continue/ }); if (await ig.count()) { await ig.first().click({ timeout: 8000 }); H.log('  clicked Ignore and continue (duplicates alert)'); } await page.waitForTimeout(12000); await H.shot(page, 'mcp3_31_test_tab'); H.log('  test tab: ' + JSON.stringify((await vis(page)).slice(0, 30)));
    });
    await stepT('14-16. test: Help me process EXP-2025-IT-002-1007-01', async () => {
      const EVT = 'x_snc_forecast_v_0_expense_transaction_event';
      for (const e of await H.rows(EVT, 'event_id=EXP-2025-IT-002-1007-01', 'sys_id')) await H.rest('DELETE', `table/${EVT}/${e.sys_id}`);
      const c = await H.rest('POST', `table/${EVT}`, { event_id: 'EXP-2025-IT-002-1007-01', cost_center: 'CC_IT_001', amount_usd: '5200.75', owner: '6816f79cc0a8016401c5a33be04be441' }); out.evId = c.result && c.result.sys_id; await H.rest('PATCH', `table/${EVT}/${out.evId}`, { vendor: 'Amazon Web Services' });
      const t_start = new Date(Date.now() - 120000).toISOString().replace('T', ' ').slice(0, 19); await H.shot(page, 'mcp3_32_before_task'); await page.locator('textarea').filter({ visible: true }).first().fill('Help me process EXP-2025-IT-002-1007-01').catch(async () => { await page.mouse.click(780, 480); await page.keyboard.type('Help me process EXP-2025-IT-002-1007-01'); });
      await page.getByRole('button', { name: 'Continue to test chat response' }).first().click({ timeout: 20000 }); await page.waitForTimeout(8000); await H.shot(page, 'mcp3_33_running');
      const t1 = Date.now(); let plan = null; while (Date.now() - t1 < 1200000) { const pl = await H.rows('sn_aia_execution_plan', `objectiveLIKEEXP-2025-IT-002-1007-01^sys_created_on>${t_start}^ORDERBYDESCsys_created_on`, 'state,sys_created_on,sys_updated_on,objective', 1); if (pl.length) { plan = pl[0]; if (['completed', 'terminated', 'failed', 'cancelled'].includes(String(plan.state).toLowerCase())) break; } await page.waitForTimeout(15000); }
      H.log('  plan: ' + JSON.stringify(plan)); if (!plan || String(plan.state).toLowerCase() !== 'completed') throw new Error('the agent test did not complete: ' + JSON.stringify(plan));
      const tasks = await H.rows('sn_aia_execution_task', `sys_created_on>${t_start}^descriptionLIKENeon`, 'description,status', 10); out.mcpTasks = tasks; H.log('  Neon MCP tasks: ' + JSON.stringify(tasks)); await H.shot(page, 'mcp3_34_finished');
      if (!tasks.some(x => /Get Details via Neon MCP/.test(x.description) && x.status === 'success')) throw new Error('the Get Details via Neon MCP tool did not run successfully');
    });
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'mcp3_error').catch(() => {}); }
  finally { if (out.evId) H.log('  cleanup: delete event row http=' + (await H.rest('DELETE', `table/x_snc_forecast_v_0_expense_transaction_event/${out.evId}`)).status);
    await browser.close(); H.log(`######## MCP AGENT (stage 1) ${out.error ? 'FAILED: ' + out.error : 'OK'}`); }
})();
