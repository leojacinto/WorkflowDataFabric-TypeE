// Probe which REST calls work from each frame of the Studio page.
async () => {
  const ck = window.g_ck || (window.NOW && window.NOW.g_ck) || '';
  const out = { ck: ck ? ck.length : 0, href: location.pathname };
  for (const u of ['/api/now/table/sys_user?sysparm_limit=1&sysparm_fields=user_name', '/api/now/table/sn_glider_ide_file_content?sysparm_limit=1&sysparm_fields=sys_id', '/api/now/table/sn_glider_ide_file_index?sysparm_limit=1&sysparm_fields=sys_id']) {
    const r = await fetch(u, { headers: ck ? { Accept: 'application/json', 'X-UserToken': ck } : { Accept: 'application/json' } });
    out[u.slice(15, 50)] = r.status + ' ' + (await r.text()).slice(0, 120);
  }
  return out;
}
