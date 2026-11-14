const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_user_has_role_list.do?sysparm_query='+encodeURIComponent('user.user_name=admin^role.nameINagent_admin,agent_role_config_admin,agent_role_config_viewer,agent_security_admin,fd_read_flows,flow_designer,flow_operator,flow_write_enabled,sn_aia.admin,sn_aia.viewer,sn_aia.worker_manager,workflow_ai_author,sn_agent_miner.agent_creation')+'^ORDERBYrole.name',{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
const r=await p.locator('table.list_table tbody tr.list_row').evaluateAll(r=>r.map(x=>x.innerText.replace(/\s+/g,' ').replace('Select record for action: ','').slice(0,90)));console.log(r.length);console.log(r.join('\n'));
await b.close();})();
