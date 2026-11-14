const H = require('/Users/leo.francia/WorkflowDataFabric-TypeE/devin_walkthrough_wdf/human/human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/now/nav/ui/classic/params/target/${encodeURIComponent('sn_aia_agent_list.do?sysparm_query=nameSTARTSWITHForecast Variance&sysparm_fields=name,strategy,active')}`, { waitUntil: 'load', timeout: 120000 }); await page.waitForTimeout(20000);
    let fr = page.mainFrame(); for (const f of page.frames()) { if (await f.evaluate(() => /MCP Proof/.test(document.body.textContent) && document.querySelectorAll('th').length > 3).catch(() => false)) { fr = f; break; } } console.log('frame', fr.name() || fr.url().slice(-60));
    await H.shot(page, 'inline_1b_blank');
    // locate the Strategy cell of the Proof row
    const box = await fr.evaluate(() => { const rows = [...document.querySelectorAll('tr')]; const r = rows.find(x => /MCP Proof/.test(x.textContent)); if (!r) return null; const hdr = [...document.querySelectorAll('th')].findIndex(h => /Strategy/.test(h.textContent)); const cells = [...r.children]; const off = cells.length - document.querySelectorAll('th').length; const c = cells[hdr] || cells[3]; const b = c.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2, hdr, ncells: cells.length }; });
    console.log('cell', JSON.stringify(box)); if (!box) throw new Error('row not found');
    await page.mouse.dblclick(320, 321); await page.waitForTimeout(4000); await H.shot(page, 'inline_3_proof_row');
    await page.mouse.click(375, 320); await page.keyboard.type('ReAct', { delay: 80 }); await page.waitForTimeout(4000); await H.shot(page, 'inline_4_typed');
    const opt = page.frames().find(f => f === fr); const sug = await fr.evaluate(() => [...document.querySelectorAll('[role=option], .ac_option, .ac_results li, ul li')].filter(e => e.offsetParent && /ReAct/.test(e.textContent)).map(e => { const b = e.getBoundingClientRect(); return { t: e.textContent.trim().slice(0, 30), x: b.x + b.width / 2, y: b.y + b.height / 2 }; }));
    console.log('suggestions: ' + JSON.stringify(sug)); if (sug.length) { await page.mouse.click(sug[0].x, sug[0].y); await page.waitForTimeout(1500); }
    await H.shot(page, 'inline_5_picked');
    await page.mouse.click(515, 320); await page.waitForTimeout(6000); await H.shot(page, 'inline_6_saved');
  } catch (e) { console.log('ERR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
