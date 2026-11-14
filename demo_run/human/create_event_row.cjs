// Creates the test event row via the guide's step-4 Build Agent prompt. Does not delete anything.
const path = require('path'), fs = require('fs');
const H = require('./human.cjs'), B = require('./buildagent.cjs');
const EVT = 'x_snc_forecast_v_0_expense_transaction_event';
const PROMPT = fs.readFileSync(path.join(__dirname, '..', 'headless-toolkit', 'e2e', 'prompts', 'ihub4_test.txt'), 'utf8').trim();
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    if ((await H.count(EVT, '')) !== 0) throw new Error('event list is not empty, stopping');
    await B.runPrompt(page, PROMPT, async () => (await H.count(EVT, '')) >= 1, { timeoutMs: 1500000 });
    H.log('rows now: ' + await H.count(EVT, ''));
  } catch (e) { H.log('FAIL ' + e.message); }
  await browser.close();
})();
