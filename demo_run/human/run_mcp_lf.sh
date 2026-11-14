#!/usr/bin/env bash
cd "$(dirname "$0")"; LOG=round_lf.log; : > "$LOG"
run() { n=$1; shift; s=$(date +%s); echo "$(date +%T) >>> $n" >> "$LOG"; rm -f human.log; "$@" > "run_$n.out" 2>&1; rc=$?; e=$(( $(date +%s) - s )); res=$(grep -E "########|agents named|plan:|ERROR" human.log | tail -2 | tr '\n' ' ' | cut -c1-300); echo "$(date +%T) <<< $n  ${e}s ($((e/60))m $((e%60))s)  $res" >> "$LOG"; cp human.log "log_$n.txt" 2>/dev/null; }
MCP_SERVER='Neon MCP Lab LF' run agent_lf node mcp_agent.cjs
run cleanup_agent node mcp_cleanup.cjs
python3 cleanup_exact.py "Neon MCP Lab" >> "$LOG" 2>&1
echo "$(date +%T) LF ROUND DONE" >> "$LOG"
