// Click the first visible button whose trimmed text equals arg (through shadow roots), with a full pointer sequence.
(arg) => {
  let hit = null;
  const walk = root => { for (const el of root.querySelectorAll('*')) { if (!hit && el.tagName === 'BUTTON' && (el.textContent || '').trim() === arg && el.getClientRects().length) hit = el; if (el.shadowRoot) walk(el.shadowRoot); } };
  walk(document);
  if (!hit) return null;
  const r = hit.getBoundingClientRect();
  const o = { bubbles: true, composed: true, cancelable: true, clientX: r.x + r.width / 2, clientY: r.y + r.height / 2, button: 0 };
  for (const t of ['pointerdown', 'mousedown', 'pointerup', 'mouseup']) hit.dispatchEvent(new (t.startsWith('pointer') ? PointerEvent : MouseEvent)(t, o));
  hit.click();
  return 'clicked ' + arg;
}
