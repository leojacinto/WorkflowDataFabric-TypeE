// In the results table row containing arg, click its first button (the row menu) and list the visible menu items.
(arg) => {
  let row = null;
  const walk = root => { for (const el of root.querySelectorAll('tr')) { if (!row && (el.textContent || '').includes(arg)) row = el; } for (const el of root.querySelectorAll('*')) if (el.shadowRoot) walk(el.shadowRoot); };
  walk(document);
  if (!row) return null;
  const btns = [];
  const walk2 = root => { for (const el of root.querySelectorAll('button,[role=button]')) btns.push(el); for (const el of root.querySelectorAll('*')) if (el.shadowRoot) walk2(el.shadowRoot); };
  walk2(row);
  if (!btns.length) return 'row found, no buttons: ' + row.innerHTML.slice(0, 300);
  btns[0].click();
  return 'clicked ' + btns.length + ' ' + (btns[0].getAttribute('aria-label') || btns[0].textContent || '').trim().slice(0, 40);
}
