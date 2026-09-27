/*
 * Markdown reader for the lab's GitBook sources.
 *
 * Handles only the constructs this author uses. Parses to an AST;
 * components/Markdown.tsx turns that into React elements, so no HTML string is
 * ever built or injected and there is nothing to sanitise.
 *
 * Transforms applied before parsing:
 *   1. strip YAML frontmatter
 *   2. rewrite ".gitbook/assets/..." to raw.githubusercontent.com
 *   3. replace each ```mermaid fence with the high-res PNG linked after it
 *   4. rewrite .md links to in-app routes (content/pages.ts)
 */

import { ASSET_BASE, resolveHref, ResolvedHref } from '../content/pages'

export type Inline =
    | { kind: 'text'; text: string }
    | { kind: 'strong'; children: Inline[] }
    | { kind: 'em'; children: Inline[] }
    | { kind: 'code'; text: string }
    | { kind: 'mark'; color?: string; children: Inline[] }
    | { kind: 'link'; target: ResolvedHref; children: Inline[] }
    | { kind: 'break' }

export type Block =
    | { kind: 'heading'; level: number; children: Inline[] }
    | { kind: 'para'; children: Inline[] }
    | { kind: 'figure'; src: string; alt: string; width?: string }
    | { kind: 'code'; lang: string; text: string }
    | { kind: 'quote'; blocks: Block[] }
    | { kind: 'list'; ordered: boolean; items: Block[][] }
    | { kind: 'table'; head: Inline[][]; rows: Inline[][][] }
    | { kind: 'rule' }

/* 1. frontmatter ---------------------------------------------------------- */

export function stripFrontmatter(md: string): string {
    return md.replace(/^\uFEFF?\s*---\r?\n[\s\S]*?\r?\n---[ \t]*\r?\n?/, '')
}

/* 2. assets --------------------------------------------------------------- */

export function rewriteAssetPaths(md: string): string {
    return md.replace(/(?:\.{1,2}\/)*\.gitbook\/assets\//g, `${ASSET_BASE}/`)
}

/* 3. mermaid -> author's PNG --------------------------------------------- */

const MERMAID_FENCE = /^[ \t]*```mermaid[ \t]*\r?\n[\s\S]*?^[ \t]*```[ \t]*$/gm

const HIRES_LINK =
    /^[ \t]*>?[ \t]*\[[^\]]*(?:Resolution|Diagram)[^\]]*\]\((https?:\/\/[^\s)]+?\.(?:png|jpe?g|gif|svg))\)[ \t]*$/gim

export function swapMermaidForImages(md: string): string {
    const links: { url: string; start: number; end: number; used: boolean }[] = []
    let lm: RegExpExecArray | null
    HIRES_LINK.lastIndex = 0
    while ((lm = HIRES_LINK.exec(md))) {
        links.push({ url: lm[1], start: lm.index, end: lm.index + lm[0].length, used: false })
    }

    const edits: { start: number; end: number; text: string }[] = []
    let fm: RegExpExecArray | null
    MERMAID_FENCE.lastIndex = 0
    while ((fm = MERMAID_FENCE.exec(md))) {
        const fenceEnd = fm.index + fm[0].length
        const link = links.find(l => !l.used && l.start >= fenceEnd)
        if (!link) continue // no PNG: leave the fence as a code block
        link.used = true
        edits.push({
            start: fm.index,
            end: fenceEnd,
            text: `<figure><img src="${link.url}" alt="Diagram"><figcaption></figcaption></figure>`,
        })
        edits.push({ start: link.start, end: link.end, text: '' })
    }

    edits.sort((a, b) => b.start - a.start)
    let out = md
    for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end)
    return out
}

/* entities --------------------------------------------------------------- */

const NAMED: Record<string, string> = {
    nbsp: '\u00a0',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    rsquo: '\u2019',
    lsquo: '\u2018',
    rdquo: '\u201d',
    ldquo: '\u201c',
    mdash: '\u2014',
    ndash: '\u2013',
    hellip: '\u2026',
    darr: '\u2193',
    uarr: '\u2191',
    rarr: '\u2192',
    larr: '\u2190',
    amp: '&',
}

export function decodeEntities(s: string): string {
    return s
        .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => safeCodePoint(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec: string) => safeCodePoint(parseInt(dec, 10)))
        .replace(/&([a-z]+);/gi, (whole, name: string) => {
            const hit = NAMED[name.toLowerCase()]
            return hit === undefined ? whole : hit
        })
}

function safeCodePoint(n: number): string {
    if (!Number.isFinite(n) || n < 0 || n > 0x10ffff) return ''
    try {
        return String.fromCodePoint(n)
    } catch {
        return ''
    }
}

/* inline ----------------------------------------------------------------- */

