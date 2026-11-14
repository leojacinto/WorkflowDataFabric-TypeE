const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/now/agent-studio/create-manage/params/__state__/b64~eyJmNGFmMzYzMjlmZjYxMjEwOGY4M2U1NTE5OTBhMWNkMiI6eyJhZ2VudF9saXN0X2NvbnRyb2xsZXIiOnsiXyI6eyJxdWVyeSI6Im5hbWVTVEFSVFNXSVRIRm9yZWNhc3QgVmFyaWFuY2VeT1JERVJCWXN5c191cGRhdGVkX29uIn19fX0%3D',{timeout:90000}).catch(()=>{});await p.waitForTimeout(15000);await u.dismiss(p);
await p.screenshot({path:u.S+'full2_a.png'});
await b.close();})();
