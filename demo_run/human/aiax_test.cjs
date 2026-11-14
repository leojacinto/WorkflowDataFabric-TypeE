// New AI Agent Studio: Run test on the MCP agent with "Help me process EXP-2025-IT-002-1007-01". By hand, headless.
const H = require('./human.cjs'); const NAME = process.env.AGENT_NAME || 'Forecast Variance Neon MCP Lab'; const EVT = 'x_snc_forecast_v_0_expense_transaction_event';
const vis = async page => (await page.locator('a, button, [role=tab], [role=menuitem], input, textarea, h1, h2, h3, label').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || (e.value && e.value.slice(0, 30)) || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 70))).slice(0, 60);
(async () => {
  const { browser, page } = await H.openBrowser(); const out = {};
  try {
    const ag = (await H.rows('sn_aia_agent', 'name=' + NAME, 'sys_id', 1))[0]; if (!ag) throw new Error('agent not found');
    for (const e of await H.rows(EVT, 'event_id=EXP-2025-IT-002-1007-01', 'sys_id')) await H.rest('DELETE', `table/${EVT}/${e.sys_id}`);
    const c = await H.rest('POST', `table/${EVT}`, { event_id: 'EXP-2025-IT-002-1007-01', cost_center: 'CC_IT_001', amount_usd: '5200.75', owner: '6816f79cc0a8016401c5a33be04be441' }); out.evId = c.result && c.result.sys_id; await H.rest('PATCH', `table/${EVT}/${out.evId}`, { vendor: 'Amazon Web Services' });
    const t_start = new Date(Date.now() - 120000).toISOString().replace('T', ' ').slice(0, 19);
    await page.goto(`${H.BASE}/aiux/aia/agent/${ag.sys_id}/visualize`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(45000);
    await page.getByRole('button', { name: 'Run test', exact: true }).first().click({ timeout: 25000 }); await page.waitForTimeout(15000); await H.shot(page, 'aiat_20_run_test'); H.log('after Run test: ' + JSON.stringify(await vis(page)));
    await page.mouse.click(783, 577); await page.keyboard.type('Help me process EXP-2025-IT-002-1007-01', { delay: 30 }); await page.waitForTimeout(1500); await H.shot(page, 'aiat_21_scenario');
    await page.getByRole('button', { name: 'Run single test' }).first().click({ timeout: 15000 }); await page.waitForTimeout(10000); await H.shot(page, 'aiat_22_running');
    const t1 = Date.now(); let plan = null; while (Date.now() - t1 < 1200000) { const pl = await H.rows('sn_aia_execution_plan', `objectiveLIKEEXP-2025-IT-002-1007-01^sys_created_on>${t_start}^ORDERBYDESCsys_created_on`, 'state,sys_created_on,sys_updated_on,objective', 1); if (pl.length) { plan = pl[0]; if (['completed', 'terminated', 'failed', 'cancelled'].includes(String(plan.state).toLowerCase())) break; } await page.waitForTimeout(15000); }
    H.log('plan: ' + JSON.stringify(plan)); await H.shot(page, 'aiat_23_finished');
    const tasks = await H.rows('sn_aia_execution_task', `sys_created_on>${t_start}^descriptionLIKENeon`, 'description,status', 10); H.log('Neon MCP tasks: ' + JSON.stringify(tasks));
    if (!plan || String(plan.state).toLowerCase() !== 'completed') throw new Error('the agent test did not complete: ' + JSON.stringify(plan));
    if (!tasks.some(x => /Get Details via Neon MCP/.test(x.description) && x.status === 'success')) throw new Error('the Get Details via Neon MCP tool did not run successfully'); H.log('PASS: Neon MCP tool ran successfully and the plan completed');
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'aiat_test_error').catch(() => {}); }
  finally { if (out.evId) H.log('cleanup: delete event row http=' + (await H.rest('DELETE', `table/${EVT}/${out.evId}`)).status); await browser.close(); }
})();
