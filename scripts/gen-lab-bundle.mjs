/*
 * Regenerates src/client/content/lab-markdown.ts and asset-map.ts.
 * Run after `pnpm build` (asset ids are read from dist-metadata), then build again:
 *   pnpm build && node scripts/gen-lab-bundle.mjs && pnpm build
 * Markdown: pages whose source lives in this repo (lab-guide/) are re-read from disk;
 * every other page keeps its bundled text.
 */
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const mdFile = path.join(root, 'src/client/content/lab-markdown.ts')
const mapFile = path.join(root, 'src/client/content/asset-map.ts')
const metaDir = path.join(root, 'dist-metadata/app/update')

const LOCAL = {
    '/exercises/fundamentals': 'lab-guide/main-exercises/lab-exercise-fundamentals.md',
    '/exercises/integration-hub': 'lab-guide/main-exercises/lab-exercise-integration-hub.md',
    '/exercises/zero-copy-connectors': 'lab-guide/main-exercises/lab-exercise-zero-copy-connectors.md',
    '/exercises/lens-and-document-intelligence': 'lab-guide/extended-exercises/lab-exercise-servicenow-lens-and-document-intelligence.md',
    '/exercises/mcp-server-client': 'lab-guide/extended-exercises/lab-exercise-model-context-protocol-server-client.md',
}

// --- markdown
let md = fs.readFileSync(mdFile, 'utf8')
for (const [route, file] of Object.entries(LOCAL)) {
    const text = fs.readFileSync(path.join(root, file), 'utf8')
    const re = new RegExp(`^    ${JSON.stringify(route)}: "(?:[^"\\\\]|\\\\.)*",?$`, 'm')
    if (!re.test(md)) throw new Error(`route not found in lab-markdown.ts: ${route}`)
    md = md.replace(re, () => `    ${JSON.stringify(route)}: ${JSON.stringify(text)},`)
}
fs.writeFileSync(mdFile, md)

// --- asset map
const entries = {}
for (const f of fs.readdirSync(metaDir).filter(f => f.startsWith('x_snc_forecast_v_0_lab_asset_'))) {
    const x = fs.readFileSync(path.join(metaDir, f), 'utf8')
    const name = /<name>([^<]+)<\/name>/.exec(x)?.[1]
    const id = /<image>([0-9a-f]{32})<\/image>/.exec(x)?.[1]
    if (name && id) entries[name.split('/').pop()] = id
}
const body = Object.keys(entries).sort().map(k => `    ${JSON.stringify(k)}: '${entries[k]}',`).join('\n')
let map = fs.readFileSync(mapFile, 'utf8')
map = map.replace(/(export const LAB_ATTACHMENTS: Record<string, string> = \{\n)[\s\S]*?(\n\}\n)/, (_, a, b) => a + body + b)
fs.writeFileSync(mapFile, map)
console.log(`markdown pages refreshed: ${Object.keys(LOCAL).length}; assets mapped: ${Object.keys(entries).length}`)
