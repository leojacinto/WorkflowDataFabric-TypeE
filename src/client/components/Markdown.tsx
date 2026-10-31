import React from 'react'
import { Block, Inline } from '../lib/markdown'

/*
 * AST -> React. Reuses the existing lab-* classes so fetched content matches
 * the pages that were built by hand.
 */

interface Props {
    blocks: Block[]
    navigate: (path: string) => void
}

/*
 * Screenshots are 2x captures, so a small crop (an All menu, one button) blows
 * up when stretched to the column. Size each image from its pixel width:
 * S under 500px, M under 1100px, L otherwise. Short strips (toolbars, button
 * rows) drop one size. The author's own width from GitBook still caps it.
 */
const SIZE_CLASSES = ['lab-img--s', 'lab-img--m', 'lab-img--l']

function sizeImage(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget
    const w = img.naturalWidth
    const h = img.naturalHeight
    if (!w) return
    let tier = w < 500 ? 0 : w < 1100 ? 1 : 2
    if (h < 130 && tier > 0) tier--
    img.classList.remove(...SIZE_CLASSES)
    img.classList.add(SIZE_CLASSES[tier])
    // tiny crops (a single button) never grow past their own pixel width
    if (tier === 0 && w < 320 && !img.style.maxWidth) img.style.maxWidth = `${w}px`
}

/** GitBook colour names used in <mark> tags, mapped to the lab palette. */
const MARK_CLASS: Record<string, string> = {
    red: 'lab-mark--critical',
    warning: 'lab-mark--warning',
    orange: 'lab-mark--warning',
    yellow: 'lab-mark--warning',
    green: 'lab-mark--positive',
    blue: 'lab-mark--info',
    purple: 'lab-mark--info',
}

function Inlines({
    nodes,
    navigate,
}: {
    nodes: Inline[]
    navigate: (p: string) => void
}) {
    return (
        <>
            {nodes.map((n, i) => {
                switch (n.kind) {
                    case 'text':
                        return <React.Fragment key={i}>{n.text}</React.Fragment>
                    case 'strong':
                        return (
                            <strong key={i} className="lab-strong">
                                <Inlines nodes={n.children} navigate={navigate} />
                            </strong>
                        )
                    case 'em':
                        return (
                            <em key={i}>
                                <Inlines nodes={n.children} navigate={navigate} />
                            </em>
                        )
                    case 'code':
                        return (
                            <code key={i} className="lab-code">
                                {n.text}
                            </code>
                        )
                    case 'mark': {
                        const cls = n.color ? MARK_CLASS[n.color] : undefined
                        return (
                            <mark key={i} className={`lab-mark${cls ? ` ${cls}` : ''}`}>
                                <Inlines nodes={n.children} navigate={navigate} />
                            </mark>
                        )
                    }
                    case 'break':
                        return <br key={i} />
                    case 'link': {
                        const kids = <Inlines nodes={n.children} navigate={navigate} />
                        if (n.target.route) {
                            const route = n.target.route
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    className="lab-linkbtn"
                                    onClick={() => navigate(route)}
                                >
                                    {kids}
                                </button>
                            )
                        }
                        return (
                            <a
                                key={i}
                                className="lab-link"
                                href={n.target.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {kids}
                            </a>
                        )
                    }
                    default:
                        return null
                }
            })}
        </>
    )
}

function Blocks({ blocks, navigate }: Props) {
    return (
        <>
            {blocks.map((b, i) => {
                switch (b.kind) {
                    case 'heading': {
                        const cls =
                            b.level <= 2 ? 'lab-h2' : b.level === 3 ? 'lab-h3' : 'lab-h4'
                        const Tag = (`h${Math.min(b.level + 1, 6)}` as unknown) as 'h3'
                        return (
                            <Tag key={i} className={cls}>
                                <Inlines nodes={b.children} navigate={navigate} />
                            </Tag>
                        )
                    }
                    case 'para':
                        return (
                            <p key={i} className="lab-p">
                                <Inlines nodes={b.children} navigate={navigate} />
                            </p>
                        )
                    case 'figure':
                        return (
                            <figure key={i} className="lab-figure">
                                <img
                                    className="lab-img"
                                    src={b.src}
                                    alt={b.alt}
                                    loading="lazy"
                                    onLoad={sizeImage}
                                    style={
                                        b.width
                                            ? { maxWidth: `${b.width}px`, width: '100%' }
                                            : undefined
                                    }
                                />
                            </figure>
                        )
                    case 'code':
                        return (
                            <pre key={i} className="lab-pre">
                                <code>{b.text}</code>
                            </pre>
                        )
                    case 'quote':
                        return (
                            <blockquote key={i} className="lab-quote">
                                <Blocks blocks={b.blocks} navigate={navigate} />
                            </blockquote>
                        )
                    case 'rule':
                        return <hr key={i} className="lab-hr" />
                    case 'list': {
                        const ListTag = b.ordered ? 'ol' : 'ul'
                        return (
                            <ListTag
                                key={i}
                                className={`lab-list${b.ordered ? ' lab-list--ordered' : ''}`}
                            >
                                {b.items.map((item, j) => (
                                    <li key={j} className="lab-li">
                                        <Blocks blocks={item} navigate={navigate} />
                                    </li>
                                ))}
                            </ListTag>
                        )
                    }
                    case 'table':
                        return (
                            <div key={i} className="lab-table-wrap">
                                <table className="lab-table">
                                    <thead>
                                        <tr>
                                            {b.head.map((cell, j) => (
                                                <th key={j}>
                                                    <Inlines nodes={cell} navigate={navigate} />
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {b.rows.map((row, j) => (
                                            <tr key={j}>
                                                {row.map((cell, k) => (
                                                    <td key={k}>
                                                        {cell.length === 1 && cell[0].kind === 'para' ? (
                                                            <Inlines nodes={cell[0].children} navigate={navigate} />
                                                        ) : (
                                                            <Blocks blocks={cell} navigate={navigate} />
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    default:
                        return null
                }
            })}
        </>
    )
}

export default function Markdown({ blocks, navigate }: Props) {
    return (
        <div className="lab-md">
            <Blocks blocks={blocks} navigate={navigate} />
        </div>
    )
}
