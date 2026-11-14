const H = require('./human.cjs');
(async () => {
  const { browser, context, page } = await H.openBrowser();
  try {
    await page.goto(`${H.BASE}/x_snc_forecast_v_0_expense_transaction_event_list.do`, { waitUntil: 'load', timeout: 90000 }); await page.waitForTimeout(10000);
    const popup = context.waitForEvent('page', { timeout: 20000 }).catch(() => null);
    await page.getByRole('button', { name: /Create with Lens/i }).first().click({ timeout: 15000 }); await page.waitForTimeout(8000); await H.shot(page, 'lens_04_clicked');
    const p2 = await popup; H.log('popup page: ' + (p2 ? p2.url().slice(0, 150) : 'none')); if (p2) { await p2.waitForTimeout(8000); await p2.screenshot({ path: require('path').join(__dirname, 'shots', 'lens_05_popup.png') }); H.log('popup title: ' + await p2.title()); }
    H.log('pages: ' + JSON.stringify(context.pages().map(x => x.url().slice(0, 120))));
  } catch (e) { H.log('ERROR ' + e.message.split('\n')[0]); await H.shot(page, 'lens_error').catch(() => {}); }
  await browser.close();
})();
