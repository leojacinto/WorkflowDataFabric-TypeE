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
    // 1 nav
    await page.goto(`${H.BASE}/now/nav/ui/home`, { waitUntil: 'load', timeout: 240000 }); await page.waitForTimeout(14000); for (let i = 0; i < 12 && (await page.getByText(/Running transaction/).count()); i++) await page.waitForTimeout(8000);
    await page.mouse.click(174, 25); await page.waitForTimeout(4000); await page.keyboard.type('AI Agent Studio', { delay: 60 }); await page.waitForTimeout(5000);
    await page.getByRole('button', { name: /Close|Dismiss/i }).first().click({ timeout: 3000 }).catch(() => {}); await page.waitForTimeout(1500); const nav = page.getByText('Agentic Solutions', { exact: true }).first(); await snap('sc_mcp_aia_agentic_solutions_nav', [{ l: 'a', ...(await edge(nav, 'right')) }]);
    // 2 canvas
    await page.goto(`${H.BASE}/aiux/aia/agent/${ag.sys_id}/visualize`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await ready(); await dismissBanner();
    const ed = page.getByRole('button', { name: 'Edit' }).first(); await snap('sc_mcp_aia_agent_canvas_edit', [{ l: 'a', ...(await edge(ed, 'left')) }]);
    // 3 add tool menu
    await ed.click({ timeout: 120000 }); await page.waitForTimeout(15000); await dismissBanner(); await toolsNav();
    for (let t = 0; t < 4; t++) { await addToolClick(); if (await page.getByText('Create new tool', { exact: true }).count()) break; await page.keyboard.press('Escape'); await page.waitForTimeout(2000); await toolsNav(); }
    const cnt = page.getByText('Create new tool', { exact: true }).first(); await snap('sc_mcp_aia_add_tool_menu', [{ l: 'a', ...(await edge(page.locator('button').filter({ hasText: '+ Add tool' }).last(), 'left')) }, { l: 'b', ...(await edge(cnt, 'left')) }]);
    await cnt.click(); await page.waitForTimeout(8000); const mcp = page.getByText('MCP server tool', { exact: true }).first(); await snap('sc_mcp_aia_tool_type_menu', [{ l: 'a', ...(await edge(mcp, 'left')) }]);
    // 4 server and tool
    await mcp.click(); await page.waitForTimeout(20000); await dismissBanner(); await page.getByText('Select an MCP server').first().click(); await page.waitForTimeout(5000); await page.getByText('Neon MCP Lab LF', { exact: true }).last().click({ timeout: 15000 }); await page.waitForTimeout(40000);
    await page.getByText('Select a tool').first().click(); await page.waitForTimeout(8000); await page.keyboard.type('Run SQL', { delay: 60 }); await page.waitForTimeout(5000); await page.getByText('Execute one SQL statement').first().click(); await page.waitForTimeout(8000);
    await snap('sc_mcp_aia_select_server_tool', [{ l: 'a', ...(await below(page.getByText('Select Model Context Protocol server').first())) }, { l: 'b', ...(await below(page.getByText('Select tool', { exact: false }).filter({ visible: true }).first())) }]);
    // 5 settings
    const nameIn = page.locator('input[placeholder="Name"]').first(); await nameIn.scrollIntoViewIfNeeded(); await nameIn.fill('Get Details via Neon MCP'); const desc = page.locator('textarea[placeholder*="Describe how this AI agent"]').first(); await desc.fill('project_id: bitter-lab-28038915 (snake_case, not projectId)\nsql: SELECT cost_center, actual_amount_usd, baseline_amount_usd, variance, variance_pct FROM "VARIANCE_BASELINE_V" WHERE cost_center = \'{{cost_center}}\' LIMIT 1');
    const auto = page.getByText('Autonomous', { exact: true }).filter({ visible: true }).first(); await auto.click(); await page.waitForTimeout(2500);
    await snap('sc_mcp_aia_tool_settings', [{ l: 'a', ...(await edge(nameIn, 'left')) }, { l: 'b', ...(await edge(desc, 'left')) }, { l: 'c', ...(await edge(auto, 'left')) }, { l: 'd', ...(await edge(page.getByRole('button', { name: 'Save', exact: true }).filter({ visible: true }).first(), 'left')) }]);
    // 6 agent tools saved (discard the unsaved tool tab by reloading the agent)
    await page.goto(`${H.BASE}/aiux/aia/agent/${ag.sys_id}/visualize`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await ready(); await dismissBanner();
    await page.getByRole('button', { name: 'Edit' }).first().click(); await page.waitForTimeout(12000); await dismissBanner(); await toolsNav(); await page.waitForTimeout(2000);
    const row = page.getByText('Get Details via Neon MCP', { exact: true }).filter({ visible: true }).first(); const sv = page.getByRole('button', { name: 'Save', exact: true }).first();
    await snap('sc_mcp_aia_agent_tools_saved', [{ l: 'a', ...(await edge(row, 'left')) }]);
    // 7 run test dialog
    await page.goto(`${H.BASE}/aiux/aia/agent/${ag.sys_id}/visualize`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await ready(); await dismissBanner();
    const rt = page.getByRole('button', { name: 'Run test', exact: true }).first(); await rt.click(); await page.waitForTimeout(15000);
    const scen = page.locator('textarea').filter({ visible: true }).first(); await scen.click(); await page.keyboard.type('Help me process EXP-2025-IT-002-1007-01', { delay: 20 }); await page.waitForTimeout(1500);
    const rs = page.getByRole('button', { name: 'Run single test' }).first(); await snap('sc_mcp_aia_run_test_dialog', [{ l: 'a', ...(await edge(scen, 'left')) }, { l: 'b', ...(await edge(rs, 'left')) }]);
    // 8 trace result from Leo's completed chat
    await page.goto(`${H.BASE}/aiux/aia/agent/${ag.sys_id}/visualize?chat_id=${CHAT}`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await ready(); await page.waitForTimeout(20000); await dismissBanner();
    const step = page.getByText('Get Details via Neon MCP').last(); let pins = []; try { pins = [{ l: 'a', ...(await edge(step, 'left')) }]; } catch (e) { H.log('no trace step box: ' + e.message); }
    await snap('sc_mcp_aia_trace_log_result', pins);
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'aiax_shots_error').catch(() => {}); }
  await browser.close();
})();
