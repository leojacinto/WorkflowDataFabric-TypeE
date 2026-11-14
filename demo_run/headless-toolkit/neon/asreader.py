# Runs SQL as wdf_lab_reader (password read from the repo .env, never printed). Usage: python3 -I asreader.py "<sql>"
import json, re, sys, urllib.request
import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import nsql
pw = re.search(r'^Neon wdf_lab_reader password: (\S+)$', open(nsql.ENV).read(), re.M).group(1)
uri = re.sub(r'//[^@]+@', f'//wdf_lab_reader:{pw}@', nsql.uri)
body = json.dumps({'query': sys.argv[1], 'params': []}).encode()
req = urllib.request.Request(f'https://{nsql.host}/sql', data=body, headers={'Neon-Connection-String': uri, 'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req, timeout=60) as r: res = json.load(r)
    cols = [f['name'] for f in res.get('fields', [])]
    print(' | '.join(cols)); [print(' | '.join(str(x.get(c)) for c in cols)) for x in res['rows']]
except urllib.error.HTTPError as e: print('ERROR', e.code, e.read().decode().replace(pw, '***')[:300])
