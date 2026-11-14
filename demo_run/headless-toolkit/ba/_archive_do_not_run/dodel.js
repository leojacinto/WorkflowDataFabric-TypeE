() => { if (!window.gDeleteAppDialog) return null; try { const r = window.gDeleteAppDialog.deleteApp(); return 'called ' + String(r); } catch (e) { return 'ERR ' + e.message; } }
