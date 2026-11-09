/*
 * Route -> GitBook source file map, taken verbatim from the repo's SUMMARY.md.
 * Content is fetched at runtime; nothing here is transcribed by hand.
 */

export const RAW_BASE =
    'https://raw.githubusercontent.com/leojacinto/WorkflowDataFabric-TypeB/main'

export const ASSET_BASE = `${RAW_BASE}/.gitbook/assets`

/** Pages whose source has moved into this repo (TypeE) are mapped by full URL. */
export const TYPEE_RAW_BASE =
    'https://raw.githubusercontent.com/leojacinto/WorkflowDataFabric-TypeE/main'

export const PAGE_FILES: Record<string, string> = {
    '/home': 'README.md',
    '/diagrams': 'data-and-flow-diagrams.md',
    '/exercises/fundamentals': `${TYPEE_RAW_BASE}/lab-guide/main-exercises/lab-exercise-fundamentals.md`,
    '/exercises/integration-hub': `${TYPEE_RAW_BASE}/lab-guide/main-exercises/lab-exercise-integration-hub.md`,
    '/exercises/zero-copy-connectors': `${TYPEE_RAW_BASE}/lab-guide/main-exercises/lab-exercise-zero-copy-connectors.md`,
    '/exercises/external-content-connector': `${TYPEE_RAW_BASE}/lab-guide/extended-exercises/lab-exercise-external-content-connector.md`,
    '/exercises/lens-and-document-intelligence': `${TYPEE_RAW_BASE}/lab-guide/extended-exercises/lab-exercise-servicenow-lens-and-document-intelligence.md`,
    '/exercises/mcp-server-client': `${TYPEE_RAW_BASE}/lab-guide/extended-exercises/lab-exercise-model-context-protocol-server-client.md`,
    '/conclusion/key-takeaways': 'conclusion/key-takeaways.md',
    '/conclusion/final-activity': 'conclusion/final-activity.md',
    '/exercises/kafka-stream-connect':
        'hungry-for-more/lab-exercise-kafka_stream_connect.md',
    '/troubleshooting': 'troubleshooting.md',
    '/demo-hub/considerations': 'demo-hub-for-scs/demo-hub-considerations.md',
    '/demo-hub/for-facilitators': 'demo-hub-for-scs/for-lab-facilitators.md',
}

export function fileUrl(route: string): string | null {
    const file = PAGE_FILES[route]
    if (!file) return null
    return /^https?:\/\//i.test(file) ? file : `${RAW_BASE}/${file}`
}

/** basename (no extension, lowercased) -> route. Basenames are unique. */
const ROUTE_BY_BASENAME: Record<string, string> = Object.keys(PAGE_FILES).reduce(
    (acc, route) => {
        const file = PAGE_FILES[route]
        const base = file.slice(file.lastIndexOf('/') + 1).replace(/\.md$/i, '')
        acc[base.toLowerCase()] = route
        return acc
    },
    {} as Record<string, string>
)

const GITBOOK_HOST = 'servicenow-lf.gitbook.io'

export interface ResolvedHref {
    /** in-app route, when the target is another lab page */
    route?: string
    /** external URL, when it is not */
    href?: string
}

/** Turn a markdown link target into an in-app route or an external URL. */
export function resolveHref(raw: string): ResolvedHref {
    const target = raw.trim()

    if (!target || target.startsWith('#')) return { href: target || '#' }
    if (/^(mailto:|tel:)/i.test(target)) return { href: target }

    if (/^https?:\/\//i.test(target)) {
        const match = /^https?:\/\/([^/]+)(\/[^?#]*)?/i.exec(target)
        const host = match ? match[1].toLowerCase() : ''
        const path = match && match[2] ? match[2] : ''
        if (host === GITBOOK_HOST) {
            const route = routeForPath(path)
            if (route) return { route }
        }
        return { href: target }
    }

    if (/^\/(?!\/)/.test(target)) return { href: target }

    const stripped = target.replace(/[?#].*$/, '')

    // Bare "../" or "./" — GitBook's link to the space root, i.e. the README.
    if (/^\.{1,2}\/?$/.test(stripped)) return { route: '/home' }

    const route = routeForPath(stripped)
    if (route) return { route }

    return { href: `${RAW_BASE}/${stripped.replace(/^(\.\.?\/)+/, '')}` }
}

function routeForPath(path: string): string | undefined {
    const clean = path.replace(/\/+$/, '')
    if (!clean) return undefined
    const base = clean
        .slice(clean.lastIndexOf('/') + 1)
        .replace(/\.md$/i, '')
        .toLowerCase()
    if (!base) return undefined
    if (base === 'readme') return '/home'
    return ROUTE_BY_BASENAME[base]
}
