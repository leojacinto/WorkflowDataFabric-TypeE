import { VIRTUAL_ON_HTML } from './html'
import { VIRTUAL_ON_CSS } from './css'
import { loadSceneScript } from './loader'

/*
 * Assembles the standalone virtual-on document for an iframe srcdoc.
 *
 *  - srcdoc has no URL of its own, so a <base> is injected for the scene
 *    script's relative PNG reference (which IS servable from public/).
 *  - the <link> and <script src> tags are stripped; the stylesheet is inlined
 *    and the scene script appended at the end of <body>. `defer` has no effect
 *    on inline scripts, and the script needs the canvas and control elements
 *    already parsed before it runs.
 *  - the closing tag is split so it cannot terminate the surrounding block.
 */
export const VIRTUAL_ON_ASSET_BASE = '/wdf-lab/public/virtual-on/'

export async function buildVirtualOnDoc(assetBase: string = VIRTUAL_ON_ASSET_BASE): Promise<string> {
    const scene = await loadSceneScript()

    let doc = VIRTUAL_ON_HTML.replace('<head>', `<head><base href="${assetBase}"><style>${VIRTUAL_ON_CSS}</style>`)
        .replace('<link rel="stylesheet" href="wide.css">', '')
        .replace('<script src="scene.js" defer></script>', '')

    if (scene) {
        doc = doc.replace('</body>', `<script>${scene}<\/script></body>`)
    }

    return doc
}
