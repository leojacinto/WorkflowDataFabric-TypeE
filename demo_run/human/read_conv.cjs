const H = require('./human.cjs'); const B = require('./buildagent.cjs');
const fs = require('fs'), path = require('path');
(async () => {
  const { browser, page } = await H.openBrowser();
  await B.openStudio(page);
  const prefix = process.argv[2] || 'In the Forecast Variance app: 1. Create a subflow';
  const src = fs.readFileSync(path.join(__dirname, '..', 'headless-toolkit', 'ba', 'clickconv.js'), 'utf8');
  for (const f of page.frames()) await f.evaluate(`(${src})(${JSON.stringify(prefix)})`).catch(() => null);
  await page.waitForTimeout(8000);
  const t = await B.chatText(page); fs.writeFileSync('/tmp/conv.txt', t);
  for (const rx of [/CC_IT_001/, /Amazon Web Services/, /compliant/i, /109200\.75/, /Finance Case/i]) console.log(String(rx), rx.test(t));
  console.log('BUSY?', /Stop processing/.test(t.slice(-900)));
  const i = t.search(/Test result|Test results|Extract Cost Center \(/i); console.log(t.slice(Math.max(0, i), i + 700).replace(/\n+/g, ' | '));
  await browser.close();
})();
