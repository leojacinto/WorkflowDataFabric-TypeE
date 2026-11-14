import sys
from PIL import Image
files=sys.argv[2:]; out=sys.argv[1]
ims=[Image.open(f).convert('RGB') for f in files]
W=1000
ims=[i.resize((W,round(i.height*W/i.width)),Image.LANCZOS) for i in ims]
H=sum(i.height for i in ims)+10*(len(ims)-1)
M=Image.new('RGB',(W,H),(255,0,255)); y=0
for i in ims: M.paste(i,(0,y)); y+=i.height+10
M.save(out); print(M.size)
