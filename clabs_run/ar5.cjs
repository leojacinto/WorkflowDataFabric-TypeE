const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sn_aia_tool_list.do?sysparm_query='+encodeURIComponent('name=Budget Variance Analysis'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(12000);await u.dismiss(p);
await p.mouse.click(152,130);await p.waitForTimeout(10000);
for(let i=1;i<=3;i++){
 await p.mouse.wheel(0,700);await p.waitForTimeout(800);
 await p.getByRole('tab',{name:'Agent Tools'}).first().click().catch(()=>{});await p.waitForTimeout(1500);
 await p.screenshot({path:u.S+'ar5_'+i+'_agents.png',clip:{x:0,y:430,width:1600,height:470}});
 await p.getByRole('tab',{name:'Tool ACL'}).first().click().catch(()=>{});await p.waitForTimeout(3000);
 await p.screenshot({path:u.S+'ar5_'+i+'_acl.png',clip:{x:0,y:430,width:1600,height:470}});
 await p.mouse.wheel(0,-2000);await p.waitForTimeout(500);
 if(i<3){await p.mouse.click(1574,22);await p.waitForTimeout(8000);}
}
await b.close();})();
