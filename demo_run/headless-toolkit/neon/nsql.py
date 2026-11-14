# Run SQL on the Neon project over HTTPS. Usage: python3 -I nsql.py "<sql>"  (key read from the repo .env; connection string never printed)
import json, re, sys, urllib.request
import os
ENV = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '.env')
P, BR, DB, ROLE = 'bitter-lab-28038915', 'br-summer-sunset-aubib0lm', 'neondb', 'neondb_owner'
k = re.sub(r'(?i)^bearer\s+', '', open(ENV).read().split('\n')[5].split(':', 1)[1].strip())
def api(url):
    req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + k, 'Accept': 'application/json'})
    with urllib.request.urlopen(req, timeout=30) as r: return json.load(r)
uri = api(f'https://console.neon.tech/api/v2/projects/{P}/connection_uri?branch_id={BR}&database_name={DB}&role_name={ROLE}')['uri']
host = re.search(r'@([^/:]+)', uri).group(1)
def sql(q, params=None):
    body = json.dumps({'query': q, 'params': params or []}).encode()
    req = urllib.request.Request(f'https://{host}/sql', data=body, headers={'Neon-Connection-String': uri, 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r: return json.load(r)
    except urllib.error.HTTPError as e: return {'error': e.code, 'body': e.read().decode()[:500]}
if __name__ == '__main__':
    res = sql(sys.argv[1])
    if 'rows' in res:
        cols = [f['name'] for f in res.get('fields', [])]
        print(' | '.join(cols))
        for r in res['rows'][:int(sys.argv[2]) if len(sys.argv) > 2 else 200]: print(' | '.join(str(r.get(c)) for c in cols))
        print(f"({res.get('rowCount')} rows, {res.get('command')})")
    else: print(res)
