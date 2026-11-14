const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/nav/ui/classic/params/target/${encodeURIComponent('sn_aia_agent_list.do?sysparm_query=nameSTARTSWITHForecast Variance&sysparm_fields=name,strategy,active')}`, { waitUntil: 'load', timeout: 120000 }); await page.waitForTimeout(20000);
    const heads = []; for (const f of page.frames()) { const t = await f.evaluate(() => [...document.querySelectorAll('th')].map(e => e.textContent.trim()).filter(Boolean)).catch(() => []); if (t.length) heads.push(t); }
    console.log(JSON.stringify(heads)); await H.shot(page, 'listtest');
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
