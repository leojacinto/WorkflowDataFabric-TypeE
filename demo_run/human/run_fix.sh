#!/usr/bin/env bash
cd "$(dirname "$0")"; LOG=round_fix.log; : > "$LOG"
run() { n=$1; shift; s=$(date +%s); echo "$(date +%T) >>> $n" >> "$LOG"; rm -f human.log; "$@" > "run_$n.out" 2>&1; rc=$?; e=$(( $(date +%s) - s )); res=$(grep -E "########|agents named" human.log | tail -1 | cut -c1-150); echo "$(date +%T) <<< $n  ${e}s ($((e/60))m $((e%60))s)  exit=$rc  $res" >> "$LOG"; cp human.log "log_$n.txt" 2>/dev/null; }
run mcp_agent node mcp_agent.cjs
run mcp_cleanup node mcp_cleanup.cjs
AGENT_NAME='Forecast Variance QB (Copy)' run mcp_cleanup_copy node mcp_cleanup.cjs
echo "$(date +%T) FIX ROUND DONE" >> "$LOG"
