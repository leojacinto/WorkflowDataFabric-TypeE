// Guide (Integration Hub): the three Build Agent prompts (ihub1, ihub2, ihub3) pasted like a participant, initials QB (headless). Stops at the first failure.
const fs = require('fs'), path = require('path');
const H = require('./human.cjs'); const B = require('./buildagent.cjs');
const P = n => fs.readFileSync(path.join(__dirname, '..', 'headless-toolkit', 'e2e', 'prompts', n + '.txt'), 'utf8').replace(/<your initials>/g, 'QB');
const EVT = 'x_snc_forecast_v_0_expense_transaction_event'; const AGENT = 'Forecast Variance QB';
const times = []; const out = { checks: [] };
const flows = n => H.count('sys_hub_flow', `name=${n}`); const acts = n => H.count('sys_hub_action_type_definition', `name=${n}`);
async function dupes() { const o = []; for (const n of ['Get Expense Event', 'Extract Cost Center', 'Budget Variance Analysis']) { const c = await flows(n); if (c > 1) o.push(`${n} subflows=${c}`); } for (const n of ['Get Expense Event', 'Compute Budget Totals']) { const c = await acts(n); if (c > 1) o.push(`${n} actions=${c}`); } return o; }
async function step(name, prompt, built, replyMust) {
  const t = Date.now(); H.log('>>> ' + name); let r, txt = '';
  for (let attempt = 1; attempt <= 2; attempt++) {
    try { const { browser: _b, page } = ctx; r = await B.runPrompt(page, prompt, built, { timeoutMs: 2400000 }); txt = await B.chatText(page); break; }
    catch (e) { if (/froze/.test(String(e.message)) && attempt === 1 && !(await built())) { H.log('  Build Agent froze with nothing built, fresh conversation'); continue; } throw e; }
  }
  for (const rx of replyMust || []) { const ok = rx.test(txt); out.checks.push([name, String(rx), ok]); H.log(`  reply check ${rx}: ${ok ? 'PASS' : 'FAIL'}`); if (!ok) throw new Error(`${name}: Build Agent reply is missing ${rx}`); }
  const d = await dupes(); if (d.length) throw new Error(`${name}: duplicates ${d.join(', ')}`);
  const s = Math.round((Date.now() - t) / 1000); times.push([name, s]); H.log(`<<< ${name} ${s}s (${r.approvals} approval clicks)`);
}
let ctx; const START_AT = process.env.START_AT || 'ihub1';
(async () => {
  const t0 = Date.now(); ctx = await H.openBrowser();
  try {
    if (START_AT === 'ihub1') for (const e of await H.rows(EVT, 'event_id=EXP-2025-IT-002-1007-01', 'sys_id')) await H.rest('DELETE', `table/${EVT}/${e.sys_id}`);
    const pre = await dupes(); H.log('start state: ' + (pre.length ? pre.join(', ') : 'clean (no copies of the Integration Hub objects)'));
    if (START_AT === 'ihub1') await step('ihub1: alias, action, subflow "Get Expense Event" + test', P('ihub1'), async () => (await acts('Get Expense Event')) >= 1 && (await flows('Get Expense Event')) >= 1 && (await H.count(EVT, 'event_id=EXP-2025-IT-002-1007-01')) >= 1, [/created\s*1/i]);
    await step('ihub2: Extract Cost Center, Compute Budget Totals, Budget Variance Analysis + test', P('ihub2'), async () => (await flows('Extract Cost Center')) >= 1 && (await flows('Budget Variance Analysis')) >= 1 && (await acts('Compute Budget Totals')) >= 1, [/CC_IT_001/, /Amazon Web Services/, /compliant/i, /109200\.75/]);
    const agentTools = async () => { const a = await H.rows('sn_aia_agent', `name=${AGENT}`, 'sys_id'); return a.length ? await H.count('sn_aia_agent_tool_m2m', `agent=${a[0].sys_id}`) : 0; };
    await step(`ihub3: agent "${AGENT}", 4 tools, trigger`, P('ihub3'), async () => (await agentTools()) >= 4 && (await H.count('sn_aia_trigger_configuration', 'target_table=' + EVT)) >= 1);
    const tr = await H.rows('sn_aia_trigger_configuration', 'target_table=' + EVT, 'name,active,run_as,run_as_user,trigger_flow', 5); out.trigger = tr; H.log('  trigger: ' + JSON.stringify(tr));
    if (tr.length !== 1 || tr[0].active !== 'true' || !tr[0].trigger_flow) throw new Error('trigger check failed: ' + JSON.stringify(tr));
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(ctx.page, 'ih_error').catch(() => {}); }
  finally { await ctx.browser.close(); H.log('---- TIMES'); for (const [n, s] of times) H.log(`  ${n.padEnd(80)} ${s}s (${Math.floor(s / 60)}m ${s % 60}s)`); H.log(`######## INTEGRATION HUB (human style) ${out.error ? 'FAILED: ' + out.error : 'DONE'} total ${Math.round((Date.now() - t0) / 1000)}s`); }
})();