const MARK_OPEN = /^<mark\b[^>]*>/i
const MARK_COLOR = /color\s*:\s*\$?([a-z0-9#_-]+)/i

export function parseInline(src: string): Inline[] {
    const out: Inline[] = []
    let text = ''

    const flush = () => {
        if (text) {
            out.push({ kind: 'text', text: decodeEntities(text) })
            text = ''
        }
    }

    let i = 0
    while (i < src.length) {
        const rest = src.slice(i)
        const ch = src[i]

        if (ch === '\\' && i + 1 < src.length) {
            text += src[i + 1]
            i += 2
            continue
        }

        const br = /^<br\s*\/?>/i.exec(rest)
        if (br) {
            flush()
            out.push({ kind: 'break' })
            i += br[0].length
            continue
        }

        const mo = MARK_OPEN.exec(rest)
        if (mo) {
            const close = rest.toLowerCase().indexOf('</mark>', mo[0].length)
            if (close > -1) {
                flush()
                const colour = MARK_COLOR.exec(mo[0])
                out.push({
                    kind: 'mark',
                    color: colour ? colour[1].toLowerCase() : undefined,
                    children: parseInline(rest.slice(mo[0].length, close)),
                })
                i += close + '</mark>'.length
                continue
            }
        }

        // inline HTML the author uses inside table cells
        const anchor = /^<a\s+[^>]*href\s*=\s*"([^"]*)"[^>]*>/i.exec(rest)
        if (anchor) {
            const close = rest.toLowerCase().indexOf('</a>', anchor[0].length)
            if (close > -1) {
                flush()
                out.push({
                    kind: 'link',
                    target: resolveHref(decodeEntities(anchor[1]).replace(/\\(.)/g, '$1')),
                    children: parseInline(rest.slice(anchor[0].length, close)),
                })
                i += close + '</a>'.length
                continue
            }
        }

        const html = /^<(strong|b|em|i|code)\b[^>]*>/i.exec(rest)
        if (html) {
            const tag = html[1].toLowerCase()
            const close = rest.toLowerCase().indexOf(`</${tag}>`, html[0].length)
            if (close > -1) {
                flush()
                const inner = rest.slice(html[0].length, close)
                if (tag === 'code') {
                    out.push({ kind: 'code', text: decodeEntities(inner) })
                } else if (tag === 'strong' || tag === 'b') {
                    out.push({ kind: 'strong', children: parseInline(inner) })
                } else {
                    out.push({ kind: 'em', children: parseInline(inner) })
                }
                i += close + `</${tag}>`.length
                continue
            }
        }

        if (ch === '`') {
            const end = src.indexOf('`', i + 1)
            if (end > -1) {
                flush()
                out.push({ kind: 'code', text: src.slice(i + 1, end) })
                i = end + 1
                continue
            }
        }

        if (ch === '[') {
            const link = matchLink(src, i)
            if (link) {
                flush()
                out.push({
                    kind: 'link',
                    target: resolveHref(link.href.replace(/\\(.)/g, '$1')),
                    children: parseInline(link.label),
                })
                i = link.next
                continue
            }
        }

        if (rest.startsWith('**')) {
            const end = findDelim(src, i + 2, '**')
            if (end > -1) {
                flush()
                out.push({ kind: 'strong', children: parseInline(src.slice(i + 2, end)) })
                i = end + 2
                continue
            }
        }

        if (ch === '*') {
            const end = findDelim(src, i + 1, '*')
            if (end > i + 1) {
                flush()
                out.push({ kind: 'em', children: parseInline(src.slice(i + 1, end)) })
                i = end + 1
                continue
            }
        }

        text += ch
        i++
    }

    flush()
    return out
}

function matchLink(
    src: string,
    start: number
): { label: string; href: string; next: number } | null {
    let depth = 0
    let i = start
    for (; i < src.length; i++) {
        const c = src[i]
        if (c === '\\') {
            i++
            continue
        }
        if (c === '[') depth++
        else if (c === ']') {
            depth--
            if (depth === 0) break
        }
    }
    if (depth !== 0 || src[i] !== ']' || src[i + 1] !== '(') return null

    const label = src.slice(start + 1, i)
    let j = i + 2
    let paren = 1
    for (; j < src.length; j++) {
        const c = src[j]
        if (c === '\\') {
            j++
            continue
        }
        if (c === '(') paren++
        else if (c === ')') {
            paren--
            if (paren === 0) break
        }
    }
    if (paren !== 0) return null

    return { label, href: src.slice(i + 2, j), next: j + 1 }
}

function findDelim(src: string, from: number, delim: string): number {
    for (let i = from; i < src.length; i++) {
        if (src[i] === '\\') {
            i++
            continue
        }
        if (src.startsWith(delim, i)) return i
    }
    return -1
}

/* blocks ----------------------------------------------------------------- */

