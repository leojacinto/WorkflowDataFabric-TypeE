// Guide Integration Hub "Hands-on: Flow Execution" like a participant: empty event list, step-4 Build Agent prompt, list with the row. Screenshots only; the test row is deleted by exact sys_id at the end. Initials-free (uses the existing agent).
const fs = require('fs'), path = require('path');
const H = require('./human.cjs'), B = require('./buildagent.cjs');
const EVT = 'x_snc_forecast_v_0_expense_transaction_event';
const PROMPT = fs.readFileSync(path.join(__dirname, '..', 'headless-toolkit', 'e2e', 'prompts', 'ihub4_test.txt'), 'utf8').trim();
const LIST = `${H.BASE}/now/nav/ui/classic/params/target/${encodeURIComponent(EVT + '_list.do')}`;
(async () => {
  const { browser, context, page } = await H.openBrowser();
  const ctx2 = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2, storageState: await context.storageState() });
  const p2 = await ctx2.newPage();
  const waitRow = async (pg, text) => { for (let i = 0; i < 8; i++) { await pg.waitForTimeout(8000); for (const f of pg.frames()) if (await f.getByText(text).count().catch(() => 0)) return true; } return false; };
  try {
    if ((await H.count(EVT, '')) !== 0) throw new Error('event list is not empty, stopping');
    const cases0 = await H.count('sn_spend_sdc_service_request', '');
    await p2.goto(LIST, { waitUntil: 'domcontentloaded', timeout: 90000 }); await waitRow(p2, 'No records to display');
    await H.shot(p2, 'fe2_list_empty');
    await B.runPrompt(page, PROMPT, async () => (await H.count(EVT, '')) >= 1, { timeoutMs: 1500000 });
    const txt = await B.chatText(page); fs.writeFileSync(path.join(H.SHOTS, 'fe_ba_reply.txt'), txt.slice(-3000));
    await H.shot(page, 'fe_ba_result');
    await p2.goto(LIST, { waitUntil: 'domcontentloaded', timeout: 90000 }); const ok = await waitRow(p2, 'EXP-2025-IT-002-1007-01'); H.log('row visible: ' + ok);
    await H.shot(p2, 'fe2_list_row');
    try { await B.openStudio(p2); await p2.waitForTimeout(3000); await H.shot(p2, 'fe2_ba_studio'); } catch (e) { H.log('studio shot failed ' + e.message); }
    const rows = await H.rows(EVT, '', 'sys_id,event_id,cost_center,owner,vendor,amount_usd', 5);
    H.log('rows: ' + JSON.stringify(rows));
    // let the agent run finish before the row goes away
    const t0 = Date.now(); let cases1 = cases0;
    while (Date.now() - t0 < 420000 && cases1 <= cases0) { await page.waitForTimeout(15000); cases1 = await H.count('sn_spend_sdc_service_request', ''); }
    H.log(`finance cases ${cases0} -> ${cases1}`);
    if (rows.length === 1 && rows[0].event_id === 'EXP-2025-IT-002-1007-01') { const d = await H.rest('DELETE', `table/${EVT}/${rows[0].sys_id}`); H.log('delete row ' + rows[0].sys_id + ' -> ' + d.status); }
    else H.log('row not as expected, NOT deleting');
    H.log('events left: ' + await H.count(EVT, ''));
  } catch (e) { H.log('FAIL ' + e.message); try { await H.shot(page, 'fe_fail'); } catch (_) {} }
  await browser.close();
})();
