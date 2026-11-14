"""Read-only REST helper. usage: python3 api.py "table/sys_user?sysparm_limit=1"   |   python3 api.py count <table> "<encoded query>"
Credentials come from the repo .env (line 1 host, 2 user, 3 password) and are never printed."""
import base64, json, os, sys, urllib.parse, urllib.request
ENV = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '.env')
host, user, pw = [s.strip() for s in [l for l in open(ENV).read().splitlines() if not l.lower().startswith('alternative hostname')][:3]]
BASE = f'https://{host}.service-now.com/api/now/'
AUTH = 'Basic ' + base64.b64encode(f'{user}:{pw}'.encode()).decode()

def get(path, **params):
    q = ('?' + urllib.parse.urlencode(params)) if params else ''
    req = urllib.request.Request(BASE + path + q, headers={'Authorization': AUTH, 'Accept': 'application/json'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)['result']

def rows(table, query, fields, limit=50):
    return get('table/' + table, sysparm_query=query, sysparm_fields=fields, sysparm_limit=limit)

def count(table, query=''):
    return int(get('stats/' + table, sysparm_query=query, sysparm_count='true')['stats']['count'])

if __name__ == '__main__':
    if sys.argv[1] == 'count':
        print(count(sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else ''))
    else:
        print(json.dumps(get(sys.argv[1]), indent=1)[:6000])
