// Render a mermaid file to PNG with the default theme at 2x, like the TypeB diagram exports.
const fs = require('fs'); const path = require('path');
const { chromium } = require('playwright-core');
const [, , src, out] = process.argv;
const lib = fs.readFileSync(path.join(__dirname, 'mermaidlib/mermaid.min.js'), 'utf8');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1400 }, deviceScaleFactor: 2 });
  await page.setContent('<html><body style="margin:0;background:#fff"><pre class="mermaid" id="d"></pre></body></html>');
  await page.evaluate(t => { document.getElementById('d').textContent = t; }, fs.readFileSync(src, 'utf8'));
  await page.addScriptTag({ content: lib });
  const err = await page.evaluate(async () => { try { mermaid.initialize({ startOnLoad: false, theme: 'default' }); await mermaid.run({ querySelector: '#d' }); return null; } catch (e) { return String(e); } });
  if (err) { console.log('ERR', err); process.exit(1); }
  const box = await page.evaluate(() => { const r = document.querySelector('#d svg').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  await page.screenshot({ path: out, clip: { x: Math.max(0, box.x - 12), y: Math.max(0, box.y - 12), width: box.width + 24, height: box.height + 24 } });
  console.log('ok', JSON.stringify(box));
  await browser.close();
})();
