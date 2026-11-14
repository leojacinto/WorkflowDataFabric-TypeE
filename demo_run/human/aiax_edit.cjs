// New AI Agent Studio (/aiux/aia): open the copy, rename it, add the MCP bullet under Step 2, Save, then open + Add tool. By hand, headless.
const H = require('./human.cjs');
const COPY = process.env.AGENT_NAME || 'Forecast Variance QB (Copy)'; const NAME = 'Forecast Variance Neon MCP Lab';
const BULLET = '- Also run the MCP tool "Get Details via Neon MCP" as a secondary check. Only return one entry (limit = 1). Columns should be ["COST_CENTER", "ACTUAL_AMOUNT_USD", "BASELINE_AMOUNT_USD", "VARIANCE", "VARIANCE_PCT"]';
const vis = async page => (await page.locator('a, button, [role=tab], [role=menuitem], input, textarea, h1, h2, h3, label').evaluateAll(els => els.filter(e => e.offsetParent !== null).map(e => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || (e.value && e.value.slice(0, 30)) || e.textContent || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 70))).slice(0, 60);
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    const ag = (await H.rows('sn_aia_agent', 'name=' + COPY, 'sys_id,name', 1))[0]; if (!ag) throw new Error('agent not found: ' + COPY);
    await page.goto(`${H.BASE}/aiux/aia/agent/${ag.sys_id}/visualize`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(45000);
    await page.getByRole('button', { name: 'Edit' }).first().click({ timeout: 25000 }); await page.waitForTimeout(10000);
    const nameBox = page.getByRole('textbox', { name: /^Name/ }).first(); await nameBox.fill(NAME, { timeout: 15000 }); await page.waitForTimeout(1500);
    await page.mouse.click(740, 704); await page.keyboard.press('End'); await page.waitForTimeout(800); await page.keyboard.press('Enter'); await page.keyboard.type(BULLET, { delay: 4 }); await page.waitForTimeout(1500);
    await H.shot(page, 'aiae_02_renamed_bullet'); await page.getByRole('button', { name: 'Save', exact: true }).first().click({ timeout: 15000 }); await page.waitForTimeout(12000); await H.shot(page, 'aiae_03_saved');
    await page.getByRole('button', { name: '+ Add tool' }).first().click({ timeout: 15000 }).catch(async () => { await page.getByText('+ Add tool').first().click({ timeout: 15000 }); }); await page.waitForTimeout(6000); await H.shot(page, 'aiae_04_add_tool'); H.log('after + Add tool: ' + JSON.stringify(await vis(page)));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'aiae_error').catch(() => {}); }
  await browser.close();
})();
