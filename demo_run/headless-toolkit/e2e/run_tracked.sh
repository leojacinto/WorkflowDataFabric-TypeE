#!/usr/bin/env bash
# run_prompt.sh plus a manifest of what the run created. usage: e2e/run_tracked.sh <prompt id> [verify stage]
# Then clean exactly that run with: python3 e2e/track.py clean <run> --yes   (dry run without --yes)
set -u
E="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; id="$1"; run="$id-$(date +%m%d-%H%M)"
python3 "$E/track.py" start "$run"
s=$(date +%s); echo "$run START $(date +%T)"
bash "$E/run_prompt.sh" "$id" "${2:-$id}"; rc=$?
echo "$run END $(date +%T) elapsed=$(( $(date +%s)-s ))s exit=$rc"
python3 "$E/track.py" end "$run"; python3 "$E/track.py" list "$run"
echo "clean this run: python3 $E/track.py clean $run [--yes]"
exit $rc
