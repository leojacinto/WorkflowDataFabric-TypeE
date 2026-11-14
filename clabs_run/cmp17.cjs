const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys_hub_flow.do?XML&sys_id='+process.env.FID,{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
const t=await p.evaluate(()=>document.body.innerText);
const keep=/^\s*<(sys_scope|sys_package|access|run_as|run_as_user|active|status|type|name|callable_by_client_api|flow_priority|label_cache|sys_policy|protection_policy|master|show_draft_actions|internal_name|annotation|authored_on_release_version|sys_class_name|sys_domain|copied_from|sys_created_by|sys_updated_by|source_ui|apply_scope|runs_as|accessible_from|available_to)\b/;
console.log(t.split('\n').filter(l=>keep.test(l)).map(l=>l.trim().slice(0,160)).join('\n'));
await b.close();})();
