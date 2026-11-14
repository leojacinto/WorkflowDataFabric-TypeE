// Shared helpers for the human-simulation tests: headless Playwright, logged in as admin like a participant, REST only for checking and cleanup.
const fs = require('fs'), path = require('path');
const { chromium } = require('../headless-toolkit/node_modules/playwright-core');
const ROOT = path.resolve(__dirname, '..', '..');
const [HOST, USER, PW] = fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split(/\r?\n/).filter(l => !/^alternative hostname/i.test(l)).slice(0, 3).map(s => s.trim());
const BASE = `https://${HOST}.service-now.com`;
const AUTH = 'Basic ' + Buffer.from(`${USER}:${PW}`).toString('base64');
const SHOTS = path.join(__dirname, 'shots'); fs.mkdirSync(SHOTS, { recursive: true });
const t0 = Date.now(); const stamp = () => new Date().toTimeString().slice(0, 8);
const log = m => { const line = `${stamp()} ${m}`; console.log(line); fs.appendFileSync(path.join(__dirname, 'human.log'), line + '\n'); };
async function rest(method, p, body) {
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(`${BASE}/api/now/${p}`, { method, headers: { Authorization: AUTH, Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(120000) });
      const txt = await r.text(); return { status: r.status, result: txt ? (JSON.parse(txt).result ?? null) : null };
    } catch (e) { await new Promise(r => setTimeout(r, 8000)); }
  }
  return { status: 'timeout', result: null };
}
async function count(table, q) { const r = await rest('GET', `stats/${table}?sysparm_count=true&sysparm_query=${encodeURIComponent(q || '')}`); return r.result ? Number(r.result.stats.count) : -1; }
async function rows(table, q, fields, limit = 5) { const r = await rest('GET', `table/${table}?sysparm_limit=${limit}&sysparm_fields=${fields}&sysparm_query=${encodeURIComponent(q)}`); return r.result || []; }
async function openBrowser() {
  const browser = await chromium.launch({ headless: !process.env.HEADED, slowMo: process.env.HEADED ? 250 : 0 });
  const state = path.join(ROOT, 'devin_walkthrough_wdf', 'headless-toolkit', 'ba', 'state.json');
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, ...(process.env.VIDEO ? { recordVideo: { dir: path.join(__dirname, 'videos'), size: { width: 1600, height: 1000 } } } : {}), ...(fs.existsSync(state) ? { storageState: state } : {}) });
  const page = await context.newPage();
  await login(page);
  return { browser, context, page };
}
async function login(page) {
  await page.goto(`${BASE}/login.do`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  if (await page.locator('#user_name').count()) {
    await page.fill('#user_name', USER); await page.fill('#user_password', PW);
    await Promise.all([page.waitForLoadState('load', { timeout: 90000 }).catch(() => {}), page.click('#sysverb_login')]);
    await page.waitForTimeout(5000);
    log('  logged in as ' + USER);
  } else log('  already logged in');
}
async function shot(page, name) { const f = path.join(SHOTS, name + '.png'); await page.screenshot({ path: f }); log(`  screenshot ${name}.png`); return f; }
async function clickText(page, text, opts = {}) {
  const pos = await page.evaluate(({ text, exact, nth }) => {
    const walk = (root, acc) => { for (const e of root.querySelectorAll('*')) { acc.push(e); if (e.shadowRoot) walk(e.shadowRoot, acc); } return acc; };
    const norm = s => (s || '').replace(/\s+/g, ' ').trim();
    const hits = walk(document, []).filter(e => e.offsetParent !== null && e.getBoundingClientRect().width > 0 && (exact ? norm(e.textContent) === text : norm(e.textContent).includes(text)) && e.children.length <= 3);
    hits.sort((a, b) => norm(a.textContent).length - norm(b.textContent).length);
    const e = hits[nth || 0]; if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, { text, exact: opts.exact !== false, nth: opts.nth || 0 });
  if (!pos) throw new Error('text not found: ' + text);
  await page.mouse.click(pos.x, pos.y); return pos;
}
module.exports = { SHOTS, clickText, BASE, HOST, rest, count, rows, openBrowser, shot, log, stamp, utc: () => new Date().toISOString().replace('T', ' ').slice(0, 19), elapsed: () => Math.round((Date.now() - t0) / 1000) };
