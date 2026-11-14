# clabs_run

Headless/visible Playwright scripts for lab instances on `*.lab.service-now.com`
(first target: https://lef-nov-7021-0001.lab.service-now.com, UI only, no REST).
Demo/Perelandra instances (demoalectriallwf*.service-now.com) live in `../demo_run`.

- `u7021.cjs` headless helper (open, dismiss, nav). `u7021h.cjs` same but visible (Chrome channel).
- Other host: `LAB_HOST=https://lef-nov-3490-0001.lab.service-now.com LAB_USER_IDX=<n> LAB_PASS_IDX=<n> node x.cjs`
  (0-based `.env` line indexes of the user and password; defaults 18 and 19 = 7021 since the .env reorder on 2026-11-14; 14 and 15 = lef-nov-3490).
- Scripts write screenshots to the helper's `S` folder; credentials are read from `.env`, never stored here.
