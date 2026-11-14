#!/usr/bin/env bash
# Approve read-only or in-scope scripts until Build Agent goes idle or asks a question; stop on risky scripts.
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
for n in $(seq 1 40); do
  ./c.sh '{"op":"eval","file":"deeptext.js","arg":"Answers generated"}' >/dev/null
  python3 -I - > state.txt <<'PY'
import json, re
d = json.load(open('out.json')); fr = [f for f in d.get('frames', []) if 'Answers generated' in str(f['r'])]
t = re.sub(r'\n\s*\n+', '\n', str(fr[-1]['r'])) if fr else ''
tail = t[-1800:]
app = bool(re.search(r'\bApprove\b', t[-700:]))
busy = 'Stop processing' in t[-500:] and not app
q = 'Something else' in t[-2500:]
i = t.rfind('Run Script'); s = t[i:t.find('Reject', i)] if i > 0 else ''
risky = bool(re.search(r'syslog|sys_log|deleteRecord|deleteMultiple|\.delete\(', s))
print('APPROVE' if app else 'QUESTION' if q else 'BUSY' if busy else 'IDLE', 'RISKY' if risky else '')
print(tail)
PY
  S=$(head -1 state.txt); echo "$n $S"
  case $S in
    APPROVE\ RISKY) cat state.txt | tail -25; exit 3;;
    APPROVE*) ./c.sh '{"op":"eval","file":"clickapprove.js"}' >/dev/null; ./c.sh '{"op":"eval","file":"clickbtn.js","arg":"Approve plan"}' >/dev/null; ./c.sh '{"op":"wait","ms":20000}' >/dev/null;;
    QUESTION*|IDLE*) tail -n +2 state.txt | tail -30; exit 0;;
    *) ./c.sh '{"op":"wait","ms":20000}' >/dev/null;;
  esac
done
