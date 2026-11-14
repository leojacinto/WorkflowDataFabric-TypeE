// Focus the Created cell of the results row containing arg and activate it with a click and Enter.
(arg) => {
  let row = null;
  const walk = root => { for (const el of root.querySelectorAll('tr')) { if (!row && (el.textContent || '').includes(arg)) row = el; } for (const el of root.querySelectorAll('*')) if (el.shadowRoot) walk(el.shadowRoot); };
  walk(document);
  if (!row) return null;
  const td = row.querySelector('td[tabindex]') || row.querySelector('td');
  td.focus();
  const r = td.getBoundingClientRect();
  const o = { bubbles: true, composed: true, cancelable: true, clientX: r.x + r.width / 2, clientY: r.y + r.height / 2, button: 0, detail: 2 };
  for (const t of ['mousedown', 'mouseup', 'click', 'dblclick']) td.dispatchEvent(new MouseEvent(t, o));
  for (const t of ['keydown', 'keyup']) td.dispatchEvent(new KeyboardEvent(t, { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, composed: true }));
  return 'activated ' + td.textContent.trim();
}
