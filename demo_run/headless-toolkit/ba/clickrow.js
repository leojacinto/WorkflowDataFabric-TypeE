// Click the results-list cell whose text starts with arg (through shadow roots).
(arg) => {
  let hit = null;
  const walk = root => { for (const el of root.querySelectorAll('*')) { if (!hit && el.children.length < 3 && (el.textContent || '').trim().startsWith(arg) && el.getClientRects().length) hit = el; if (el.shadowRoot) walk(el.shadowRoot); } };
  walk(document);
  if (!hit) return null;
  hit.scrollIntoView({ block: 'center' });
  const r = hit.getBoundingClientRect();
  const o = { bubbles: true, composed: true, cancelable: true, clientX: r.x + 5, clientY: r.y + r.height / 2, button: 0 };
  for (const t of ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']) hit.dispatchEvent(new (t.startsWith('pointer') ? PointerEvent : MouseEvent)(t, o));
  return 'clicked ' + hit.tagName + ' ' + (hit.textContent || '').trim().slice(0, 60);
}
