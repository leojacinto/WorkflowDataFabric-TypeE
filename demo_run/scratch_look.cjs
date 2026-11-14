const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/aiux/aia/agent/9fd6ad8847a09310037d0fadf26d4373/visualize`, { waitUntil: 'domcontentloaded', timeout: 240000 }); await page.waitForTimeout(30000);
    await page.getByRole('button', { name: 'Edit' }).first().click({ timeout: 60000 }); await page.waitForTimeout(15000);
    const txt = await page.evaluate(() => document.body.innerText);
    console.log('has Strategy:', /strategy/i.test(txt), '| has ReAct:', /react/i.test(txt));
    console.log((txt.match(/.{0,60}(strategy|reasoning|ReAct).{0,60}/gi) || []).slice(0, 6).join('\n'));
    await H.shot(page, 'proof_editor_top');
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
