"""Annotate a screenshot with green teardrop labels, text boxes and arrows (house style).

usage: annotate.py in.png out.png spec.json
spec: {"tears":[{"label":"a","x":..,"y":..,"dir":"auto"|0|90|180|-90}],
       "callouts":[{"text":"..","x":..,"y":..,"to":[x,y]}],        # text box, arrow leaves the box
       "arrows":[{"from":[x,y],"to":[x,y]}]}
Tear (x,y) is where the tip points. dir = direction the tip points (0=right, 90=down, 180=left, -90=up).
Only horizontal/vertical tears; 'auto' picks the direction that covers the least screenshot content.
Tear and arrow come from assets/step.gif and arrow.gif (transparent GIFs); the text box is drawn to match box.gif.
"""
import json, math, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage

import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'assets') + os.sep
FONT = '/System/Library/Fonts/Supplemental/Arial.ttf'
GREEN = (96, 196, 71, 255)
SS = 4          # supersample so edges come out smooth
TEAR_FONT = 0.82   # letter size / tear height
BOX_FONT = 2.15    # text size / median screenshot glyph height
BOX_RADIUS = 0.17   # corner radius / height, measured from box.gif


def load(name):
    im = Image.open(A + name).convert('RGBA')
    return im.crop(im.getbbox())


def glyph_height(base):
    g = np.array(base.convert('L'), dtype=float)
    ink = np.abs(g - np.median(g)) > 60
    lab, _ = ndimage.label(ink)
    hs = [sl[0].stop - sl[0].start for sl in ndimage.find_objects(lab)]
    hs = [h for h in hs if 6 <= h <= 60]
    return float(np.median(hs)) if hs else 14.0


def tear_parts():
    t = load('step.gif')
    m = np.array(t)[..., 3] > 0
    d = ndimage.distance_transform_edt(m)
    cy, cx = np.unravel_index(np.argmax(d), d.shape)   # centre of the round body
    return t, (cx, cy), d.max()


def tear_height(base):
    # reference tears are ~3x the UI text height and ~3.4% of the image width, whichever is larger (stays legible when the image is shown small)
    return max(3.0 * glyph_height(base), 0.034 * base.width)


def tear_width(base):
    t, _, _ = tear_parts()
    return tear_height(base) * t.width / t.height


def line_thickness(base):
    return max(2.5, 0.10 * tear_height(base))


def make_tear(width_px, angle_deg):
    t, (cx, cy), r = tear_parts()
    s = width_px * SS / t.width
    big = t.resize((round(t.width * s), round(t.height * s)), Image.LANCZOS)
    cx, cy = cx * s, cy * s
    tip = (big.width - 1, cy)
    pad = int(big.width)
    canvas = Image.new('RGBA', (big.width + 2 * pad, big.height + 2 * pad), (0, 0, 0, 0))
    canvas.paste(big, (pad, pad))
    ox, oy = pad + tip[0], pad + tip[1]
    rot = canvas.rotate(-angle_deg, resample=Image.BICUBIC, center=(ox, oy))
    a = math.radians(angle_deg)
    dx, dy = pad + cx - ox, pad + cy - oy
    return rot, (ox, oy), (ox + dx * math.cos(a) - dy * math.sin(a), oy + dx * math.sin(a) + dy * math.cos(a)), r * s


def tear_layer(base, label, tx, ty, angle):
    rot, (ox, oy), (bx, by), r = make_tear(tear_width(base), angle)
    px, py = tx * SS - ox, ty * SS - oy          # tip lands on the target
    layer = Image.new('RGBA', (base.width * SS, base.height * SS), (0, 0, 0, 0))
    layer.alpha_composite(rot, (round(px), round(py)))
    f = ImageFont.truetype(FONT, round(r * 2 * TEAR_FONT))
    ImageDraw.Draw(layer).text((px + bx, py + by), label, font=f, fill=(0, 0, 0, 255), anchor='mm')
    return layer


def footprint_score(base, layer_alpha, occupied):
    """content the tear would cover (distance from page background), plus overlap and edge penalties."""
    g = np.array(base.convert('L'), dtype=float)
    bg = np.median(g)
    small = np.array(Image.fromarray(layer_alpha).resize(base.size, Image.BILINEAR)) > 40
    n = small.sum()
    if n < 0.9 * tear_area(base):          # clipped by the image edge
        return 1e9
    ink = (np.abs(g - bg) * small).sum() / max(n, 1)
    return ink + 400.0 * (small & occupied).sum() / max(n, 1)


