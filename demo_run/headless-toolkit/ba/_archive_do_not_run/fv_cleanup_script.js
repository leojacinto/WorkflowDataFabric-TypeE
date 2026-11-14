var plan = {"sn_aia_trigger_agent_usecase_m2m": ["45be44683bd6765062f31831a3e45a4b"], "sn_aia_trigger_configuration": ["01be4c283bd6765062f31831a3e45aae"], "sn_aia_agent_tool_m2m": ["105dbef23bb2b2500ad1a021a3e45ab6", "2a1f46af3bee76500ad1a021a3e45a16", "2a1f46af3bee76500ad1a021a3e45a42", "2d0bc0203b96765062f31831a3e45a0e", "37869d143b5e72900ad1a021a3e45a92", "616b2f2f3b6ef21062f31831a3e45a49", "6a1f46af3bee76500ad1a021a3e45a3b", "7c850be23bc272900ad1a021a3e45a76", "a90bc0203b96765062f31831a3e45a00", "b3f173ea3bc2b2900ad1a021a3e45ab8", "c71a3e223bce32900ad1a021a3e45a1f", "e90bc0203b96765062f31831a3e45a15", "ea1f46af3bee76500ad1a021a3e45a49", "ed0bc0203b96765062f31831a3e45a07", "ee10f907018b32107f44189f958a047c"], "sn_aia_agent_config": ["261f46af3bee76500ad1a021a3e45a10", "4bf138263b38b2d062f31831a3e45a0c", "6d0b80203b96765062f31831a3e45afb"], "sn_aia_version": ["2e1f46af3bee76500ad1a021a3e45a04", "87f138263b38b2d062f31831a3e45a06", "ad0b80203b96765062f31831a3e45af3"], "sn_aia_skill_metadata": ["6b88a05b3b51be900ad1a021a3e45a4c", "6ee01ce43b1a765062f31831a3e45a12", "dddd47e73baaf6500ad1a021a3e45a2c"], "sys_security_acl": ["4b1f86af3bee76500ad1a021a3e45a48", "8e0b04203b96765062f31831a3e45a38", "a7f138263b38b2d062f31831a3e45af0"], "sn_aia_agent": ["290bc4ec3b56765062f31831a3e45a86", "e61f42af3bee76500ad1a021a3e45ab0", "fbc138e23b38b2d062f31831a3e45a65"], "sn_aia_tool": ["185dfaf23bb2b2500ad1a021a3e45a77", "70854bae3b4272900ad1a021a3e45a34", "899364df3bdd7e900ad1a021a3e45ad1", "bb8695d03b5e72900ad1a021a3e45ad4", "e2107907018b32107f44189f958a04cf", "e56b2f2f3b6ef21062f31831a3e45a42"], "sys_hub_flow": ["2a71d9143bda72900ad1a021a3e45a0f", "35b5bb183bda365062f31831a3e45aa1", "65714b6e3b4272900ad1a021a3e45ac5", "b36d314b3bd1fa900ad1a021a3e45a7a"], "sys_hub_action_type_definition": ["04c042c73b15fa900ad1a021a3e45ab7", "b05c63943bd6365062f31831a3e45aaa"], "http_connection": ["8d80f6e93bb78fd4a0db3141a3e45ae6"], "sys_alias": ["8f070dcb010732107f44189f958a04a4"], "sys_script": ["7fb0a12939db32107f44f866ad47bf7f"]};
var order = ["sn_aia_trigger_agent_usecase_m2m", "sn_aia_trigger_configuration", "sn_aia_agent_tool_m2m", "sn_aia_agent_config", "sn_aia_version", "sn_aia_skill_metadata", "sys_security_acl", "sn_aia_agent", "sn_aia_tool", "sys_hub_flow", "sys_hub_action_type_definition", "http_connection", "sys_alias", "sys_script"];
var log = [];
order.forEach(function (t) {
  plan[t].forEach(function (id) {
    var gr = new GlideRecord(t);
    if (gr.get(id)) {
      var label = gr.getDisplayValue() || id;
      gr.deleteRecord();
      log.push(t + " deleted " + label);
    } else {
      log.push(t + " missing " + id);
    }
  });
});
gs.info("FV_CLEANUP " + log.length + " of 47\n" + log.join("\n"));
