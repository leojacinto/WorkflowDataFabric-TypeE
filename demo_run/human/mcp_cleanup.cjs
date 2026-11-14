// Removes the duplicated test agent "Forecast Variance Neon MCP Lab" through the AI agents list (select row, Delete, confirm).
const H = require('./human.cjs'); const NAME = process.env.AGENT_NAME || 'Forecast Variance Neon MCP Lab';
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    const before = await H.rows('sn_aia_agent', `name=${NAME}`, 'sys_id,name', 3); H.log('agents named ' + NAME + ' before: ' + before.length); if (!before.length) { await browser.close(); return; }
    await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(14000); await H.clickText(page, 'AI agents'); await page.waitForTimeout(9000);
    const pos = await page.evaluate(name => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const all = walk(document, []); const vis = e => e.offsetParent !== null && e.getBoundingClientRect().width > 0;
      const t = all.find(e => vis(e) && ((e.textContent || '').trim() === name || (name.length > 40 && (e.textContent || '').trim().startsWith(name.slice(0, 40)) && (e.textContent || '').trim().length < name.length + 5)) && e.children.length <= 1); if (!t) return null; const y = t.getBoundingClientRect().y + t.getBoundingClientRect().height / 2;
      const cb = all.filter(e => vis(e) && (e.getAttribute('aria-label') || '').startsWith('Select row') && Math.abs((e.getBoundingClientRect().y + e.getBoundingClientRect().height / 2) - y) < 25)[0]; if (!cb) return { noCheckbox: true, y }; const r = cb.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, NAME);
    H.log('row checkbox: ' + JSON.stringify(pos)); if (!pos || pos.noCheckbox) throw new Error('row for ' + NAME + ' not found in the list');
    await page.mouse.click(pos.x, pos.y); await page.waitForTimeout(2000); await H.shot(page, 'mcpc_01_selected');
    await page.getByRole('button', { name: 'Delete', exact: true }).first().click({ timeout: 10000 }); await page.waitForTimeout(3000); await H.shot(page, 'mcpc_02_confirm');
    await page.getByRole('button', { name: /^(Delete|Confirm|Yes)/ }).last().click({ timeout: 10000 }); await page.waitForTimeout(12000); await H.shot(page, 'mcpc_03_after');
    const after = await H.rows('sn_aia_agent', `name=${NAME}`, 'sys_id', 3); const keep = await H.rows('sn_aia_agent', 'nameLIKEForecast Variance^nameNOT LIKENeon', 'name', 10);
    H.log(`agents named ${NAME} after: ${after.length} | other Forecast Variance agents kept: ${JSON.stringify(keep.map(k => k.name))}`);
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'mcpc_error').catch(() => {}); }
  await browser.close();
})();
