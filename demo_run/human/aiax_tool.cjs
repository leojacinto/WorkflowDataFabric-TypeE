// New AI Agent Studio: open the MCP copy in Edit mode and open the + Add tool menu (exploration).
const H = require('./human.cjs'); const NAME = process.env.AGENT_NAME || 'Forecast Variance Neon MCP Lab';
const vis = async page => (await page.locator('a, button, [role=tab], [role=menuitem], [role=option], li, input, textarea, h1, h2, h3, label').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || (e.value && e.value.slice(0, 30)) || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 80))).slice(0, 90);
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    const ag = (await H.rows('sn_aia_agent', 'name=' + NAME, 'sys_id', 1))[0]; if (!ag) throw new Error('agent not found');
    await page.goto(`${H.BASE}/aiux/aia/agent/${ag.sys_id}/visualize`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(45000);
    await page.getByRole('button', { name: 'Edit' }).first().click({ timeout: 25000 }); await page.waitForTimeout(10000);
    await page.mouse.click(1189, 267); await page.waitForTimeout(4000); await H.shot(page, 'aiat_01_tools_nav');
    for (let t = 0; t < 5; t++) { await page.mouse.click(1189, 267); await page.waitForTimeout(3000); await page.mouse.click(1038, 195); await page.waitForTimeout(5000); if (await page.getByText('Create new tool', { exact: true }).count()) break; await page.keyboard.press('Escape'); await page.waitForTimeout(2000); }
    await H.shot(page, 'aiat_02_after_click'); await page.getByText('Create new tool', { exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(10000); await H.shot(page, 'aiat_03_create_tool'); await page.getByText('MCP server tool', { exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(20000); await H.shot(page, 'aiat_04_mcp_tool_form'); await page.mouse.click(700, 315); await page.waitForTimeout(5000); await H.shot(page, 'aiat_05_server_dropdown'); H.log('server options: ' + JSON.stringify((await vis(page)).filter(t => /neon|mcp|aws|azure|datadog|dynatrace|relic|splunk|snowflake|leap/i.test(t)).slice(0, 20)));
    const srv = process.env.MCP_SERVER || 'Neon MCP Lab LF'; await page.getByText(srv, { exact: true }).last().click({ timeout: 15000 }); await page.waitForTimeout(40000); await H.shot(page, 'aiat_06_server_chosen'); H.log('after server: ' + JSON.stringify((await vis(page)).filter(t => !/^(on|Toggle|Chat|Voice)$/.test(t)).slice(0, 70))); H.log('TOOL FETCH ERROR shown: ' + ((await page.getByText(/Unable to fetch/i).count()) > 0));
    await page.mouse.click(700, 387); await page.waitForTimeout(10000); await H.shot(page, 'aiat_07_tool_dropdown'); await page.keyboard.type('Run SQL', { delay: 60 }); await page.waitForTimeout(5000); await H.shot(page, 'aiat_08_tool_search'); H.log('tool search results: ' + JSON.stringify((await vis(page)).filter(t => /sql/i.test(t)).slice(0, 10)));
    await page.mouse.click(400, 473); await page.waitForTimeout(8000); await H.shot(page, 'aiat_09_tool_chosen');
    const DESC = 'project_id: bitter-lab-28038915 (snake_case, not projectId)\nsql: SELECT cost_center, actual_amount_usd, baseline_amount_usd, variance, variance_pct FROM "VARIANCE_BASELINE_V" WHERE cost_center = \'{{cost_center}}\' LIMIT 1';
    const nameIn = page.locator('input[placeholder="Name"]').first(); await nameIn.scrollIntoViewIfNeeded(); await nameIn.fill('Get Details via Neon MCP', { timeout: 15000 });
    const descIn = page.locator('textarea[placeholder*="Describe how this AI agent"]').first(); await descIn.scrollIntoViewIfNeeded(); await descIn.fill(DESC, { timeout: 15000 });
    await page.getByText('Autonomous', { exact: true }).first().scrollIntoViewIfNeeded(); await page.getByText('Autonomous', { exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(2500); await H.shot(page, 'aiat_10_filled');
    await page.getByRole('button', { name: 'Save', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(15000); await H.shot(page, 'aiat_11_tool_saved'); H.log('after tool Save: ' + JSON.stringify((await vis(page)).filter(t => /save|saved|error|tool|neon/i.test(t)).slice(0, 20)));
    await page.mouse.click(240, 68); await page.waitForTimeout(8000); await H.shot(page, 'aiat_12_agent_tab');
    for (let t = 0; t < 3; t++) { await page.getByRole('button', { name: 'Save', exact: true }).first().click({ timeout: 15000 }).catch(() => {}); await page.waitForTimeout(15000); const m = await H.rows('sn_aia_agent_tool_m2m', 'agent.name=' + NAME + '^tool.name=Get Details via Neon MCP', 'tool', 1); if (m.length) break; }
    await H.shot(page, 'aiat_13_agent_saved'); H.log('agent has the Neon tool after Save: ' + ((await H.rows('sn_aia_agent_tool_m2m', 'agent.name=' + NAME + '^tool.name=Get Details via Neon MCP', 'tool', 1)).length > 0));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'aiat_error').catch(() => {}); }
  await browser.close();
})();
