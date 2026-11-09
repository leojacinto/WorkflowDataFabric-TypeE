import React, { useEffect, useMemo, useState } from 'react'
import ApproachSwitch from '../components/ApproachSwitch'
import Markdown from '../components/Markdown'
import { LAB_MARKDOWN } from '../content/lab-markdown'
import { Approach, findApproachSections, readApproach, saveApproach } from '../lib/approach'
import { Block, LabDoc, readMarkdown } from '../lib/markdown'
import { TocItem } from '../toc'

/*
 * Renders a lab page from its GitBook markdown, bundled with the app.
 * Header/badges keep the same shape the built pages use.
 */

type State =
    | { phase: 'loading' }
    | { phase: 'ready'; doc: LabDoc }
    | { phase: 'error'; message: string; url: string }

export default function LabPage({
    route,
    item,
    navigate,
}: {
    route: string
    item: TocItem
    navigate: (p: string) => void
}) {
    const [state, setState] = useState<State>({ phase: 'loading' })
    const [approach, setApproach] = useState<Approach>(readApproach)

    const choose = (a: Approach) => {
        setApproach(a)
        saveApproach(a)
    }

    const parts = useMemo(
        () => (state.phase === 'ready' ? splitByApproach(state.doc.blocks, approach) : []),
        [state, approach]
    )

    useEffect(() => {
        const text = LAB_MARKDOWN[route]

        if (text === undefined) {
            setState({ phase: 'error', message: 'No source mapped for this page.', url: route })
            return
        }

        setState({ phase: 'ready', doc: readMarkdown(text) })
    }, [route])

    return (
        <div className="lab-page">
            <header className="lab-titleblock">
                <h2 className="lab-h2">
                    {state.phase === 'ready' && state.doc.title ? state.doc.title : item.title}
                </h2>
                {(item.difficulty || item.duration) && (
                    <div className="lab-badges">
                        {item.difficulty && (
                            <span className="lab-tag lab-tag--level">{item.difficulty}</span>
                        )}
                        <span className="lab-tag lab-tag--ghost">
                            {item.aiAgents ? 'AI agents' : 'No AI agents'}
                        </span>
                        {item.duration && (
                            <span className="lab-tag lab-tag--ghost">{item.duration}</span>
                        )}
                    </div>
                )}
            </header>

            {state.phase === 'loading' && (
                <div className="lab-loading" role="status">
                    Loading lab content&hellip;
                </div>
            )}

            {state.phase === 'error' && (
                <div className="lab-placeholder">
                    <p className="lab-p">Could not load this exercise ({state.message}).</p>
                    {state.url && (
                        <p className="lab-p">
                            <a
                                className="lab-link"
                                href={state.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open the source on GitHub
                            </a>
                        </p>
                    )}
                </div>
            )}

            {state.phase === 'ready' &&
                parts.map((p, i) => {
                    if (p.kind === 'switch') {
                        return <ApproachSwitch key={i} value={approach} onChange={choose} />
                    }
                    if (p.kind === 'hidden') {
                        const other = p.role === 'ba' ? 'Build Agent' : 'Manual'
                        const mine = p.role === 'ba' ? 'manual' : 'Build Agent'
                        return (
                            <p key={i} className="lab-approach-hidden">
                                The {other} steps for &ldquo;{p.title}&rdquo; are hidden because you chose{' '}
                                {mine}.{' '}
                                <button
                                    type="button"
                                    className="lab-link lab-approach-switch-link"
                                    onClick={() => choose(p.role)}
                                >
                                    Show the {other} steps
                                </button>
                            </p>
                        )
                    }
                    return <Markdown key={i} blocks={p.blocks} navigate={navigate} />
                })}
        </div>
    )
}

type Part =
    | { kind: 'blocks'; blocks: Block[] }
    | { kind: 'switch' }
    | { kind: 'hidden'; role: Approach; title: string }

/** Cuts the page into runs of blocks, the approach switch, and notes where a path is hidden. */
function splitByApproach(blocks: Block[], approach: Approach): Part[] {
    const sections = findApproachSections(blocks)
    if (!sections.length) return [{ kind: 'blocks', blocks }]

    const first = Math.min(...sections.map(s => s.start))
    const parts: Part[] = []
    let run: Block[] = []
    const flush = () => {
        if (run.length) parts.push({ kind: 'blocks', blocks: run })
        run = []
    }

    let i = 0
    while (i < blocks.length) {
        if (i === first) {
            flush()
            parts.push({ kind: 'switch' })
        }
        const sec = sections.find(s => s.start === i)
        if (sec && sec.role !== approach) {
            flush()
            parts.push({ kind: 'hidden', role: sec.role, title: sec.title })
            i = sec.end
            continue
        }
        run.push(blocks[i])
        i++
    }
    flush()
    return parts
}
