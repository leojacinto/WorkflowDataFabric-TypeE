// Captures raw (unannotated) screenshots of the MCP steps in the new AI Agent Studio into ../originals and writes pin targets to mcp_aia_specs.json. Nothing is saved on the instance (the tool tab is never saved).
const fs = require('fs'), path = require('path'); const H = require('./human.cjs');
const OUT = path.join(__dirname, '..', 'originals'); const CROP = { x: 58, y: 0 }; const specs = {};
const NAME = 'Forecast Variance Neon MCP Lab'; const CHAT = process.env.CHAT_ID || '82c9b55b3b14db90a0db3141a3e45a16';
let page;
const snap = async (name, pins) => { const vp = page.viewportSize(); CROP.x = (await page.getByText('Create new agentic solution').count()) ? 255 : 58; await page.screenshot({ path: path.join(OUT, name + '.png'), clip: { x: CROP.x, y: CROP.y, width: vp.width - CROP.x, height: vp.height } }); specs[name + '.png'] = { tears: pins.map(p => ({ label: p.l, targets: [[Math.round(p.x - CROP.x), Math.round(p.y)]], ...(p.dir !== undefined ? { dir: p.dir } : {}) })) }; fs.writeFileSync(path.join(__dirname, 'mcp_aia_specs.json'), JSON.stringify(specs, null, 1)); H.log('captured ' + name); };
const edge = async (loc, side = 'left') => { const b = await loc.boundingBox(); if (!b) throw new Error('no box'); return side === 'left' ? { x: b.x, y: b.y + b.height / 2 } : side === 'top' ? { x: b.x + b.width / 2, y: b.y } : { x: b.x + b.width, y: b.y + b.height / 2 }; };
const toolsNav = async () => { await page.getByText('Tools', { exact: true }).last().click(); await page.waitForTimeout(4000); };
const addToolClick = async () => { await page.getByText('+ Add tool', { exact: true }).first().click(); await page.waitForTimeout(5000); };
const below = async (loc) => { const b = await loc.boundingBox(); if (!b) throw new Error('no box'); return { x: b.x, y: b.y + 36 }; };
const ready = async () => { await page.getByRole('button', { name: 'Run test' }).first().waitFor({ timeout: 240000 }); await page.waitForTimeout(6000); };
const dismissBanner = async () => { const d = page.getByRole('button', { name: /Dismiss alert/i }); if (await d.count()) await d.first().click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(1500); };
(async () => {
  const { browser, page: pg } = await H.openBrowser(); page = pg; const og = page.goto.bind(page); page.goto = async (u, o) => { let r; for (let i = 0; i < 3; i++) { r = await og(u, o); await page.waitForTimeout(8000); if (!(await page.getByText('Authentication Error').count())) return r; await page.waitForTimeout(15000); } return r; };
  try {
    const ag = (await H.rows('sn_aia_agent', 'name=' + NAME, 'sys_id', 1))[0];
    // nav without crop and without toast
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 240000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(8000); await page.waitForTimeout(40000);
    await page.mouse.click(174, 25); await page.waitForTimeout(4000); await page.keyboard.type('AI Agent Studio', { delay: 60 }); await page.waitForTimeout(5000);
    const nav = page.getByText('Agentic Solutions', { exact: true }).first(); const nb = await nav.boundingBox(); CROP.x = 0; CROP.fixed = true;
    await page.screenshot({ path: path.join(OUT, 'sc_mcp_aia_agentic_solutions_nav.png') }); H.log('nav box ' + JSON.stringify(nb));
    // run test dialog without typing
    await page.goto(`${H.BASE}/aiux/aia/agent/${ag.sys_id}/visualize`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await ready(); await dismissBanner();
    await page.getByRole('button', { name: 'Run test', exact: true }).first().click(); await page.waitForTimeout(15000); await page.screenshot({ path: path.join(OUT, 'sc_mcp_aia_run_test_dialog.png'), clip: { x: 58, y: 0, width: page.viewportSize().width - 58, height: page.viewportSize().height } }); H.log('dialog captured; textarea: ' + (await page.locator('textarea').filter({ visible: true }).first().inputValue()));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'aiax_shots_error').catch(() => {}); }
  await browser.close();
})();
