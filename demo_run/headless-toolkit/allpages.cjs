// Render every lab route from the local build; GitHub raw is proxied through Node (TypeE guide served from disk).
const fs = require('fs'); const path = require('path');
const { chromium } = require('playwright-core');
const REPO = require('path').resolve(__dirname, '..', '..');
const ROUTES = [...fs.readFileSync(path.join(REPO, 'src/client/content/pages.ts'), 'utf8').matchAll(/'(\/[a-z0-9/-]+)':/g)].map(m => m[1]);
const OUT = process.argv[2];
(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
  await ctx.route('http://lab.local/**', r => {
    const u = new URL(r.request().url());
    if (u.pathname === '/wdf_lab.do') return r.fulfill({ contentType: 'text/html', body: '<html><head></head><body><div id="root"></div><script type="module" src="/static/main.jsdbx"></script></body></html>' });
    const f = path.join(REPO, 'dist', u.pathname);
    return fs.existsSync(f) ? r.fulfill({ contentType: 'text/javascript', body: fs.readFileSync(f) }) : r.fulfill({ status: 404, body: '' });
  });
  const TE = 'https://raw.githubusercontent.com/leojacinto/WorkflowDataFabric-TypeE/main/';
  await ctx.route('https://raw.githubusercontent.com/**', async r => {
    const url = r.request().url(); const h = { 'access-control-allow-origin': '*' };
    if (url.startsWith(TE + 'lab-guide/')) { const f = path.join(REPO, url.slice(TE.length)); return r.fulfill({ status: fs.existsSync(f) ? 200 : 404, body: fs.existsSync(f) ? fs.readFileSync(f) : '', headers: { ...h, 'content-type': url.endsWith('.png') ? 'image/png' : 'text/plain' } }); }
    const res = await fetch(url); r.fulfill({ status: res.status, body: Buffer.from(await res.arrayBuffer()), headers: { ...h, 'content-type': res.headers.get('content-type') || 'text/plain' } });
  });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    await page.goto('http://lab.local/wdf_lab.do?view=' + route); await page.waitForTimeout(route === '/home' ? 5000 : 3500);
    await page.evaluate(async () => { for (const i of document.images) { i.loading = 'eager'; } await new Promise(r => setTimeout(r, 2500)); });
    const r = await page.evaluate(() => { const main = document.querySelector('.lab-page, main') || document.body; const t = main.innerText; return { err: /Could not load/.test(t), fence: (t.match(/```|`mermaid|graph TB|flowchart|classDef/g) || []).length, rawHtml: (t.match(/<\/?[a-z][a-z0-9]{0,9}(\s[^>]*)?>|&lt;|&gt;|&amp;/g) || []).slice(0, 3), imgs: document.images.length, broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src.replace('https://raw.githubusercontent.com/leojacinto/', '').slice(0, 110)), doubled: [...document.images].filter(i => /main\/https?:/.test(i.src)).length }; });
    console.log(route.padEnd(42), JSON.stringify(r));
    if (OUT) await page.screenshot({ path: `${OUT}${route.replace(/\//g, '_')}.png`, fullPage: false });
  }
  await browser.close();
})();
