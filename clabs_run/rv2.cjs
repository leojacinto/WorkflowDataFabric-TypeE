const u=require('./u7021.cjs');
(async()=>{const {b,p}=await u.open();
await p.goto(u.H+'/discovery_credentials_list.do?sysparm_query='+encodeURIComponent('name=Neon MCP Lab_1794584798216'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(7000);
await p.locator('a.linked').first().click();await p.waitForTimeout(8000);
const ids=await p.evaluate(()=>[...document.querySelectorAll('input,textarea')].map(e=>e.id).filter(i=>/header/i.test(i)));console.log(ids);
const names=ids.map(i=>i.replace(/^.*\./,''));
for(const i of ids){if(i.startsWith('api_key_credentials.api_key_header_name')){const el=p.locator('[id="'+i+'"]');console.log(i,'=',await el.inputValue());await el.fill('');}}
await p.mouse.click(1281,21);await p.waitForTimeout(8000);
await p.goto(u.H+'/discovery_credentials_list.do?sysparm_query='+encodeURIComponent('name=Neon MCP Lab_1794584798216'),{timeout:90000}).catch(()=>{});await p.waitForTimeout(6000);
await p.locator('a.linked').first().click();await p.waitForTimeout(7000);
for(const i of ids){if(i.startsWith('api_key_credentials.api_key_header_name'))console.log('after',i,JSON.stringify(await p.locator('[id="'+i+'"]').inputValue()));}
await b.close();})();
