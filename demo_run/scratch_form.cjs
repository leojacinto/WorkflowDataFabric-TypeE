const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/sn_aia_agent.do?sys_id=9fd6ad8847a09310037d0fadf26d4373`, { waitUntil: 'load', timeout: 120000 }); await page.waitForTimeout(12000);
    if (await page.getByText('To edit this record click here', { exact: false }).count()) console.log('scope banner present');
    const labels = await page.evaluate(() => [...document.querySelectorAll('label, .label-text')].map(e => e.textContent.trim()).filter(Boolean).slice(0, 40));
    console.log(JSON.stringify(labels));
    await H.shot(page, 'proof_classic_form');
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
