#!/usr/bin/env bash
cd "$(dirname "$0")"; LOG=round_probe.log; : > "$LOG"
run() { n=$1; shift; s=$(date +%s); echo "$(date +%T) >>> $n" >> "$LOG"; rm -f human.log; "$@" > "run_$n.out" 2>&1; e=$(( $(date +%s) - s )); res=$(grep -E "TOOL FETCH|API Key mode|ERROR" human.log | tail -2 | tr '\n' ' ' | cut -c1-260); echo "$(date +%T) <<< $n  ${e}s  $res" >> "$LOG"; }
for combo in "raw bearer" "bearer raw" "raw raw" "bearer bearer"; do set -- $combo
  API_MODE=$1 AUTH_MODE=$2 run "cred_$1_$2" node cred_set.cjs
  PROBE=1 run "probe_$1_$2" node mcp_agent.cjs
  run "clean_$1_$2" node mcp_cleanup.cjs
done
python3 cleanup_exact.py "Neon MCP Lab" >> "$LOG" 2>&1
echo "$(date +%T) PROBE ROUND DONE" >> "$LOG"
