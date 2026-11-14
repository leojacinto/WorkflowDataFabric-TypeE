// List links and clickable elements in the results row containing arg.
(arg) => {
  let row = null;
  const walk = root => { for (const el of root.querySelectorAll('tr')) { if (!row && (el.textContent || '').includes(arg)) row = el; } for (const el of root.querySelectorAll('*')) if (el.shadowRoot) walk(el.shadowRoot); };
  walk(document);
  if (!row) return null;
  return [...row.querySelectorAll('a,[role=link],[tabindex]')].map(e => e.tagName + ' ' + (e.getAttribute('href') || '') + ' ' + (e.textContent || '').trim().slice(0, 40)).slice(0, 15);
}
