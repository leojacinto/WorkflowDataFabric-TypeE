// Guide (Zero Copy Connectors page): Hands-on: Test the Forecast Variance AI Agent + Completion: Verify Finance Case, done like a participant (headless).
const H = require('./human.cjs');
const EVT = 'x_snc_forecast_v_0_expense_transaction_event'; const AGENT = process.env.AGENT || 'Forecast Variance QA';
const times = []; const stepT = async (n, fn) => { const t = Date.now(); H.log('>>> ' + n); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([n, s]); H.log(`<<< ${n} ${s}s`); } };
(async () => {
  const out = {}; let evId = null; const { browser, page } = await H.openBrowser();
  try {
    await stepT('setup: the expense event from the Integration Hub step (REST, no trigger fire)', async () => {
      for (const e of await H.rows(EVT, 'event_id=EXP-2025-IT-002-1007-01', 'sys_id')) await H.rest('DELETE', `table/${EVT}/${e.sys_id}`);
      const c = await H.rest('POST', `table/${EVT}`, { event_id: 'EXP-2025-IT-002-1007-01', cost_center: 'CC_IT_001', amount_usd: '5200.75', owner: '6816f79cc0a8016401c5a33be04be441' });
      evId = c.result && c.result.sys_id; await H.rest('PATCH', `table/${EVT}/${evId}`, { vendor: 'Amazon Web Services' }); H.log('  event row ready ' + evId);
    });
    const t_start = H.utc();
    await stepT('1. AI Agent Studio > Create and manage', async () => { await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000); await H.shot(page, 'zcc_01_agent_studio'); });
    await stepT('2. Testing tab, Start manual test', async () => { await page.getByText('Testing', { exact: true }).first().click(); await page.waitForTimeout(5000); await page.getByRole('button', { name: /Start manual test/i }).first().click(); await page.waitForTimeout(5000); });
    await stepT('3a. test type: AI agent or workflow', async () => { await page.locator('[id$="test_type_select"]').first().click(); await page.waitForTimeout(1500); await page.mouse.click(130, 369); await page.waitForTimeout(3000); });
    await stepT('3b. agent name', async () => { const i = page.locator('input[id$="agent_workflow_dropdown"]').first(); await i.click(); await i.fill(AGENT); await page.waitForTimeout(9000); await H.shot(page, 'zcc_02_agent_search'); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await page.waitForTimeout(3000); });
    await stepT('3c. version 1 - V1 (Active)', async () => { await page.locator('[id$="version_select"]').first().click(); await page.waitForTimeout(1500); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await page.waitForTimeout(2000); });
    await stepT('3d. task text', async () => { await page.locator('textarea[id$="task_textarea"]').first().fill('Review expense event EXP-2025-IT-002-1007-01'); await H.shot(page, 'zcc_03_form_filled'); });
    await stepT('3e. Continue to test chat response', async () => { await page.getByRole('button', { name: /Continue to test chat response/i }).first().click({ timeout: 20000 }); await page.waitForTimeout(8000); await H.shot(page, 'zcc_04_running'); });
    await stepT('4-5. the agent runs to the end', async () => {
      const t1 = Date.now();
      while (Date.now() - t1 < 1200000) {
        const pl = await H.rows('sn_aia_execution_plan', `objectiveLIKEEXP-2025-IT-002-1007-01^sys_created_on>${t_start}^ORDERBYDESCsys_created_on`, 'state,sys_created_on,sys_updated_on', 1);
        if (pl.length) { out.plan = pl[0]; if (String(pl[0].state).toLowerCase() === 'completed') { H.log('  plan completed ' + JSON.stringify(pl[0])); return; } }
        await page.waitForTimeout(20000);
      }
      throw new Error('agent run did not complete in 20 minutes: ' + JSON.stringify(out.plan || 'never started'));
    });
    await H.shot(page, 'zcc_05_finished');
    await stepT('Verify Finance Case (list, newest first)', async () => {
      const cs = await H.rows('sn_spend_sdc_service_request', `sys_created_on>${t_start}^ORDERBYDESCsys_created_on`, 'number,short_description,assigned_to', 5); out.cases = cs; H.log('  new Finance Cases ' + JSON.stringify(cs));
      await page.goto(`${H.BASE}/sn_spend_sdc_service_request_list.do?sysparm_query=ORDERBYDESCnumber`, { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(4000); await H.shot(page, 'zcc_06_finance_case_list');
    });
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'zcc_error').catch(() => {}); }
  finally {
    await stepT('cleanup (the setup event row)', async () => { if (evId) H.log(`  delete event http=${(await H.rest('DELETE', `table/${EVT}/${evId}`)).status}`); });
    await browser.close(); H.log('---- TIMES'); for (const [n, s] of times) H.log(`  ${n.padEnd(70)} ${s}s`);
    H.log(`######## ZCC AGENT TEST ${out.error ? 'FAILED: ' + out.error : 'DONE'} total ${H.elapsed()}s`);
    H.log('RESULT ' + JSON.stringify({ plan: out.plan, cases: out.cases, error: out.error }));
  }
})();
