#!/usr/bin/env bash
# One full by-hand round, back to back, headless. Integration Hub is verified (not rebuilt) because a rebuild needs the old objects deleted first.
cd "$(dirname "$0")"
LOG=round.log; : > "$LOG"
run() { n=$1; shift; s=$(date +%s); echo "$(date +%T) >>> $n" >> "$LOG"; rm -f human.log; "$@" > "run_$n.out" 2>&1; rc=$?; e=$(( $(date +%s) - s )); res=$(grep -E "########" human.log | tail -1 | cut -c1-150); echo "$(date +%T) <<< $n  ${e}s (${e}s = $((e/60))m $((e%60))s)  exit=$rc  $res" >> "$LOG"; cp human.log "log_$n.txt" 2>/dev/null; }
run fundamentals_table node fundamentals_table.cjs
run fundamentals_ba node fund_table_ba.cjs
run di_setup node di_setup_walk.cjs
run di_params node di_params.cjs
run di_runtime node di_runtime.cjs
AGENT='Forecast Variance QB' run zcc_agent node zcc_agent_test.cjs
run zcc_sql node zcc_sql_wizard.cjs
run zcc_sql_cleanup node zcc_sql_cleanup.cjs
run erp_clone node erp_clone.cjs
run lens node lens_by_hand.cjs
run mcp_agent node mcp_agent.cjs
run mcp_cleanup node mcp_cleanup.cjs
run ecc node ecc_by_hand.cjs
echo "$(date +%T) ROUND DONE" >> "$LOG"
