#!/usr/bin/env bash
cd "$(dirname "$0")"; LOG=round_probe_lf.log; : > "$LOG"
rm -f human.log; PROBE=1 MCP_SERVER='Neon MCP Lab LF' node mcp_agent.cjs > run_probe_lf.out 2>&1; echo "$(date +%T) LF probe: $(grep -E 'TOOL FETCH|ERROR' human.log | tail -2 | tr '\n' ' ' | cut -c1-260)" >> "$LOG"
rm -f human.log; node mcp_cleanup.cjs > run_clean_lf.out 2>&1; echo "$(date +%T) $(grep 'agents named' human.log | tail -1 | cut -c1-200)" >> "$LOG"
python3 cleanup_exact.py "Neon MCP Lab" >> "$LOG" 2>&1
echo "$(date +%T) LF PROBE DONE" >> "$LOG"
