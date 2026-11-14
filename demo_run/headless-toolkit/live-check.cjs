// Live UI page check; raw.githubusercontent requests are proxied through Node because the headless browser cannot reach it.
const fs = require('fs'); const path = require('path');
const { chromium } = require('playwright-core');
const [host] = fs.readFileSync(require('path').resolve(__dirname, '..', '..', '.env'), 'utf8').split(/\r?\n/).map(s => s.trim());
const SHOTS = require('path').resolve(__dirname, '..', 'screenshots');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 }, storageState: path.join(__dirname, 'ba/state.json') });
  await ctx.route('https://raw.githubusercontent.com/**', async r => {
    const res = await fetch(r.request().url());
    r.fulfill({ status: res.status, body: Buffer.from(await res.arrayBuffer()), headers: { 'content-type': res.headers.get('content-type') || 'text/plain', 'access-control-allow-origin': '*' } });
  });
  if (process.env.OLD_SCENE) { const old = fs.readFileSync(process.env.OLD_SCENE, 'utf8'); await ctx.route(/virtual-on\/scene(\.js)?(\?.*)?$/, r => r.fulfill({ body: old, contentType: 'application/javascript' })); await ctx.route(/sys_ux_lib_asset\/cbaeffb1/, r => r.fulfill({ body: JSON.stringify({ result: { content: old } }), contentType: 'application/json' })); }
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERROR', e.message.slice(0, 300)));
  page.on('console', m => { if (m.type() === 'error' || /scene|virtual/i.test(m.text())) console.log('CONSOLE', m.type(), m.text().slice(0, 300)); });
  const route = process.argv[2], shot = process.argv[3];
  await page.goto(`https://${host}.service-now.com/x_snc_forecast_v_0_wdf_lab.do?view=${route}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(15000);
  const info = await page.evaluate(() => { const t = document.body.innerText; return { ba: (t.match(/Build Agent option/g) || []).length, err: /Could not load/.test(t), pres: [...document.querySelectorAll('pre')].map(p => p.textContent.length), broken: [...document.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0).length, imgs: document.querySelectorAll('img').length, canvas: document.querySelectorAll('canvas,iframe,svg').length }; });
  console.log(JSON.stringify(info));
  /* FRAMEDIM */ console.log(JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => { const d = f.contentDocument, e = d.documentElement, a = d.getElementById('app').getBoundingClientRect(); return { inner: f.contentWindow.innerWidth + 'x' + f.contentWindow.innerHeight, client: e.clientWidth + 'x' + e.clientHeight, scroll: e.scrollWidth + 'x' + e.scrollHeight, app: [a.left, a.top, a.width, a.height].map(Math.round) }; }))));
  if (process.env.SRCDOC_OUT) fs.writeFileSync(process.env.SRCDOC_OUT, await page.evaluate(() => (document.querySelector('iframe') || {}).srcdoc || ''));
  const h = page.getByText('Hands-on (Build Agent option)').first();
  if (await h.count()) { await h.scrollIntoViewIfNeeded(); await page.waitForTimeout(2000); }
  await page.screenshot({ path: path.join(SHOTS, shot + '.png') });
  if (process.argv[4]) for (const n of [1, 2, 3]) { await page.waitForTimeout(4000); const px = await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => { try { const c = f.contentDocument && f.contentDocument.getElementById('scene'); if (!c) return null; const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let lit = 0; for (let i = 0; i < d.length; i += 400) if (d[i] + d[i+1] + d[i+2] > 120) lit++; return { w: c.width, lit, err: f.contentWindow.__sceneError || null }; } catch (e) { return 'x ' + e.message; } }).filter(Boolean)); console.log(n, JSON.stringify(px)); if (n === 1) console.log(JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => { try { const d = f.contentDocument; return { src: (f.getAttribute('srcdoc') || '').length, hasScene: (f.getAttribute('srcdoc') || '').includes("getElementById('scene')"), ls: typeof f.contentWindow.launchStudy, rect: f.getBoundingClientRect().width + 'x' + f.getBoundingClientRect().height, body: d.body.innerHTML.slice(0, 300) }; } catch (e) { return e.message; } })))); await page.screenshot({ path: path.join(SHOTS, shot + '-' + n + '.png') }); }
  await browser.close();
})();
