// Assign a role (env ROLE, default sn_erp_integration.erp_admin) to the admin user through the UI; optional env EMAIL sets the email first (XCC preparation step 3). Ends with log out, log in and a role check.
// Usage: LAB_HOST=<host> LAB_USER_IDX=<line> LAB_PASS_IDX=<line> node role_erp_admin.cjs   (headless Playwright, screenshots in the scratchpad)
const u=require('./u7021.cjs');
const ROLE=process.env.ROLE||'sn_erp_integration.erp_admin';
const EMAIL=process.env.EMAIL||'';
(async()=>{const {b,p}=await u.open();
 // 3. All > Users and Groups > Users  (list of sys_user)
 await p.goto(u.H+'/sys_user_list.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
 // 4. search System Administrator, open admin
 await p.goto(u.H+'/sys_user_list.do?sysparm_query='+encodeURIComponent('user_name=admin'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(8000);
 await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
 console.log('user',await p.evaluate(()=>g_form.getValue('user_name')));
 if(EMAIL){await p.evaluate(e=>g_form.setValue('email',e),EMAIL);await p.getByRole('button',{name:'Update',exact:true}).first().click();await p.waitForTimeout(8000);await p.locator('a.linked').first().click().catch(()=>{});await p.waitForTimeout(6000);console.log('email now',await p.evaluate(()=>g_form.getValue('email')));}
 await p.screenshot({path:u.S+'role_1_user.png'});
 // 5. Roles tab > Edit
 await p.locator('#tabs2_section').scrollIntoViewIfNeeded().catch(()=>{});
 await p.locator('[id="sys_user.sys_user_has_role.user"] button#sysverb_edit_m2m, button#sysverb_edit_m2m').first().click({timeout:20000});
 await p.waitForTimeout(6000);await p.screenshot({path:u.S+'role_2_edit.png'});
 // 6. search the role, select it, move to the right panel with >, Save
 const already=await p.evaluate(r=>[...document.querySelectorAll('select option')].some(o=>o.text.trim()===r&&o.parentElement.id.endsWith('1')||o.text.trim()===r&&/right|selected|slush.*(1|_to)/i.test(o.parentElement.id||o.parentElement.name||'')),ROLE).catch(()=>false);
 const inRight=await p.getByText(ROLE,{exact:true}).count().catch(()=>0);
 console.log('role already in Roles List:',inRight>0&&already);
 if(!(inRight>0&&already)){
  await p.mouse.click(587,257);await p.keyboard.type(ROLE,{delay:40});await p.waitForTimeout(3000);
  await p.mouse.click(470,294);await p.waitForTimeout(1000);
  await p.mouse.click(783,411);await p.waitForTimeout(2000);
 }
 await p.screenshot({path:u.S+'role_3_moved.png'});
 await p.mouse.click(833,603);await p.waitForTimeout(8000);
 // 7. role messages (Adding Role ... to admin), then Save on the user form if shown
 await p.screenshot({path:u.S+'role_4_saved.png'});
 console.log('messages',await p.evaluate(()=>[...document.querySelectorAll('.outputmsg_text,.fieldmsg,.notification')].map(e=>e.innerText.trim()).slice(0,8)));
 // 8. IMPORTANT: log out and log back in (guide), then check the role is in the new session
 await p.goto(u.H+'/logout.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
 await p.goto(u.H+'/login.do',{timeout:90000});await p.fill('#user_name',process.env.LOGIN_USER||require('fs').readFileSync(process.env.ENV_FILE||'/Users/leo.francia/WorkflowDataFabric-TypeE/.env','utf8').split('\n')[+(process.env.LAB_USER_IDX||0)].trim());
 await p.fill('#user_password',require('fs').readFileSync(process.env.ENV_FILE||'/Users/leo.francia/WorkflowDataFabric-TypeE/.env','utf8').split('\n')[+(process.env.LAB_PASS_IDX||0)].trim());await p.click('#sysverb_login');await p.waitForTimeout(10000);
 await p.goto(u.H+'/sys_user_list.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
 console.log('role in new session:',await p.evaluate(r=>window.g_user&&g_user.hasRole(r),ROLE));
 await b.close();})();
