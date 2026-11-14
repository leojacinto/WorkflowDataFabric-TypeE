"""Pulls every Build Agent prompt out of the guide pages into e2e/prompts/<id>.txt, exactly as a participant would paste it.
usage: python3 e2e/extract_prompts.py      (rerun after any prompt change in lab-guide/)"""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__))
GUIDE = os.path.join(HERE, '..', '..', '..', 'lab-guide')
# (id, page file, first words of the prompt) - the id order is the order a participant meets them
WANT = [
 ('ihub1',      'main-exercises/lab-exercise-integration-hub.md', 'In the Forecast Variance app:\n1. Create a connection'),
 ('ihub2',      'main-exercises/lab-exercise-integration-hub.md', 'In the Forecast Variance app:\n1. Create a subflow named "Extract Cost Center"'),
 ('ihub3',      'main-exercises/lab-exercise-integration-hub.md', 'In the Forecast Variance app, create an AI agent'),
 ('ihub4_test', 'main-exercises/lab-exercise-integration-hub.md', 'Run the Forecast Variance subflow'),
 ('zcc_erp',    'main-exercises/lab-exercise-zero-copy-connectors.md', 'Clone the ERP model'),
 ('zcc_pgtool', 'main-exercises/lab-exercise-zero-copy-connectors.md', 'In the Forecast Variance app, add a tool'),
 ('ldi_props',  'extended-exercises/lab-exercise-servicenow-lens-and-document-intelligence.md', 'In global scope, set these three'),
 ('ldi_runtime','extended-exercises/lab-exercise-servicenow-lens-and-document-intelligence.md', 'In the Forecast Variance app, create a record'),
 ('ldi_owner',  'extended-exercises/lab-exercise-servicenow-lens-and-document-intelligence.md', 'In the Forecast Variance app, add a business rule'),
 ('fund_table', 'main-exercises/lab-exercise-fundamentals.md', 'In the Forecast Variance app, create a table'),
]
def blocks(path):
    lines = open(path).read().split('\n'); out = []; cur = None
    for l in lines:
        if re.match(r'^\s*```', l):
            if cur is None: cur = []
            else: out.append(cur); cur = None
        elif cur is not None: cur.append(l)
    res = []
    for b in out:   # drop the list indent the guide uses (4 spaces)
        ind = min((len(x) - len(x.lstrip()) for x in b if x.strip()), default=0)
        res.append('\n'.join(x[ind:] for x in b))
    return res
os.makedirs(os.path.join(HERE, 'prompts'), exist_ok=True)
for pid, page, start in WANT:
    found = [b for b in blocks(os.path.join(GUIDE, page)) if b.startswith(start)]
    assert len(found) == 1, (pid, len(found))
    open(os.path.join(HERE, 'prompts', pid + '.txt'), 'w').write(found[0].strip() + '\n')
    print('wrote', pid, len(found[0]), 'chars')
