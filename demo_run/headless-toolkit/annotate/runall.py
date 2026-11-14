import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from run import run
from specs import S
names=sys.argv[1:] or list(S)
for n in names: run(n,S[n])
