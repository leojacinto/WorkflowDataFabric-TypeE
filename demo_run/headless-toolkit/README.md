# Headless toolkit (portable)

Everything here runs from this folder. It is gitignored with the rest of devin_walkthrough_wdf/. Nothing depends on any temp or scratch folder; working files live in this folder (ba/cmd.json, ba/out.json, ba/state.json, work/, annotate/out/).

## Setup (once)

1. Node 20+ and Python 3.9+ on the PATH. Python packages: `pip3 install pillow numpy scipy`.
2. In this folder: `npm install` (installs playwright-core, pinned in package.json), then `npx playwright-core install chromium-headless-shell` (downloads the browser; takes a few minutes).
3. Repo `.env` in the repo root (two levels up from here). Lines 1-3 are the instance host name (no .service-now.com), admin user, admin password; later lines hold the Neon values. Scripts read it and never print it.
4. `./mkauth.sh` writes work/curlauth.cfg for curl. `python3 api.py "table/sys_user?sysparm_limit=1"` should print JSON (read-only REST helper, no curl needed).
5. Check: `python3 e2e/verify.py ihub1` prints PASS lines.

## Start the browser daemon (every session)

```
cd ba
rm -f cmd.json out.json
DPR=1 nohup node daemon.cjs > daemon.log 2>&1 &
# wait until out.json contains {"ready":true}
python3 -I dlogin.py            # logs in from .env, prints nothing secret
./c.sh '{"op":"save"}'          # keeps the login in state.json for the next start
```
Use DPR=2 only when you need sharp screenshots. Stop it with `./c.sh '{"op":"quit"}'`. Only one daemon at a time (check `pgrep -fl daemon.cjs`).

## Talk to the daemon

`ba/c.sh '<json>'` sends one command and prints the result. Ops: goto (path, wait ms), eval (file = a js file in ba/, arg), type (value, chat:true types into the Build Agent box), press (key), click, wait (ms), save, quit. Add `"shot":"name"` to any command to write screenshots/name.png (the folder is devin_walkthrough_wdf/screenshots). The js helpers in ba/ walk shadow roots because Studio hides everything in them: clickaria.js (aria-label), clickbtn.js, clickapprove.js, clicknewconv.js, clickconv.js, deeptext.js (read chat text), listconv.js.

Open the app in Studio: `goto` `/sn_glider_app/servicenow_studio.do?table=sys_app&sysId=a4fd2da13bf8be5062f31831a3e45ac9` with wait 40000, then `eval clickaria.js` arg `Conversations`.

## Build Agent prompts

- `e2e/extract_prompts.py` pulls every prompt out of the guide into e2e/prompts/<id>.txt. Never hand-type a prompt that the guide contains.
- `bash e2e/run_prompt.sh ihub1` (replace `ihub1` with any file name in e2e/prompts/ without .txt; never type angle brackets) = new conversation, paste, approve until idle, then `e2e/verify.py`.
- `ba/runprompt.sh <file>` and `ba/approveloop.sh` are the two halves. The loop clicks Approve and Approve plan and stops (exit 3) when a script would delete or read syslog. Read it; do not approve blindly.
- `e2e/verify.py <stage|all>` is read-only and prints PASS/FAIL. It cannot see BA's own reply (for example the Sum 109200.75); read BA's reply for those.

## Other tools

- `guard.sh`: snapshot of guide assets, UI pages and row counts; run before and after a BA build and diff.
- `preview.cjs <route> <out prefix> "<heading>"...`: renders a guide page from the local build and local lab-guide files and screenshots the headings. Needs `pnpm build` first. `allpages.cjs` checks every route for broken images; `live-check.cjs` checks the deployed UI page.
- `annotate/`: teardrop labels, text boxes and arrows on screenshots. See STATUS.md "Screenshot style". `annotate/runall.py [file names]` renders from specs.py to annotate/out/. `annotate/sheet.py out.png a.png b.png` stacks images for review.
- `neon/nsql.py "<sql>"` runs SQL on Neon as the owner; `neon/asreader.py` as wdf_lab_reader (needs the Neon lines in .env).
- `scopecheck.py`, `regen_cleanup.py`: list what a build left on the instance and rebuild the cleanup script.

## Rules the scripts do not enforce (you must)

Never print .env. Never query syslog. Do not approve a BA script you have not read when the loop stops on it. One daemon, one BA conversation at a time. Messages typed while an approval is pending are dropped.
