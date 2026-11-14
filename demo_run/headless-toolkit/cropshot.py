# Crop a daemon screenshot: cropshot.py <shot name> <out path> x0 y0 x1 y1 (original 2x pixels)
import os, sys
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
box = tuple(int(v) for v in sys.argv[3:7])
im = Image.open(fos.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'screenshots', f'{src}.png'))
c = im.crop(box); c.save(out); print(im.size, '->', c.size, out)
