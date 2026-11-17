const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
const names=['Build Agent','ServiceNow Studio','AI Agents','Generative AI Controller','Generative AI platform','Skill Builder','Now Assist Admin','Model Context Protocol Client','Model Context Protocol Server','Universal MCP Client','Zero Copy Connector Hub','Zero Copy Connector for ERP','Document Intelligence','ServiceNow AI Lens','Flow Designer'];
const q='version=13.0.1^ORnameLIKEGen AI^ORnameLIKEGenerative AI platform^ORnameLIKEAI platform';
const r=await p.evaluate(async(q)=>{const x=await fetch('/api/now/table/sys_store_app?sysparm_fields=name,scope,version&sysparm_limit=200&sysparm_query='+encodeURIComponent(q),{headers:{Accept:'application/json','X-UserToken':window.g_ck}});const j=await x.json();return j.result||[x.status,JSON.stringify(j).slice(0,300)];},q);
if(!Array.isArray(r)||typeof r[0]!=='object'){console.log('ERR',JSON.stringify(r));}
console.log((r||[]).filter(a=>a&&a.name).map(a=>a.name+' | '+a.scope+' | '+a.version).sort().join('\n'));
await b.close();})();
