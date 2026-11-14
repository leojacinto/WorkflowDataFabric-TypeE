// Read Build Agent workspace file contents through the logged-in browser session (first frame that holds a g_ck token).
async (arg) => {
  const ck = window.g_ck || (window.NOW && window.NOW.g_ck);
  if (!ck) return null;
  const out = {};
  for (const id of arg.split(',')) {
    const r = await fetch('/api/now/table/sn_glider_ide_file_content/' + id, { headers: { Accept: 'application/json', 'X-UserToken': ck } });
    const j = await r.json().catch(() => ({}));
    out[id] = j.result ? j.result : { status: r.status, keys: Object.keys(j) };
  }
  return out;
}
