#!/usr/bin/env bash
# Open a new Build Agent conversation, send the prompt file, and poll until approval, a question, or idle.
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; cd "$D"
if [ -n "$1" ]; then
  ./c.sh '{"op":"eval","file":"clicknewconv.js"}' >/dev/null; ./c.sh '{"op":"wait","ms":8000}' >/dev/null
  python3 -I -c "import json,sys;json.dump({'op':'type','chat':True,'value':open(sys.argv[1]).read()},open('cmdtmp.json','w'))" "$1"
  ./c.sh "$(cat cmdtmp.json)" >/dev/null; ./c.sh '{"op":"press","key":"Enter","wait":5000}' >/dev/null
fi
for n in $(seq 1 14); do
  ./c.sh '{"op":"wait","ms":30000}' >/dev/null; ./c.sh '{"op":"eval","file":"deeptext.js","arg":"Answers generated"}' >/dev/null
  S=$(python3 -I -c "
import json,re;d=json.load(open('out.json'));fr=[f for f in d.get('frames',[]) if 'Answers generated' in str(f['r'])];t=str(fr[-1]['r']) if fr else '';print(('APPROVE' if re.search(r'\bApprove\b',t[-1500:]) else '')+('QUESTION' if 'Something else' in t[-2500:] else '')+('BUSY' if 'Stop processing' in t[-800:] else 'IDLE'))")
  echo "$n $S"; case $S in APPROVE*|*QUESTION*|IDLE) break;; esac
done
python3 -I -c "
import json,re;d=json.load(open('out.json'));fr=[f for f in d.get('frames',[]) if 'Answers generated' in str(f['r'])];t=re.sub(r'\n\s*\n+','\n',str(fr[-1]['r']));i=t.rfind('Run Script');s=t[i:t.find('Reject',i)] if i>0 else '';print('WRITES:',re.findall(r'[\w.]+\.(?:update|insert|deleteRecord|updateMultiple|deleteMultiple)\(',s),'IDS:',sorted(set(re.findall(r'[0-9a-f]{32}',s))),'SCOPE:',re.findall(r'Scope\s+(\S+)',s)[:1]);print(t[-1800:])"
