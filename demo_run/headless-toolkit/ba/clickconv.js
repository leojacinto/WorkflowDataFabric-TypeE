// Open a Build Agent conversation by clicking the button inside the list item whose title starts with arg.
(arg) => {
  let hit = null;
  const walk = root => { for (const el of root.querySelectorAll('*')) { if (!hit && el.tagName === 'LI' && (el.textContent || '').trim().startsWith(arg)) hit = el; if (el.shadowRoot) walk(el.shadowRoot); } };
  walk(document);
  if (!hit) return null;
  const b = hit.querySelector('button') || hit;
  const r = b.getBoundingClientRect();
  const o = { bubbles: true, composed: true, cancelable: true, clientX: r.x + 10, clientY: r.y + r.height / 2, button: 0 };
  for (const t of ['pointerdown', 'mousedown', 'pointerup', 'mouseup']) b.dispatchEvent(new (t.startsWith('pointer') ? PointerEvent : MouseEvent)(t, o));
  b.click();
  return 'clicked ' + b.tagName;
}
