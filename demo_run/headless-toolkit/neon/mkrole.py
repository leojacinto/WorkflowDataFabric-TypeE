# Creates the read-only Neon role wdf_lab_reader (SELECT on public.lab_cc_summary only).
# The password is generated here, appended to the repo .env, and never printed.
import re, secrets, string, sys
import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import nsql
ENV, LABEL = nsql.ENV, 'Neon wdf_lab_reader password'
if LABEL in open(ENV).read(): sys.exit('password already in .env; stopping')
if nsql.sql("SELECT 1 FROM pg_roles WHERE rolname = 'wdf_lab_reader'").get('rows'): sys.exit('role already exists; stopping')
abc = string.ascii_letters + string.digits
while True:
    pw = ''.join(secrets.choice(abc) for _ in range(32))
    if re.search('[a-z]', pw) and re.search('[A-Z]', pw) and re.search('[0-9]', pw): break
with open(ENV, 'a') as f: f.write(f'{LABEL}: {pw}\n')
def run(q):
    r = nsql.sql(q)
    print(q.replace(pw, '***')[:90], '->', r.get('command') or str(r).replace(pw, '***')[:400])
run(f"CREATE ROLE wdf_lab_reader WITH LOGIN PASSWORD '{pw}'")
run("GRANT CONNECT ON DATABASE neondb TO wdf_lab_reader")
run("GRANT USAGE ON SCHEMA public TO wdf_lab_reader")
run("GRANT SELECT ON public.lab_cc_summary TO wdf_lab_reader")
