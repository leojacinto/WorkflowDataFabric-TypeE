// New AI Agent Studio (/aiux/aia), MCP exercise by hand (headless): copy QB, rename, MCP bullet under Step 2, Save, Add tool > MCP server tool.
const H = require('./human.cjs');
const NAME = 'Forecast Variance Neon MCP Lab';
const BULLET = '- Also run the MCP tool "Get Details via Neon MCP" as a secondary check. Only return one entry (limit = 1). Columns should be ["COST_CENTER", "ACTUAL_AMOUNT_USD", "BASELINE_AMOUNT_USD", "VARIANCE", "VARIANCE_PCT"]';
const vis = async page => (await page.locator('a, button, [role=tab], [role=menuitem], [role=option], input, textarea, h1, h2, h3, label').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || (e.value && e.value.slice(0, 30)) || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 70))).slice(0, 70);
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
(async () => {
  const { browser, page } = await H.openBrowser(); const out = {};
  try {
    const qb = (await H.rows('sn_aia_agent', 'name=Forecast Variance QB', 'sys_id,instructions', 1))[0]; const base = qb.instructions; const marker = 'Under Budget.'; const i = base.indexOf(marker); if (i < 0) throw new Error('Step 2 text not found in QB instructions');
    const newText = base.slice(0, i + marker.length) + '\n' + BULLET + base.slice(i + marker.length);
    let ag = (await H.rows('sn_aia_agent', 'name=' + NAME, 'sys_id,name', 1))[0];
    if (!ag) await stepT('1-4. AI agents > Forecast Variance QB > more options > Copy', async () => {
      await page.goto(`${H.BASE}/aiux/aia/agent/${qb.sys_id}/visualize`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(45000);
      await page.getByRole('button', { name: 'More options' }).first().click({ timeout: 25000 }); await page.waitForTimeout(3000); await page.getByText('Copy', { exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(15000);
      ag = (await H.rows('sn_aia_agent', 'name=Forecast Variance QB (Copy)', 'sys_id,name', 1))[0]; if (!ag) throw new Error('copy not created'); H.log('  copy created ' + ag.sys_id.slice(0, 8));
    });
    await stepT('5-6. open the copy, Edit, rename, MCP bullet, Save', async () => {
      await page.goto(`${H.BASE}/aiux/aia/agent/${ag.sys_id}/visualize`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(45000);
      await page.getByRole('button', { name: 'Edit' }).first().click({ timeout: 25000 }); await page.waitForTimeout(10000);
      await page.getByRole('textbox', { name: /^Name/ }).first().fill(NAME, { timeout: 15000 }); await page.waitForTimeout(1000);
      await page.mouse.click(727, 700); await page.keyboard.press('ControlOrMeta+A'); await page.keyboard.type(newText, { delay: 0 }); await page.waitForTimeout(2000); await H.shot(page, 'aiaf_01_filled');
      await page.getByRole('button', { name: 'Save', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(15000);
      const saved = (await H.rows('sn_aia_agent', 'sys_id=' + ag.sys_id, 'name,instructions', 1))[0]; out.saved = saved && saved.name === NAME && saved.instructions.includes('Get Details via Neon MCP') && saved.instructions.split('\n').length >= base.split('\n').length; H.log('  saved name ' + (saved && saved.name) + ', bullet in instructions: ' + (saved && saved.instructions.includes('Get Details via Neon MCP')));
      if (saved) { const lines = saved.instructions.split('\n'); const k = lines.findIndex(l => l.includes('Get Details via Neon MCP')); H.log('  line before bullet: ' + (lines[k - 1] || '').slice(0, 60) + ' | line after: ' + (lines[k + 1] || '').slice(0, 40)); }
    });
    await stepT('7. + Add tool', async () => {
      const addBtn = page.getByRole('button', { name: '+ Add tool' }).first(); await addBtn.scrollIntoViewIfNeeded(); await page.waitForTimeout(1500); await H.shot(page, 'aiaf_02a_before_add_tool'); await addBtn.click({ timeout: 20000 }); await page.waitForTimeout(8000); await H.shot(page, 'aiaf_02_add_tool'); H.log('  after + Add tool: ' + JSON.stringify(await vis(page)));
    });
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'aiaf_error').catch(() => {}); }
  finally { await browser.close(); H.log('######## NEW STUDIO STAGE ' + (out.error ? 'FAILED: ' + out.error : 'OK')); }
})();
