import {isServer} from 'lit';

/**
 * Sets the browser tab title (WCAG 2.4.2 — pages must have a descriptive title).
 * No-op during SSR; the client hydration pass applies it.
 * @param {string} title
 */
export function setDocumentTitle(title) {
  if (isServer) return;
  document.title = title ? `${title} · WDF Lab` : 'WDF Lab';
}
