// Deep text of the frame (through shadow roots), only if it contains the marker.
(marker) => {
  const parts = [];
  const walk = node => {
    for (const child of node.childNodes) {
      if (child.nodeType === 3) parts.push(child.textContent);
      else if (child.nodeType === 1) {
        if (child.shadowRoot) walk(child.shadowRoot);
        walk(child);
        if (['DIV', 'P', 'LI', 'PRE', 'BR', 'TR', 'H1', 'H2', 'H3', 'BUTTON'].includes(child.tagName)) parts.push('\n');
      }
    }
  };
  walk(document.body || document);
  const text = parts.join('').replace(/\n{3,}/g, '\n\n');
  return !marker || text.includes(marker) ? text : null;
}
