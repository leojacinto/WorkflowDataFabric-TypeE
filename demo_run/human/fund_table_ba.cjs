// Guide (Fundamentals, Build Agent option): Build Agent creates the practice table, done like a participant (headless). Cleans the table up afterwards.
const fs = require('fs'), path = require('path');
const H = require('./human.cjs'); const B = require('./buildagent.cjs');
const LABEL = 'Expense Transaction Event QA';
const COLS = ['amount_usd', 'timestamp', 'cost_center', 'source_system', 'billing_period', 'vendor', 'invoice_id', 'gl_account', 'business_unit', 'sent_from', 'correlation_id', 'service_category', 'schema_version', 'region', 'event_id', 'priority', 'event_type'];
const prompt = fs.readFileSync(path.join(__dirname, '..', 'headless-toolkit', 'e2e', 'prompts', 'fund_table.txt'), 'utf8').replace('<initials>', 'QA');
const tbl = async () => (await H.rows('sys_db_object', `label=${LABEL}`, 'sys_id,name'))[0];
const built = async () => { const t = await tbl(); if (!t) return false; const have = (await H.rows('sys_dictionary', `name=${t.name}^elementISNOTEMPTY`, 'element', 100)).map(x => x.element); return COLS.every(c => have.includes(c)); };
(async () => {
  const out = {}; const t0 = Date.now(); const { browser, page } = await H.openBrowser();
  try {
    if (await tbl()) throw new Error('a QA table already exists before the run');
    H.log('>>> Build Agent creates the table (guide prompt, initials QA)');
    out.r = await B.runPrompt(page, prompt, built, { timeoutMs: 1800000 });
    H.log(`<<< built in ${out.r.seconds}s after ${out.r.approvals} approval clicks; 17 columns present`);
  } catch (e) { out.error = String(e.message || e).split('\n')[0]; H.log('ERROR: ' + out.error); await H.shot(page, 'ba_error').catch(() => {}); }
  finally {
    const t = await tbl(); if (t) { const c = await H.rest('DELETE', `table/sys_db_object/${t.sys_id}`); H.log(`  cleanup: delete table http=${c.status}`); await new Promise(r => setTimeout(r, 25000)); H.log('  table gone: ' + !(await tbl())); }
    await browser.close(); H.log(`######## FUNDAMENTALS BUILD AGENT OPTION ${out.error ? 'FAILED: ' + out.error : 'DONE'} total ${Math.round((Date.now() - t0) / 1000)}s`);
  }
})();
