# Log the daemon's browser in using .env credentials; secrets go straight into cmd.json and are never printed.
import json, os, sys, time
D = os.path.dirname(os.path.abspath(__file__))
host, user, pw = [s.strip() for s in open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '.env')).read().splitlines()[:3]]
def send(cmd):
    out = os.path.join(D, 'out.json')
    if os.path.exists(out): os.remove(out)
    json.dump(cmd, open(os.path.join(D, 'cmd.json'), 'w'))
    for _ in range(300):
        if os.path.exists(out):
            time.sleep(0.2)
            r = json.load(open(out)); return {k: r.get(k) for k in ('cmd', 'url', 'error')}
        time.sleep(1)
print(send({'op': 'goto', 'path': '/login.do', 'wait': 6000}))
print(send({'op': 'type', 'selector': '#user_name', 'value': user}))
print(send({'op': 'type', 'selector': '#user_password', 'value': pw}))
print(send({'op': 'click', 'selector': '#sysverb_login', 'wait': 15000}))
