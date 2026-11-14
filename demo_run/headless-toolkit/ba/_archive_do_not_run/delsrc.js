() => window.gDeleteAppDialog ? String(window.gDeleteAppDialog.deleteApp).slice(0, 1500) + '\n----\n' + Object.keys(window.gDeleteAppDialog).join(',') : null
