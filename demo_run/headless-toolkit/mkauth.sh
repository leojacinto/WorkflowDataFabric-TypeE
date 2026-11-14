#!/usr/bin/env bash
# Writes work/curlauth.cfg (curl -K file) from the repo .env: line 1 host, line 2 user, line 3 password. Never prints them.
T="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; mkdir -p "$T/work"
python3 -I - "$T" <<'PY'
import sys, os
t = sys.argv[1]
host, user, pw = [s.strip() for s in open(os.path.join(t, '..', '..', '.env')).read().splitlines()[:3]]
esc = lambda v: v.replace('\\', '\\\\').replace('"', '\\"')
open(os.path.join(t, 'work', 'curlauth.cfg'), 'w').write(f'user = "{esc(user)}:{esc(pw)}"\n')
os.chmod(os.path.join(t, 'work', 'curlauth.cfg'), 0o600)
print('wrote work/curlauth.cfg for', host)
PY