_area = {}
def tear_area(base):
    k = base.size
    if k not in _area:
        t, _, _ = tear_parts()
        s = tear_width(base) / t.width
        _area[k] = (np.array(t)[..., 3] > 0).sum() * s * s
    return _area[k]


def make_callout(base, text, x, y):
    gh, th = glyph_height(base), line_thickness(base)
    f = ImageFont.truetype(FONT, round(max(gh * BOX_FONT, 0.0185 * base.width) * SS))
    tmp = ImageDraw.Draw(Image.new('RGBA', (10, 10)))
    l, t, r, b = tmp.textbbox((0, 0), text, font=f, anchor='lt')
    em = max(gh * BOX_FONT, 0.0185 * base.width) / 1.55
    padx, pady = em * 1.0 * SS, em * 0.7 * SS
    w, h = (r - l) + 2 * padx, (b - t) + 2 * pady
    layer = Image.new('RGBA', (base.width * SS, base.height * SS), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    margin = 0.8 * gh * SS
    X = min(max(x * SS, margin), base.width * SS - w - margin)   # keep the box inside the screenshot
    Y = min(max(y * SS, margin), base.height * SS - h - margin)
    d.rounded_rectangle((X, Y, X + w - 1, Y + h - 1), radius=h * BOX_RADIUS, fill=GREEN)
    d.text((X + padx - l, Y + pady - t), text, font=f, fill=(0, 0, 0, 255), anchor='lt')
    return layer, (X / SS, Y / SS, w / SS, h / SS)


def make_arrow_img(p0, p1, thick_px):
    """head from the asset at p1; stem extended by repeating the asset's own stem slice (never stretched)."""
    a = load('arrow.gif')
    s = thick_px * SS / 20.0            # asset stem is 20px thick
    head_end = 70
    L = math.hypot(p1[0] - p0[0], p1[1] - p0[1]) * SS
    rs = lambda im: im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
    head = rs(a.crop((0, 0, head_end, a.height)))
    cap = rs(a.crop((a.width - 12, 0, a.width, a.height)))
    col = a.crop((head_end + 10, 0, head_end + 12, a.height)).resize((1, max(1, round(a.height * s))), Image.LANCZOS)
    body = max(0, round(L - head.width - cap.width))
    out = Image.new('RGBA', (head.width + body + cap.width, head.height), (0, 0, 0, 0))
    out.alpha_composite(head, (0, 0))
    for i in range(body):
        out.alpha_composite(col, (head.width + i, 0))
    out.alpha_composite(cap, (head.width + body, 0))
    return out


def arrow_layer(base, p0, p1):
    im = make_arrow_img(p0, p1, line_thickness(base))
    ang = math.degrees(math.atan2(p1[1] - p0[1], p1[0] - p0[0]))
    pad = max(im.size)
    c = Image.new('RGBA', (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
    c.alpha_composite(im, (pad, pad))
    cx, cy = pad, pad + im.height / 2
    r = c.rotate(-(ang + 180), resample=Image.BICUBIC, center=(cx, cy))
    layer = Image.new('RGBA', (base.width * SS, base.height * SS), (0, 0, 0, 0))
    layer.alpha_composite(r, (round(p1[0] * SS - cx), round(p1[1] * SS - cy)))
    return layer


def main():
    src, dst, specf = sys.argv[1:4]
    spec = json.load(open(specf))
    global TEAR_FONT, BOX_FONT
    cs = spec.get('coord_scale', 1.0)
    TEAR_FONT = spec.get('tear_font', TEAR_FONT)
    BOX_FONT = spec.get('box_font', BOX_FONT)
    base = Image.open(src).convert('RGBA')
    pad = spec.get('pad', {})
    shx, shy = 0, 0
    if pad:
        l_, t_, r_, b_ = (pad.get(k, 0) for k in ('left', 'top', 'right', 'bottom'))
        arr = np.array(base.convert('RGBA'))
        H, W = arr.shape[:2]
        out = np.zeros((H + t_ + b_, W + l_ + r_, 4), dtype=np.uint8)
        out[t_:t_ + H, l_:l_ + W] = arr
        def mode_rows(strip):   # most common colour per row (text is the minority, so this is the background)
            res = []
            for row in strip:
                px = row.reshape(-1, 4)
                lum = px[:, :3].astype(float).mean(axis=1)
                light = px[lum >= 225]
                use = light if len(light) > 3 else px     # light backgrounds: ignore dark text pixels
                cols, cnt = np.unique(use, axis=0, return_counts=True)
                res.append(cols[np.argmax(cnt)])
            return np.array(res)
        if l_:
            out[t_:t_ + H, :l_] = mode_rows(arr[:, :200])[:, None, :]
        if r_:
            out[t_:t_ + H, l_ + W:] = mode_rows(arr[:, -200:])[:, None, :]
        if t_:
            out[:t_, l_:l_ + W] = mode_rows(arr[:60].transpose(1, 0, 2))[None, :, :]
        if b_:
            out[t_ + H:, l_:l_ + W] = mode_rows(arr[-60:].transpose(1, 0, 2))[None, :, :]
        nb = Image.fromarray(out)
        base, shx, shy = nb, l_, t_
    layers = []
    occupied = np.zeros((base.height, base.width), bool)

    def mark(layer):
        a = np.array(layer)[..., 3]
        m = np.array(Image.fromarray(a).resize(base.size, Image.BILINEAR)) > 40
        occupied[:] |= ndimage.binary_dilation(m, iterations=max(3, round(0.4 * glyph_height(base))))

    # boxes first, so tears keep away from them
    arrows = list(spec.get('arrows', []))
    for c in spec.get('callouts', []):
        c = dict(c, x=c['x'] * cs + shx, y=c['y'] * cs + shy, to=[c['to'][0] * cs + shx, c['to'][1] * cs + shy])
        layer, (X, Y, w, h) = make_callout(base, c['text'], c['x'], c['y'])
        layers.append(layer); mark(layer)
        tx, ty = c['to']
        rad = h * BOX_RADIUS
        # leave from the side facing the target (dominant axis), straight toward it, clear of the rounded corners
        if abs(ty - (Y + h / 2)) * w >= abs(tx - (X + w / 2)) * h:
            sx = min(max(tx, X + rad), X + w - rad)
            sy = Y + h if ty > Y + h / 2 else Y
            k = 'b' if ty > Y + h / 2 else 't'
        else:
            sy = min(max(ty, Y + rad), Y + h - rad)
            sx = X + w if tx > X + w / 2 else X
            k = 'r' if tx > X + w / 2 else 'l'
        arrows.append({'from': [sx, sy], 'to': c['to'], '_edge': k})
    for t in spec.get('tears', []):
        tgts = [[p[0] * cs + shx, p[1] * cs + shy] for p in (t['targets'] if 'targets' in t else [[t['x'], t['y']]])]
        dirs = [t['dir']] if t.get('dir', 'auto') != 'auto' else [0, 180, 90, -90]
        opts = []
        for (tx, ty) in tgts:
            for cand in dirs:
                lay = tear_layer(base, t['label'], tx, ty, cand)
                alpha = np.array(lay)[..., 3]
                opts.append((footprint_score(base, alpha, occupied), cand, (tx, ty), lay))
        sc, ang, tg, layer = min(opts, key=lambda o: o[0])
        print(t['label'], 'dir', ang, 'target', [round(v) for v in tg], 'score', round(sc, 1))
        layers.append(layer); mark(layer)
    for b in spec.get('boxes', []):   # empty box (Leo's empty box.gif look): one thing emphasised, no letter
        x0, y0, x1, y1 = [v * cs for v in b['rect']]
        lay = Image.new('RGBA', (base.width * SS, base.height * SS), (0, 0, 0, 0))
        th = max(3, round(0.0035 * base.width)) * SS
        ImageDraw.Draw(lay).rounded_rectangle(((x0 + shx) * SS, (y0 + shy) * SS, (x1 + shx) * SS, (y1 + shy) * SS), radius=round(0.17 * min(x1 - x0, y1 - y0) * SS), outline=GREEN, width=th)
        layers.append(lay)
    for ar in arrows:
        layers.append(arrow_layer(base, ar['from'], ar['to']))
    big = base.resize((base.width * SS, base.height * SS), Image.LANCZOS)
    for l in layers:
        big.alpha_composite(l)
    big.resize(base.size, Image.LANCZOS).convert('RGB').save(dst)
    print('saved', dst, base.size)


main()