const FIGURE_BLOCK = /<figure>([\s\S]*?)<\/figure>/i
const IMG_TAG = /<img\s+([^>]*?)\/?>/i
const BARE_IMG = /^<img\s+([^>]*?)\/?>$/i
const ATTR = /(\w[\w-]*)\s*=\s*"([^"]*)"/g

function imgAttrs(raw: string): { src: string; alt: string; width?: string } {
    const attrs: Record<string, string> = {}
    let m: RegExpExecArray | null
    ATTR.lastIndex = 0
    while ((m = ATTR.exec(raw))) attrs[m[1].toLowerCase()] = m[2]
    return { src: attrs.src || '', alt: decodeEntities(attrs.alt || ''), width: attrs.width }
}

const ORDERED = /^([ \t]*)(\d+)[.)][ \t]+(.*)$/
const BULLET = /^([ \t]*)[*+-][ \t]+(.*)$/
const HEADING = /^(#{1,6})[ \t]+(.*)$/
const FENCE = /^[ \t]*```[ \t]*([\w-]*)[ \t]*$/
const RULE = /^[ \t]*(?:\*\s*\*\s*\*[\s*]*|-{3,}|_{3,})[ \t]*$/
const QUOTE = /^[ \t]*>[ \t]?(.*)$/
const TABLE_ROW = /^[ \t]*\|(.*)\|[ \t]*$/
const TABLE_SEP = /^[ \t]*\|[\s:|-]+\|[ \t]*$/

export function parseBlocks(md: string): Block[] {
    return parseLines(md.replace(/\r\n?/g, '\n').split('\n'))
}

function parseLines(lines: string[]): Block[] {
    const blocks: Block[] = []
    let i = 0

    while (i < lines.length) {
        const line = lines[i]

        if (!line.trim()) {
            i++
            continue
        }

        const fence = FENCE.exec(line)
        if (fence) {
            const lang = fence[1]
            const body: string[] = []
            i++
            while (i < lines.length && !FENCE.test(lines[i])) body.push(lines[i++])
            if (i < lines.length) i++
            blocks.push({ kind: 'code', lang, text: body.join('\n') })
            continue
        }

        if (RULE.test(line)) {
            blocks.push({ kind: 'rule' })
            i++
            continue
        }

        const heading = HEADING.exec(line)
        if (heading) {
            blocks.push({
                kind: 'heading',
                level: heading[1].length,
                children: parseInline(heading[2].trim()),
            })
            i++
            continue
        }

        const fig = takeFigure(lines, i)
        if (fig) {
            blocks.push(fig.block)
            i = fig.next
            continue
        }

        // raw HTML <table>, which GitBook uses instead of pipe tables
        if (/^[ \t]*<table[\s>]/i.test(line)) {
            let buffer = ''
            let j = i
            let closed = false
            for (; j < lines.length; j++) {
                buffer += (j > i ? '\n' : '') + lines[j]
                if (/<\/table>/i.test(lines[j])) {
                    closed = true
                    break
                }
            }
            if (closed) {
                const table = parseHtmlTable(buffer)
                if (table) {
                    blocks.push(table)
                    i = j + 1
                    continue
                }
            }
        }

        if (QUOTE.test(line)) {
            const inner: string[] = []
            while (i < lines.length) {
                const q = QUOTE.exec(lines[i])
                if (q) {
                    inner.push(q[1])
                    i++
                } else if (!lines[i].trim()) {
                    break
                } else {
                    inner.push(lines[i++])
                }
            }
            blocks.push({ kind: 'quote', blocks: parseLines(inner) })
            continue
        }

        if (TABLE_ROW.test(line) && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1])) {
            const head = splitRow(line)
            i += 2
            const rows: Inline[][][] = []
            while (i < lines.length && TABLE_ROW.test(lines[i])) rows.push(splitRow(lines[i++]))
            blocks.push({ kind: 'table', head, rows })
            continue
        }

        if (ORDERED.test(line) || BULLET.test(line)) {
            const ordered = ORDERED.test(line)
            const items: Block[][] = []

            while (i < lines.length) {
                const m = ordered ? ORDERED.exec(lines[i]) : BULLET.exec(lines[i])
                if (!m) {
                    if (!lines[i].trim()) {
                        const ahead = lines[i + 1]
                        const stillList =
                            ahead !== undefined &&
                            (ordered ? ORDERED.test(ahead) : BULLET.test(ahead))
                        if (stillList) {
                            i++
                            continue
                        }
                    }
                    break
                }

                const chunk: string[] = [ordered ? m[3] : m[2]]
                i++

                // continuation: indented lines, or the figure GitBook emits
                // un-indented straight after a numbered step
                while (i < lines.length) {
                    const next = lines[i]
                    if (!next.trim()) {
                        const after = lines[i + 1]
                        if (after && /^[ \t]{2,}\S/.test(after)) {
                            chunk.push('')
                            i++
                            continue
                        }
                        break
                    }
                    if (ordered ? ORDERED.test(next) : BULLET.test(next)) break
                    if (/^[ \t]{2,}\S/.test(next)) {
                        chunk.push(next.replace(/^[ \t]{1,4}/, ''))
                        i++
                        continue
                    }
                    if (/^[ \t]*<figure>/i.test(next)) {
                        chunk.push(next)
                        i++
                        continue
                    }
                    break
                }

                items.push(parseLines(chunk))
            }

            blocks.push({ kind: 'list', ordered, items })
            continue
        }

        const para: string[] = [line]
        i++
        while (i < lines.length) {
            const next = lines[i]
            if (
                !next.trim() ||
                HEADING.test(next) ||
                FENCE.test(next) ||
                RULE.test(next) ||
                QUOTE.test(next) ||
                ORDERED.test(next) ||
                BULLET.test(next) ||
                TABLE_ROW.test(next) ||
                /^[ \t]*<figure>/i.test(next)
            )
                break
            para.push(next)
            i++
        }
        blocks.push({ kind: 'para', children: parseInline(para.join('\n').trim()) })
    }

    return blocks
}

function takeFigure(lines: string[], start: number): { block: Block; next: number } | null {
    const line = lines[start].trim()

    const bare = BARE_IMG.exec(line)
    if (bare) return { block: { kind: 'figure', ...imgAttrs(bare[1]) }, next: start + 1 }

    if (!/^<figure>/i.test(line)) return null

    let buffer = ''
    for (let i = start; i < lines.length && i < start + 8; i++) {
        buffer += (i > start ? '\n' : '') + lines[i]
        const fig = FIGURE_BLOCK.exec(buffer)
        if (!fig) continue

        // The inner markup may be a bare <img> or a <picture> with <source>
        // variants; the <img> is the fallback and the one to render.
        const img = IMG_TAG.exec(fig[1])
        if (!img) return null
        return { block: { kind: 'figure', ...imgAttrs(img[1]) }, next: i + 1 }
    }
    return null
}

function parseHtmlTable(html: string): Block | null {
    const rows: { header: boolean; cells: Inline[][] }[] = []

    const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
    let rm: RegExpExecArray | null
    while ((rm = rowRe.exec(html))) {
        const cells: Inline[][] = []
        let header = false

        const cellRe = /<(th|td)[^>]*>([\s\S]*?)<\/\1>/gi
        let cm: RegExpExecArray | null
        while ((cm = cellRe.exec(rm[1]))) {
            if (cm[1].toLowerCase() === 'th') header = true
            cells.push(parseInline(cm[2].trim()))
        }

        if (cells.length) rows.push({ header, cells })
    }

    if (!rows.length) return null

    const head = rows[0].header ? rows[0].cells : []
    const body = rows.slice(rows[0].header ? 1 : 0).map(r => r.cells)
    return { kind: 'table', head, rows: body }
}

function splitRow(line: string): Inline[][] {
    const inner = TABLE_ROW.exec(line)
    if (!inner) return []
    const cells: string[] = []
    let cur = ''
    const src = inner[1]
    for (let i = 0; i < src.length; i++) {
        const c = src[i]
        if (c === '\\') {
            cur += c + (src[i + 1] ?? '')
            i++
            continue
        }
        if (c === '|') {
            cells.push(cur)
            cur = ''
            continue
        }
        cur += c
    }
    cells.push(cur)
    return cells.map(c => parseInline(c.trim()))
}

/* entry point ------------------------------------------------------------ */

export interface LabDoc {
    /** First H1, lifted out so the page header can own it. */
    title?: string
    blocks: Block[]
}

export function readMarkdown(raw: string): LabDoc {
    let md = stripFrontmatter(raw)
    md = rewriteAssetPaths(md)
    md = swapMermaidForImages(md)

    const blocks = parseBlocks(md)

    let title: string | undefined
    const first = blocks.findIndex(b => b.kind === 'heading')
    if (first > -1) {
        const h = blocks[first] as Extract<Block, { kind: 'heading' }>
        if (h.level === 1) {
            title = plainText(h.children)
            blocks.splice(first, 1)
        }
    }

    // Several files repeat the H1 text as a later section heading; drop it so
    // the page header is not shown twice.
    if (title) {
        const dupe = blocks.findIndex(
            b => b.kind === 'heading' && plainText(b.children).trim() === title!.trim()
        )
        if (dupe > -1) blocks.splice(dupe, 1)
    }

    return { title, blocks }
}

export function plainText(nodes: Inline[]): string {
    return nodes
        .map(n => {
            switch (n.kind) {
                case 'text':
                case 'code':
                    return n.text
                case 'break':
                    return ' '
                default:
                    return plainText(n.children)
            }
        })
        .join('')
}
