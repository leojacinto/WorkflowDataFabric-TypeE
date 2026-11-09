import { Block, plainText } from './markdown'

/*
 * Build Agent / Manual pairs. A section whose heading reads
 * "Hands-on (Build Agent option...): <Title>" and another reading
 * "Hands-on: <Title>" with the same title are two ways to do one task.
 * Sections without a twin (a Build Agent step that has no manual version)
 * are never hidden.
 */

export type Approach = 'ba' | 'manual'

export interface ApproachSection {
    start: number
    end: number
    role: Approach
    title: string
}

const BA_HEADING = /^hands[- ]on \(build agent option[^)]*\):\s*(.+)$/i
const MANUAL_HEADING = /^hands[- ]on:\s*(.+)$/i

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()

export function findApproachSections(blocks: Block[]): ApproachSection[] {
    const found: (ApproachSection & { key: string })[] = []

    blocks.forEach((b, i) => {
        if (b.kind !== 'heading') return
        const text = plainText(b.children).trim()
        const ba = BA_HEADING.exec(text)
        const manual = ba ? null : MANUAL_HEADING.exec(text)
        const m = ba || manual
        if (!m) return

        let end = blocks.length
        for (let j = i + 1; j < blocks.length; j++) {
            const n = blocks[j]
            if (n.kind === 'heading' && n.level <= b.level) {
                end = j
                break
            }
        }
        found.push({
            start: i,
            end,
            role: ba ? 'ba' : 'manual',
            title: m[1].trim(),
            key: norm(m[1]),
        })
    })

    const roles = new Map<string, Set<Approach>>()
    found.forEach(s => {
        if (!roles.has(s.key)) roles.set(s.key, new Set())
        roles.get(s.key)!.add(s.role)
    })

    return found
        .filter(s => roles.get(s.key)!.size === 2)
        .map(({ key: _key, ...s }) => s)
}

const STORAGE_KEY = 'wdf-lab-approach'

export function readApproach(): Approach {
    try {
        const v = window.localStorage.getItem(STORAGE_KEY)
        return v === 'manual' ? 'manual' : 'ba'
    } catch {
        return 'ba'
    }
}

export function saveApproach(a: Approach) {
    try {
        window.localStorage.setItem(STORAGE_KEY, a)
    } catch {
        /* storage can be blocked; the choice then lasts for this page only */
    }
}
