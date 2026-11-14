// Click the visible Approve button (through shadow roots) in this frame.
() => {
  const find = root => {
    for (const e of root.querySelectorAll('*')) {
      if (e.shadowRoot) { const r = find(e.shadowRoot); if (r) return r; }
      if (e.tagName === 'BUTTON' && e.textContent.trim() === 'Approve' && e.offsetParent !== null) return e;
    }
    return null;
  };
  const b = find(document);
  if (!b) return null;
  b.click();
  return 'clicked';
}
