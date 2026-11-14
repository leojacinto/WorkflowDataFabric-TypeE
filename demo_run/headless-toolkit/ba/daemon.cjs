// Persistent headless browser for Build Agent. Reads one JSON command at a time
// from cmd.json, runs it, writes out.json, so every step can be inspected.
// Commands: goto, shot, click (text or selector), type (into chat), labels, text, wait.
const fs = require('fs'); const path = require('path');
const { chromium } = require('playwright-core');
const SHOTS = require('path').resolve(__dirname, '..', '..', 'screenshots');
const DIR = __dirname;
const CMD = path.join(DIR, 'cmd.json'), OUT = path.join(DIR, 'out.json');
const [host] = fs.readFileSync(require('path').resolve(__dirname, '..', '..', '..', '.env'), 'utf8').split(/\r?\n/).map(s => s.trim());
const BASE = `https://${host}.service-now.com`;

const deepText = () => document.body.innerText;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: Number(process.env.DPR || 1), ...(fs.existsSync(path.join(DIR, 'state.json')) ? { storageState: path.join(DIR, 'state.json') } : {}) });
  const page = await context.newPage();
  const LOG = path.join(DIR, 'console.log');
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) fs.appendFileSync(LOG, m.type() + ' ' + m.text().slice(0, 400) + '\n'); });
  page.on('pageerror', e => fs.appendFileSync(LOG, 'PAGEERROR ' + String(e.message).slice(0, 400) + '\n'));
  fs.writeFileSync(OUT, JSON.stringify({ ready: true }));
  for (;;) {
    if (!fs.existsSync(CMD)) { await new Promise(r => setTimeout(r, 500)); continue; }
    const cmd = JSON.parse(fs.readFileSync(CMD, 'utf8'));
    fs.unlinkSync(CMD);
    const result = { cmd: cmd.op };
    // Target a frame by URL substring, or the whole page.
    let chatFrame = page;
    if (cmd.chat) for (const f of page.frames()) { if (await f.locator('textarea').count().catch(() => 0)) { if (await f.getByRole('button', { name: 'New chat' }).count().catch(() => 0)) { chatFrame = f; break; } } }
    const scope = () => (cmd.chat ? chatFrame : cmd.frame ? page.frames().find(f => f.url().includes(cmd.frame)) : page) || page;
    try {
      if (cmd.op === 'labels') {
        result.frames = [];
        for (const f of page.frames()) {
          const labels = await f.evaluate(require('./probe.cjs')).catch(() => []);
          result.frames.push({ url: f.url().slice(0, 120), labels: [...new Set(labels)].slice(0, 60) });
        }
      }
      // eval: run the function source in cmd.file inside every frame; keep non-empty results.
      if (cmd.op === 'eval') {
        const src = fs.readFileSync(path.join(DIR, cmd.file), 'utf8');
        result.frames = [];
        for (const f of page.frames()) {
          const r = await f.evaluate(`(${src})(${JSON.stringify(cmd.arg || null)})`).catch(e => null);
          if (r) result.frames.push({ url: f.url().slice(-50), r });
        }
      }
      if (cmd.op === 'goto') { await page.goto(BASE + cmd.path, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(cmd.wait || 20000); }
      if (cmd.op === 'click') {
        const root = scope();
        const loc = cmd.selector ? root.locator(cmd.selector) : root.getByText(cmd.text, { exact: !!cmd.exact });
        await loc.nth(cmd.nth || 0).click({ timeout: 15000 });
        await page.waitForTimeout(cmd.wait || 5000);
      }
      if (cmd.op === 'type') {
        const box = scope().locator(cmd.selector || 'textarea, [contenteditable="true"]').filter({ visible: true }).first();
        await box.click();
        await box.fill(cmd.value);
        await page.waitForTimeout(800);
      }
      if (cmd.op === 'press') { await page.keyboard.press(cmd.key); await page.waitForTimeout(cmd.wait || 2000); }
      if (cmd.op === 'wait') await page.waitForTimeout(cmd.ms);
      if (cmd.op === 'save') { await context.storageState({ path: path.join(DIR, 'state.json') }); result.saved = true; }
      if (cmd.op === 'quit') { await context.storageState({ path: path.join(DIR, 'state.json') }); await browser.close(); fs.writeFileSync(OUT, JSON.stringify({ quit: true })); process.exit(0); }
      if (cmd.shot) await page.screenshot({ path: path.join(SHOTS, `${cmd.shot}.png`) });
      if (cmd.text_out) result.text = (await scope().evaluate(deepText)).slice(-(cmd.text_out));
      result.url = page.url();
    } catch (e) { result.error = String(e.message || e).slice(0, 400); try { await page.screenshot({ path: path.join(SHOTS, `error-${Date.now()}.png`) }); } catch {} }
    fs.writeFileSync(OUT, JSON.stringify(result));
  }
})();
