#!/usr/bin/env bash
# Task 2 unattended run: ihub2, ihub4_test, zcc_pgtool, zcc_erp. Stops at the first failure. Log: devin_walkthrough_wdf/task2_run.log
R="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"; T="$R/devin_walkthrough_wdf/headless-toolkit"; L="$R/devin_walkthrough_wdf/task2_run.log"; cd "$R"
H=$(head -1 .env | tr -d '\r\n')
ts() { date +%T; }
cases() { python3 "$T/api.py" "stats/sn_spend_sdc_service_request?sysparm_count=true" | tr -d '\n ' | sed 's/.*"count":"\([0-9]*\)".*/\1/'; }
newobjs() { for t in sys_hub_flow sys_hub_action_type_definition sys_alias sys_script; do python3 "$T/api.py" "table/$t?sysparm_query=sys_created_on>=$1^sys_scope=a4fd2da13bf8be5062f31831a3e45ac9&sysparm_fields=sys_id,name" | python3 -c "import sys,json;[print('  NEW $t',r['sys_id'][:8],r['name']) for r in json.load(sys.stdin)]"; done; }
deltest() { ID=$(python3 "$T/api.py" "table/x_snc_forecast_v_0_expense_transaction_event?sysparm_query=event_id=EXP-2025-IT-002-1007-01&sysparm_fields=sys_id" | python3 -c "import sys,json;r=json.load(sys.stdin);print(r[0]['sys_id'] if r else '')"); [ -n "$ID" ] && curl -s -o /dev/null -w "  deleted test row http=%{http_code}\n" -K "$T/work/curlauth.cfg" -X DELETE "https://$H.service-now.com/api/now/table/x_snc_forecast_v_0_expense_transaction_event/$ID"; }
step() { # id verify_stage [predelete]
  local id=$1 st=$2 pre=${3:-}; local s=$(date +%s); local utc=$(date -u +"%Y-%m-%d %H:%M:%S")
  echo "=== $id START $(ts)  finance_cases=$(cases)"
  [ "$pre" = predelete ] && deltest
  bash "$T/e2e/run_prompt.sh" "$id" "$st" > "$R/devin_walkthrough_wdf/task2_$id.log" 2>&1; local rc=$?
  echo "=== $id END $(ts)  elapsed=$(( $(date +%s)-s ))s  exit=$rc  finance_cases=$(cases)"
  newobjs "$utc"
  grep -E "^(PASS|FAIL|RESULT|NOTE)" "$R/devin_walkthrough_wdf/task2_$id.log" | cut -c1-160
  echo "--- BA reply tail ($id):"; grep -v "^\s*$" "$R/devin_walkthrough_wdf/task2_$id.log" | grep -v "approveloop exit\|^PASS\|^FAIL\|^RESULT\|^== " | tail -14 | cut -c1-220
  grep -q "^FAIL" "$R/devin_walkthrough_wdf/task2_$id.log" && { echo "STOPPED: verify FAIL at $id"; exit 1; }
  [ $rc -ne 0 ] && { echo "STOPPED: exit $rc at $id"; exit 1; }
  return 0
}
{
python3 "$T/e2e/extract_prompts.py" >/dev/null
sed 's/<your table name>/x_snc_forecast_v_0_df_cc_summ_dvn/' "$T/e2e/prompts/zcc_pgtool.txt" > "$T/e2e/prompts/zcc_pgtool_x.txt"
echo "RUN START $(ts)"
step ihub2 ihub2
step ihub4_test ihub1 predelete
step zcc_pgtool_x zcc_pgtool
step zcc_erp zcc_erp
echo "RUN END $(ts)  ALL DONE"
} > "$L" 2>&1
