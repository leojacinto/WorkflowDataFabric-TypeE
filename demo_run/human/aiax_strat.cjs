const H = require('./human.cjs');
(async () => {
  const { browser, page } = await H.openBrowser();
  try {
    const ag = (await H.rows('sn_aia_agent', 'name=Forecast Variance Neon MCP Lab', 'sys_id', 1))[0];
    await page.goto(`${H.BASE}/aiux/aia/agent/${ag.sys_id}/visualize`, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(45000);
    await page.getByRole('button', { name: 'Edit' }).first().click({ timeout: 25000 }); await page.waitForTimeout(12000);
    const txt = await page.evaluate(() => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { if (e.shadowRoot) walk(e.shadowRoot, a); } a.push(r.textContent || ''); return a; }; return walk(document, []).join(' ').replace(/\s+/g, ' '); });
    const m = [...txt.matchAll(/.{60}(strateg|ReAct|reasoning|Version details).{80}/gi)].slice(0, 8).map(x => x[0]); H.log('matches: ' + JSON.stringify(m));
    await page.getByRole('button', { name: 'Version details' }).first().click({ timeout: 15000 }).catch(() => H.log('no Version details button')); await page.waitForTimeout(6000); await H.shot(page, 'aiax_strat_version_details');
    const t2 = await page.evaluate(() => { const walk = (r, a) => { for (const e of r.querySelectorAll('*')) { if (e.shadowRoot) walk(e.shadowRoot, a); } a.push(r.textContent || ''); return a; }; return walk(document, []).join(' ').replace(/\s+/g, ' '); });
    H.log('after Version details: ' + JSON.stringify([...t2.matchAll(/.{60}(strateg|ReAct|reasoning).{80}/gi)].slice(0, 6).map(x => x[0])));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); }
  await browser.close();
})();
