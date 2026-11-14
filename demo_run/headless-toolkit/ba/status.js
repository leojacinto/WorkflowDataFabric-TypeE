// Chat status: pending approval, still processing, and the tail of the transcript.
() => {
  let approve = false, processing = false, hasChat = false;
  const parts = [];
  const walk = root => {
    for (const e of root.querySelectorAll('*')) {
      if (e.shadowRoot) walk(e.shadowRoot);
      if (e.tagName === 'BUTTON' && e.textContent.trim() === 'Approve' && e.offsetParent !== null) approve = true;
      if (e.tagName === 'BUTTON' && (e.getAttribute('aria-label') || '') === 'New chat') hasChat = true;
    }
  };
  walk(document);
  if (!hasChat) return null;
  const text = document.body.innerText;
  processing = /Processing/.test(text.slice(-400));
  return { approve, processing, tail: text.slice(-1500) };
}
