#!/usr/bin/env bash
cd "$(dirname "$0")"; LOG=round_fixcheck.log; : > "$LOG"
run() { n=$1; shift; s=$(date +%s); echo "$(date +%T) >>> $n" >> "$LOG"; rm -f human.log; "$@" > "run_$n.out" 2>&1; rc=$?; e=$(( $(date +%s) - s )); res=$(grep -E "########|agents named|server row|plan:|ERROR|PASS|completed" human.log | tail -3 | tr '\n' ' ' | cut -c1-330); echo "$(date +%T) <<< $n  ${e}s ($((e/60))m $((e%60))s)  $res" >> "$LOG"; cp human.log "log_$n.txt" 2>/dev/null; }
run server node mcp_server.cjs
run agent node mcp_agent.cjs
run cleanup_agent node mcp_cleanup.cjs
python3 cleanup_exact.py "Neon MCP Lab" >> "$LOG" 2>&1
echo "$(date +%T) FIXCHECK ROUND DONE" >> "$LOG"
