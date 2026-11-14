// Human-style Build Agent driver: open the app in Studio, Build Agent > New conversation, paste the guide prompt, approve like a participant, wait until built.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const H = require('./human.cjs');
const BA = path.join(__dirname, '..', 'headless-toolkit', 'ba');
const src = f => fs.readFileSync(path.join(BA, f), 'utf8');
const APP = 'a4fd2da13bf8be5062f31831a3e45ac9';
async function evalAll(page, file, arg) { const out = []; for (const f of page.frames()) { const r = await f.evaluate(`(${src(file)})(${JSON.stringify(arg ?? null)})`).catch(() => null); if (r) out.push(r); } return out; }
async function clickApprove(page) {
  for (const f of page.frames()) {
    const r = await f.evaluate(() => { const find = root => { for (const e of root.querySelectorAll('*')) { if (e.shadowRoot) { const r = find(e.shadowRoot); if (r) return r; } if (e.tagName === 'BUTTON' && /^(Approve|Approve plan)$/.test(e.textContent.trim()) && e.offsetParent !== null) return e; } return null; }; const b = find(document); if (!b) return null; const t = b.textContent.trim(); b.click(); return t; }).catch(() => null);
    if (r) return r;
  } return null;
}
async function chatText(page) { const t = await evalAll(page, 'deeptext.js', 'Answers generated'); return t.length ? String(t[t.length - 1]) : ''; }
async function openStudio(page) {
  await page.goto(`${H.BASE}/sn_glider_app/servicenow_studio.do?table=sys_app&sysId=${APP}`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(40000);
  await evalAll(page, 'clickaria.js', 'Conversations'); await page.waitForTimeout(5000);
}
async function sendPrompt(page, text) {
  await evalAll(page, 'clicknewconv.js'); await page.waitForTimeout(8000);
  let sent = false;
  for (const f of page.frames()) {
    const box = f.locator('textarea, [contenteditable="true"]').filter({ visible: true }).first();
    if (await box.count().catch(() => 0) && await f.getByRole('button', { name: 'New chat' }).count().catch(() => 0) !== undefined) {
      try { await box.click({ timeout: 4000 }); await box.fill(text); await page.waitForTimeout(800); await page.keyboard.press('Enter'); sent = true; break; } catch (e) {}
    }
  }
  if (!sent) throw new Error('could not find the Build Agent chat box');
  await page.waitForTimeout(5000);
}
async function waitBuilt(page, built, timeoutMs = 2400000) {
  const t0 = Date.now(); let last = null, changed = Date.now(), approvals = 0;
  while (Date.now() - t0 < timeoutMs) {
    if (await built()) return { approvals, seconds: Math.round((Date.now() - t0) / 1000) };
    const txt = await chatText(page);
    const tail = txt.slice(-2500); const script = tail.slice(tail.lastIndexOf('Run Script') >= 0 ? tail.lastIndexOf('Run Script') : 0);
    if (/\bApprove\b/.test(tail.slice(-700))) {
      if (/deleteRecord|deleteMultiple|syslog|sys_log|\.deleteRecord\(/.test(script)) throw new Error('Build Agent wants to run a risky script (delete or syslog), not approving');
      const c = await clickApprove(page); if (c) { approvals++; H.log(`  clicked ${c}`); }
    }
    const h = crypto.createHash('md5').update(txt.slice(-4000)).digest('hex'); if (h !== last) { last = h; changed = Date.now(); }
    if (Date.now() - changed > 720000) throw new Error('Build Agent froze (screen unchanged for 12 minutes)');
    await page.waitForTimeout(15000);
  }
  throw new Error('build did not finish in time');
}
async function waitIdle(page, timeoutMs = 900000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const t = await chatText(page); const tail = t.slice(-900);
    if (/\bApprove\b/.test(tail.slice(-700))) { await clickApprove(page); }
    else if (t && !/Stop processing/.test(tail)) return true;
    await page.waitForTimeout(10000);
  }
  return false;
}
async function runPrompt(page, text, built, opts = {}) { await openStudio(page); await sendPrompt(page, text); await H.shot(page, 'ba_sent'); const r = await waitBuilt(page, built, opts.timeoutMs); await waitIdle(page); await H.shot(page, 'ba_done'); return r; }
module.exports = { runPrompt, openStudio, sendPrompt, waitBuilt, chatText };
