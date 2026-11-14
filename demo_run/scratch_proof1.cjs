// Guide (MCP page): duplicate the agent as "Forecast Variance Neon MCP Lab", add the MCP step and the run_sql tool from the Neon MCP server, test, clean up; by hand (headless).
const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
const NAME = 'Forecast Variance MCP Proof';
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
    const cp = await H.rows('sn_aia_agent', 'nameSTARTSWITHForecast Variance MCP Proof^ORnameSTARTSWITHForecast Variance QB (Copy)', 'sys_id,name,strategy,active', 5); H.log('agent now: ' + JSON.stringify(cp.map(c => ({ n: c.name, id: c.sys_id, strategy: c.strategy && c.strategy.value, active: c.active }))));
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'proof_error').catch(() => {}); }
  finally { await browser.close(); H.log('######## PROOF STAGE 1 ' + (out.error ? 'FAILED: ' + out.error : 'OK')); }
})();
