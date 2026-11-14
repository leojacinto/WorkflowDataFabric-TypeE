const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/nav/ui/classic/params/target/${encodeURIComponent('sn_aia_agent_list.do?sysparm_query=nameSTARTSWITHForecast Variance')}`, { waitUntil: 'load', timeout: 120000 }); await page.waitForTimeout(20000);
    await page.mouse.move(800, 800); await page.waitForTimeout(2500);
    await page.screenshot({ path: '/private/tmp/claude-501/-Users-leo-francia-WorkflowDataFabric-TypeE/c4c6e574-4851-4c33-8937-cc762b757b3a/scratchpad/list_saved_clean.png' });
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
