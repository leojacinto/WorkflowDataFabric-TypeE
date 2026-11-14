// Guide: Hands-on: Document Intelligence Runtime, the manual path, done like a participant (headless).
const fs = require('fs'), path = require('path'), os = require('os');
const H = require('./human.cjs');
const TASK = 'x_snc_forecast_v_0_variance_task', EVT = 'x_snc_forecast_v_0_expense_transaction_event';
const PDF_URL = 'https://raw.githubusercontent.com/leojacinto/WorkflowDataFabric-TypeA/refs/heads/main/.gitbook/assets/Invoice_IT_Laptop_CC_IT_002.pdf';
const times = []; const stepT = async (name, fn) => { const t = Date.now(); H.log('>>> ' + name); try { return await fn(); } finally { const s = Math.round((Date.now() - t) / 1000); times.push([name, s]); H.log(`<<< ${name} ${s}s`); } };
(async () => {
  const created = { task: null, events: [], atts: [] }; const out = {};
  const { browser, page } = await H.openBrowser();
  try {
    // human step 2: obtain the invoice file from the link in the guide
    const file = path.join(os.tmpdir(), 'Invoice_IT_Laptop_CC_IT_002.pdf');
    await stepT('download the invoice from the guide link', async () => { const r = await fetch(PDF_URL); fs.writeFileSync(file, Buffer.from(await r.arrayBuffer())); H.log(`  ${fs.statSync(file).size} bytes`); });
    const t_start = H.utc();
    await stepT('1. open the variance task form', async () => { await page.goto(`${H.BASE}/${TASK}.do?sys_id=-1`, { waitUntil: 'load', timeout: 90000 }); await page.waitForSelector(`input[id="${TASK}.short_description"]`, { timeout: 60000 }); await H.shot(page, 'di_01_form'); });
    await stepT('2a. short description CC_IT_002', async () => { await page.fill(`input[id="${TASK}.short_description"]`, 'CC_IT_002'); });
    await stepT('2b. click the paper clip, choose file, upload, close', async () => {
      await page.locator('#header_add_attachment, button[aria-label="Manage Attachments"], [title="Manage Attachments"]').first().click();
      await page.waitForSelector('#attachFile', { state: 'attached', timeout: 30000 });
      const chooser = page.waitForEvent('filechooser', { timeout: 5000 }).catch(() => null);
      await page.locator('button:has-text("Choose File"), label:has-text("Choose File"), #attachFile').first().click({ timeout: 5000, force: true }).catch(() => {});
      const fc = await chooser;
      if (fc) await fc.setFiles(file); else await page.setInputFiles('#attachFile', file);
      await page.waitForSelector('text=Invoice_IT_Laptop_CC_IT_002.pdf', { timeout: 60000 });
      await H.shot(page, 'di_02_uploaded');
      await page.locator('#attachment_closemodal, button[aria-label="Close"], .close, [data-dismiss="modal"]').first().click({ timeout: 15000 }).catch(async () => { await page.keyboard.press('Escape'); });
    });
    await stepT('5. State to Work in Progress', async () => { await page.selectOption(`select[id="${TASK}.state"]`, { label: 'Work in Progress' }); await H.shot(page, 'di_03_state'); });
    await stepT('6. Submit', async () => { await page.locator('#sysverb_insert, button:has-text("Submit")').first().click(); await page.waitForLoadState('load', { timeout: 60000 }).catch(() => {}); await H.shot(page, 'di_04_submitted'); });
    const tk = (await H.rows(TASK, `short_description=CC_IT_002^sys_created_on>${t_start}`, 'sys_id,number,state,sys_created_by'))[0];
    if (!tk) throw new Error('the task was not created');
    created.task = tk.sys_id; out.task = tk;
    created.atts = (await H.rows('sys_attachment', `table_sys_id=${tk.sys_id}`, 'sys_id,file_name,content_type,size_bytes')).map(a => (out.attachment = a, a.sys_id));
    H.log(`  task ${tk.number} created by ${tk.sys_created_by}, state ${tk.state}, attachment ${JSON.stringify(out.attachment)}`);
    await stepT('Document Intelligence creates the expense event', async () => {
      const t1 = Date.now();
      while (Date.now() - t1 < 600000) {
        const ev = await H.rows(EVT, 'event_id=EXP-2025-IT-002-1010-01', 'sys_id,owner,vendor,amount_usd,sys_created_by');
        if (ev.length) { out.event = ev[0]; created.events = ev.map(e => e.sys_id); H.log(`  event created: ${JSON.stringify(ev[0])}`); return; }
        await new Promise(r => setTimeout(r, 15000));
      }
      throw new Error('no event in 10 minutes');
    });
    await stepT('agent run starts for the event', async () => {
      const t1 = Date.now();
      while (Date.now() - t1 < 600000) {
        const pl = await H.rows('sn_aia_execution_plan', `objectiveLIKEEXP-2025-IT-002-1010-01^sys_created_on>${t_start}^ORDERBYDESCsys_created_on`, 'state,sys_created_on,sys_updated_on', 1);
        if (pl.length) { out.plan = pl[0]; H.log(`  agent plan: ${JSON.stringify(pl[0])}`); if (String(pl[0].state).toLowerCase() === 'completed') return; }
        await new Promise(r => setTimeout(r, 20000));
      }
      throw new Error('agent run did not complete in 10 minutes: ' + JSON.stringify(out.plan || 'never started'));
    });
    const cs = await H.rows('sn_spend_sdc_service_request', `sys_created_on>${t_start}^ORDERBYDESCsys_created_on`, 'number,short_description,assigned_to', 5);
    out.cases = cs; H.log(`  new Finance Cases: ${JSON.stringify(cs)}`);
  } catch (e) { out.error = String(e.message || e); H.log('ERROR: ' + out.error); await H.shot(page, 'di_error').catch(() => {}); }
  finally {
    await stepT('cleanup (test event, attachment, task)', async () => {
      for (const e of created.events) H.log(`  delete event http=${(await H.rest('DELETE', `table/${EVT}/${e}`)).status}`);
      for (const a of created.atts) H.log(`  delete attachment http=${(await H.rest('DELETE', `table/sys_attachment/${a}`)).status}`);
      if (created.task) H.log(`  delete task http=${(await H.rest('DELETE', `table/${TASK}/${created.task}`)).status}`);
    });
    await browser.close();
    H.log('---- TIMES'); for (const [n, s] of times) H.log(`  ${n.padEnd(52)} ${s}s`);
    H.log(`######## DI MANUAL PATH ${out.error ? 'FAILED: ' + out.error : 'DONE'} total ${H.elapsed()}s`);
    H.log('RESULT ' + JSON.stringify({ task: out.task, attachment: out.attachment, event: out.event, plan: out.plan, cases: out.cases, error: out.error }));
  }
})();
