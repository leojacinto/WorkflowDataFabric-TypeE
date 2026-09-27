/*
 * Runtime loader for the virtual-on scene script.
 *
 * scene.js is ~77 KB. The instance's static-asset host serves only image and
 * font files from public/, so virtual-on/scene.js 404s there. The AIUX lab app
 * ships the same file inlined in its home-page bundle, and that bundle's
 * sourcemap IS served with the original module text in `sourcesContent`.
 *
 * So the script is read from that sourcemap at runtime. Because this logic
 * lives in source it is rebuilt on every build and survives installs, unlike
 * patching the compiled bundle.
 *
 * The AIUX chunk filename carries a content hash that changes when that app is
 * redeployed, so it is discovered from the served page rather than hard-coded.
 *
 * Any failure degrades to the static frame; it never throws into the host page.
 */

const AIUX_HOME = '/aiux/wdf-lab/home'
const CHUNK_PATTERN = /pages\/wdf-lab\/home\/page-[A-Za-z0-9_-]+\.js/
const EMBED_SOURCE = 'virtual-on-embed'
const EXPORT_NAME = 'VIRTUAL_ON_JS'

let cached: Promise<string> | null = null

async function text(url: string): Promise<string> {
    const res = await fetch(url, { credentials: 'same-origin' })
    if (!res.ok) throw new Error(`${url} -> ${res.status}`)
    return res.text()
}

/** Find the current hashed filename of the AIUX home-page chunk. */
async function findChunkPath(): Promise<string> {
    const html = await text(AIUX_HOME)
    const match = html.match(CHUNK_PATTERN)
    if (!match) throw new Error('AIUX home chunk not referenced in page')
    return `/aiux/wdf-lab/${match[0]}`
}

/**
 * Pull the VIRTUAL_ON_JS string out of a module's source text.
 *
 * The value is a double-quoted JavaScript literal. JSON.parse handles it once
 * escaped single quotes — legal in JS, illegal in JSON — are unescaped.
 */
function extractExport(moduleSource: string): string {
    const marker = `export const ${EXPORT_NAME} = `
    const start = moduleSource.indexOf(marker)
    if (start < 0) throw new Error(`${EXPORT_NAME} not found in embed module`)

    const open = start + marker.length
    if (moduleSource[open] !== '"') throw new Error('unexpected literal form')

    let i = open + 1
    let escaped = false
    for (; i < moduleSource.length; i++) {
        const ch = moduleSource[i]
        if (escaped) escaped = false
        else if (ch === '\\') escaped = true
        else if (ch === '"') break
    }
    if (i >= moduleSource.length) throw new Error('unterminated literal')

    const literal = moduleSource.slice(open, i + 1)
    return JSON.parse(literal.replace(/\\'/g, "'")) as string
}

/** Resolve the scene script, or an empty string if it cannot be read. */
export function loadSceneScript(): Promise<string> {
    if (cached) return cached

    cached = (async () => {
        const chunkPath = await findChunkPath()
        const map = JSON.parse(await text(`${chunkPath}.map`)) as {
            sources?: string[]
            sourcesContent?: string[]
        }

        const sources = map.sources ?? []
        const contents = map.sourcesContent ?? []
        const index = sources.findIndex((s) => s.includes(EMBED_SOURCE))
        if (index < 0) throw new Error('embed module absent from sourcemap')

        return extractExport(contents[index] ?? '')
    })().catch((err: unknown) => {
        console.warn('[virtual-on] scene script unavailable:', err)
        return ''
    })

    return cached
}
