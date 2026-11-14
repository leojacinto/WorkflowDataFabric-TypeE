#!/usr/bin/env bash
# Runs ONE guide prompt through Build Agent exactly as written, approves the scripts, then verifies the instance.
# usage: e2e/run_prompt.sh <stage id>        e.g. ihub1   (prompt text is e2e/prompts/<id>.txt, from the guide)
# Needs the daemon running and logged in (see README.md, "Start"). Stops and prints the script if Build Agent wants to delete anything.
set -u
T="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"; B="$T/ba"; id="$1"
[ -f "$T/e2e/prompts/$id.txt" ] || { echo "no prompt $id; run: python3 e2e/extract_prompts.py"; exit 2; }
"$B/c.sh" '{"op":"goto","path":"/sn_glider_app/servicenow_studio.do?table=sys_app&sysId=a4fd2da13bf8be5062f31831a3e45ac9","wait":40000}' >/dev/null
"$B/c.sh" '{"op":"eval","file":"clickaria.js","arg":"Conversations"}' >/dev/null; "$B/c.sh" '{"op":"wait","ms":4000}' >/dev/null
"$B/runprompt.sh" "$T/e2e/prompts/$id.txt" | tail -25
"$B/approveloop.sh" | tail -30
rc=$?
echo "approveloop exit $rc  (3 = risky script, read it and decide yourself; 0 = idle or question)"
[ "$rc" = 0 ] && python3 -I "$T/e2e/verify.py" "${2:-$id}"
