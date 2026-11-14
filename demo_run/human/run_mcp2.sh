#!/usr/bin/env bash
cd "$(dirname "$0")"; LOG=round_mcp2.log; : > "$LOG"
run() { n=$1; shift; s=$(date +%s); echo "$(date +%T) >>> $n" >> "$LOG"; rm -f human.log; "$@" > "run_$n.out" 2>&1; rc=$?; e=$(( $(date +%s) - s )); res=$(grep -E "########|agents named|server row" human.log | tail -1 | cut -c1-170); echo "$(date +%T) <<< $n  ${e}s ($((e/60))m $((e%60))s)  $res" >> "$LOG"; cp human.log "log_$n.txt" 2>/dev/null; }
MCP_SERVER='Neon MCP Lab LF' run lf_check node mcp_agent.cjs
run cleanup1 node mcp_cleanup.cjs
SERVER_NAME='Neon MCP QA' run create_qa_server node mcp_server.cjs
MCP_SERVER='Neon MCP QA' run qa_server_test node mcp_agent.cjs
run cleanup2 node mcp_cleanup.cjs
echo "$(date +%T) ROUND DONE" >> "$LOG"
