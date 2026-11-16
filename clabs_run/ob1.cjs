const u=require('./u7021.cjs');
const code=`var out=[];['https://mcp.deepwiki.com/mcp','https://mcp.neon.tech/mcp','https://www.google.com'].forEach(function(url){var t=new Date().getTime();try{var r=new sn_ws.RESTMessageV2();r.setEndpoint(url);r.setHttpMethod('POST');r.setRequestHeader('Content-Type','application/json');r.setRequestHeader('Accept','application/json, text/event-stream');r.setRequestBody('{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"t","version":"1"}}}');r.setHttpTimeout(20000);var x=r.execute();out.push(url+' -> '+x.getStatusCode()+' '+(new Date().getTime()-t)+'ms '+String(x.getBody()).substring(0,80).replace(/\\n/g,' '));}catch(e){out.push(url+' -> ERR '+e.message+' '+(new Date().getTime()-t)+'ms');}});gs.print('OB '+gs.getProperty('instance_name')+' | '+out.join(' || '));`;
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/sys.scripts.do',{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
await p.screenshot({path:u.S+'ob1_'+process.env.TAG+'a.png'});
const ta=p.locator('textarea[name="script"], #runscript').first();await ta.fill(code);
await p.locator('input[value="Run script"], #runscript_button, input[type=submit]').first().click();await p.waitForTimeout(30000);
const t=await p.locator('body').innerText();console.log(t.split('\n').filter(l=>l.includes('OB ')||l.includes(' -> ')||l.includes('|| ')||l.includes('Script completed')).join('\n'));await p.screenshot({path:u.S+'ob1_'+process.env.TAG+'b.png'});await b.close();})();
