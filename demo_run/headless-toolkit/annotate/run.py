import json,subprocess,sys
import os
H=os.path.dirname(os.path.abspath(__file__))
T=os.path.join(H,'annotate.py')
O=os.path.join(H,'..','..','originals')+os.sep
def run(name,spec,out=None):
    json.dump(spec,open(os.path.join(H,'_s.json'),'w'))
    out=out or os.path.join(H,'out',name)
    r=subprocess.run(['python3',T,O+name,out,os.path.join(H,'_s.json')],capture_output=True,text=True)
    print(name,'|',r.stdout.strip().replace('\n',' | '),r.stderr[-300:])
