const u=require('./u7021.cjs');const O='/Users/leo.francia/WorkflowDataFabric-TypeE/lab-guide/lef-nov-7021/';
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/overview',{timeout:90000});await p.waitForTimeout(20000);
await p.mouse.click(1161,199);await p.waitForTimeout(1500);
await p.mouse.click(218,75);await p.waitForTimeout(12000);console.log(p.url());
await p.screenshot({path:O+'mcp_aia_agentic_solutions_nav.png'});
await b.close();})();
