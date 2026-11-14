// Report the frame and on-screen box of the conversation list item whose title starts with arg.
(arg) => {
  let hit = null;
  const walk = root => { for (const el of root.querySelectorAll('*')) { if (!hit && el.tagName === 'LI' && (el.textContent || '').trim().startsWith(arg)) hit = el; if (el.shadowRoot) walk(el.shadowRoot); } };
  walk(document);
  if (!hit) return null;
  const r = hit.getBoundingClientRect();
  return { href: location.href.slice(0, 160), box: [r.x, r.y, r.width, r.height], html: hit.outerHTML.slice(0, 600) };
}
