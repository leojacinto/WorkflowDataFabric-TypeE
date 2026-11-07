import React, { useEffect, useState } from 'react'
import Markdown from '../components/Markdown'
import { LAB_MARKDOWN } from '../content/lab-markdown'
import { LabDoc, readMarkdown } from '../lib/markdown'
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

            {state.phase === 'ready' && (
                <Markdown blocks={state.doc.blocks} navigate={navigate} />
            )}
        </div>
    )
}
