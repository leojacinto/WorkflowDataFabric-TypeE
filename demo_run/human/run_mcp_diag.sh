#!/usr/bin/env bash
cd "$(dirname "$0")"; LOG=round_diag.log; : > "$LOG"
run() { n=$1; shift; s=$(date +%s); echo "$(date +%T) >>> $n" >> "$LOG"; rm -f human.log; "$@" > "run_$n.out" 2>&1; rc=$?; e=$(( $(date +%s) - s )); res=$(grep -E "########|agents named|server row|plan:|ERROR" human.log | tail -2 | tr '\n' ' ' | cut -c1-260); echo "$(date +%T) <<< $n  ${e}s ($((e/60))m $((e%60))s)  $res" >> "$LOG"; cp human.log "log_$n.txt" 2>/dev/null; }
echo "$(date +%T) >>> cleanup of leftovers" >> "$LOG"; python3 cleanup_exact.py "Neon MCP Lab" >> "$LOG" 2>&1
SERVER_NAME='Neon MCP QA' run server node mcp_server.cjs
MCP_SERVER='Neon MCP QA' run agent node mcp_agent.cjs
run cleanup_agent node mcp_cleanup.cjs
echo "$(date +%T) >>> final cleanup" >> "$LOG"; python3 cleanup_exact.py "Neon MCP QA" >> "$LOG" 2>&1
echo "$(date +%T) DIAG ROUND DONE" >> "$LOG"
