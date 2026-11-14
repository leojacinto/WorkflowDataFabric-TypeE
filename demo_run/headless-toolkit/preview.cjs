// Preview a lab page from the local build and local lab-guide markdown; screenshot each listed heading.
const fs = require('fs'); const path = require('path');
const { chromium } = require('playwright-core');
const REPO = require('path').resolve(__dirname, '..', '..');
const [, , route, outPrefix, ...heads] = process.argv;
(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 1100 } });
  await ctx.route('http://lab.local/**', r => { const u = new URL(r.request().url()); if (u.pathname === '/wdf_lab.do') return r.fulfill({ contentType: 'text/html', body: '<html><head></head><body><div id="root"></div><script type="module" src="/static/main.jsdbx"></script></body></html>' }); const f = path.join(REPO, 'dist', u.pathname); return fs.existsSync(f) ? r.fulfill({ contentType: 'text/javascript', body: fs.readFileSync(f) }) : r.fulfill({ status: 404, body: '' }); });
  const TE = 'https://raw.githubusercontent.com/leojacinto/WorkflowDataFabric-TypeE/main/';
  await ctx.route('https://raw.githubusercontent.com/**', async r => { const url = r.request().url(); const h = { 'access-control-allow-origin': '*' }; if (url.startsWith(TE + 'lab-guide/')) { const f = path.join(REPO, decodeURIComponent(url.slice(TE.length))); if (!fs.existsSync(f)) return r.fulfill({ status: 404, body: '' }); return r.fulfill({ body: fs.readFileSync(f), headers: { ...h, 'content-type': url.endsWith('.png') ? 'image/png' : 'text/plain' } }); } const res = await fetch(url); r.fulfill({ status: res.status, body: Buffer.from(await res.arrayBuffer()), headers: { ...h, 'content-type': res.headers.get('content-type') || 'text/plain' } }); });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERROR', e.message.slice(0, 200)));
  await page.goto('http://lab.local/wdf_lab.do?view=' + route); await page.waitForTimeout(5000);
  await page.evaluate(() => { for (const i of document.images) i.loading = 'eager'; }); await page.waitForTimeout(6000);
  const info = await page.evaluate(() => ({ imgs: document.images.length, broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src.slice(-60)), svg: document.querySelectorAll('svg').length, pres: document.querySelectorAll('pre').length, h: [...document.querySelectorAll('h2,h3,h4,h5,h6')].map(h => h.tagName + ' ' + h.textContent.trim()).slice(0, 40), text: /Could not load/.test(document.body.innerText) }));
  console.log(JSON.stringify(info));
  let n = 0;
  for (const t of heads) {
    const ok = await page.evaluate(t => { const all = sel => [...document.querySelectorAll(sel)].find(x => x.textContent.trim().startsWith(t)); const h = all('h1,h2,h3,h4,h5,h6') || all('p,strong,li'); if (!h) return false; h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -80); return true; }, t);
    await page.waitForTimeout(900); await page.screenshot({ path: `${outPrefix}-${++n}.png` }); console.log(n, t, ok);
  }
  await browser.close();
})();
