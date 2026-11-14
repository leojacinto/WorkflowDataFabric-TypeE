// Removes the test MCP server "Neon MCP Lab" through the Manage MCP servers list (open it, Delete). Keeps "Neon MCP Lab LF".
const H = require('./human.cjs'); const NAME = process.env.SERVER || 'Neon MCP Lab';
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/agent-studio/create-manage`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(12000); await page.mouse.click(508, 73); await page.waitForTimeout(9000); await H.clickText(page, 'Manage MCP servers'); await page.waitForTimeout(12000);
    const pos = await page.evaluate(n => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { a.push(e); if (e.shadowRoot) walk(e.shadowRoot, a); } return a; }; const e = walk(document, []).find(e => e.tagName === 'A' && e.offsetParent !== null && (e.textContent || '').trim() === n); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + 10, y: r.y + r.height / 2 }; }, NAME);
    H.log('row link: ' + JSON.stringify(pos)); if (!pos) throw new Error('server row not found: ' + NAME);
    await page.mouse.click(pos.x, pos.y); await page.waitForTimeout(45000); await H.shot(page, 'mcpd_01_server'); H.log('page: ' + JSON.stringify((await page.locator('button, a').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 40))).slice(0, 40)));
    H.log('url: ' + page.url()); await page.mouse.click(287, 286); await page.waitForTimeout(3000); await H.shot(page, 'mcpd_02_menu'); H.log('menu: ' + JSON.stringify((await page.locator('button, a, li, [role=menuitem]').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\\s+/g, ' ')).filter(t => /delete|remove|edit|test|disable|switch/i.test(t) && t.length < 40))).slice(0, 10)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'mcpd_error').catch(() => {}); }
  await browser.close();
})();
