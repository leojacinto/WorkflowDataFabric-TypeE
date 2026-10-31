/*
 * Runtime loader for the virtual-on scene script (~77 KB).
 *
 * The script lives in this app's own sys_ux_lib_asset record
 * ("wdf-lab/public/virtual-on/scene"), so it is read from there. Several URL
 * shapes are tried because the asset host's path layout is not guaranteed;
 * the first response that actually looks like the scene script wins.
 *
 * The last candidate is the legacy path: the AIUX lab app ships the same file
 * inlined in its home-page bundle, and that bundle's sourcemap exposes the
 * original module text. That app's chunk filename carries a content hash that
 * changes when it is redeployed, which is why it is no longer the primary
 * source - when the hash pattern stops matching, the fetch yields nothing.
 *
 * Any failure degrades to the static frame; it never throws into the host page.
 */

const ASSET_SYS_ID = 'cbaeffb12efe4b758e1867885a313af0';
const ASSET_NAME = 'wdf-lab/public/virtual-on/scene';
const SCOPE = 'x_snc_forecast_v_0';

const AIUX_HOME = '/aiux/wdf-lab/home';
const CHUNK_PATTERN = /pages\/wdf-lab\/home\/page-[A-Za-z0-9_-]+\.js/;
const EMBED_SOURCE = 'virtual-on-embed';
const EXPORT_NAME = 'VIRTUAL_ON_JS';

/** The scene script always grabs the canvas by this id. */
const FINGERPRINT = "getElementById('scene')";

let cached: Promise<string> | null = null;

function looksLikeScene(text: string): boolean {
    return Boolean(text) && text.indexOf(FINGERPRINT) > -1;
}

async function text(url: string, headers?: Record<string, string>): Promise<string> {
    const res = await fetch(url, { credentials: 'same-origin', headers });
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    return res.text();
}

/** Plain asset URLs, tried first since they need no extra privileges. */
async function fromAssetUrl(path: string): Promise<string> {
    const body = await text(path);
    if (!looksLikeScene(body)) throw new Error(`${path} -> not the scene script`);
    return body;
}

/** Table API read of this app's own asset record. */
async function fromTableApi(): Promise<string> {
    const token = (window as unknown as { g_ck?: string }).g_ck;
    const body = await text(
        `/api/now/table/sys_ux_lib_asset/${ASSET_SYS_ID}?sysparm_fields=content`,
        token
            ? { Accept: 'application/json', 'X-UserToken': token }
            : { Accept: 'application/json' }
    );
    const parsed = JSON.parse(body) as { result?: { content?: string } };
    const content = parsed.result?.content ?? '';
    if (!looksLikeScene(content)) throw new Error('table api -> not the scene script');
    return content;
}

/**
 * Pull the VIRTUAL_ON_JS string out of a module's source text.
 *
 * The value is a double-quoted JavaScript literal. JSON.parse handles it once
 * escaped single quotes - legal in JS, illegal in JSON - are unescaped.
 */
function extractExport(moduleSource: string): string {
    const marker = `export const ${EXPORT_NAME} = `;
    const start = moduleSource.indexOf(marker);
    if (start < 0) throw new Error(`${EXPORT_NAME} not found in embed module`);

    const open = start + marker.length;
    if (moduleSource[open] !== '"') throw new Error('unexpected literal form');

    let i = open + 1;
    let escaped = false;
    for (; i < moduleSource.length; i++) {
        const ch = moduleSource[i];
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === '"') break;
    }
    if (i >= moduleSource.length) throw new Error('unterminated literal');

    const literal = moduleSource.slice(open, i + 1);
    return JSON.parse(literal.replace(/\\'/g, "'")) as string;
}

/** Legacy path: scrape the AIUX home-page chunk's sourcemap. */
async function fromAiuxSourcemap(): Promise<string> {
    const html = await text(AIUX_HOME);
    const match = html.match(CHUNK_PATTERN);
    if (!match) throw new Error('AIUX home chunk not referenced in page');

    const chunkPath = `/aiux/wdf-lab/${match[0]}`;
    const map = JSON.parse(await text(`${chunkPath}.map`)) as {
        sources?: string[];
        sourcesContent?: string[];
    };

    const sources = map.sources ?? [];
    const contents = map.sourcesContent ?? [];
    const index = sources.findIndex(s => s.includes(EMBED_SOURCE));
    if (index < 0) throw new Error('embed module absent from sourcemap');

    const scene = extractExport(contents[index] ?? '');
    if (!looksLikeScene(scene)) throw new Error('sourcemap -> not the scene script');
    return scene;
}

/** Resolve the scene script, or an empty string if no source yields it. */
export function loadSceneScript(): Promise<string> {
    if (cached) return cached;

    const attempts: (() => Promise<string>)[] = [
        () => fromAssetUrl(`/uxasset/externals/${SCOPE}/${ASSET_NAME}.js`),
        () => fromAssetUrl(`/uxasset/externals/${SCOPE}/${ASSET_NAME}`),
        () => fromAssetUrl(`/${ASSET_NAME}.js`),
        fromTableApi,
        fromAiuxSourcemap,
    ];

    cached = (async () => {
        const failures: string[] = [];
        for (const attempt of attempts) {
            try {
                return await attempt();
            } catch (err: unknown) {
                failures.push(err instanceof Error ? err.message : String(err));
            }
        }
        console.warn('[virtual-on] scene script unavailable:', failures);
        return '';
    })();

    return cached;
}
