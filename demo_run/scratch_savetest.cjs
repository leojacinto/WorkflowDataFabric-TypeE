const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    const before = (await H.rows('sn_aia_agent', 'sys_id=9fd6ad8847a09310037d0fadf26d4373', 'strategy', 1))[0]; console.log('before', JSON.stringify(before.strategy && before.strategy.value ? 'ReAct-id' : 'blank'));
    await page.goto(`${H.BASE}/aiux/aia/agent/9fd6ad8847a09310037d0fadf26d4373/visualize`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(30000);
    await page.getByRole('button', { name: 'Edit' }).first().click({ timeout: 60000 }); await page.waitForTimeout(15000);
    const inp = page.locator('input, textarea'); const n = await inp.count(); let tgt = null; for (let i = 0; i < n; i++) { const v = await inp.nth(i).inputValue().catch(() => ''); if (/^Reviews new expense events/.test(v)) { tgt = inp.nth(i); break; } }
    if (!tgt) throw new Error('description input not found'); await tgt.click(); await page.keyboard.press('End'); await page.keyboard.type(' ', { delay: 30 }); await page.keyboard.type('x', { delay: 30 }); await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Save', exact: true }).filter({ visible: true }).first().click({ timeout: 20000 }); await page.waitForTimeout(15000);
    await H.shot(page, 'savetest_after');
    const after = (await H.rows('sn_aia_agent', 'sys_id=9fd6ad8847a09310037d0fadf26d4373', 'strategy,description', 1))[0]; console.log('after', JSON.stringify(after.strategy && after.strategy.value ? 'ReAct-id' : 'blank'), '| description ends:', JSON.stringify((after.description || '').slice(-12)));
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
