import React from 'react'
import { Approach } from '../lib/approach'

/*
 * "Choose your approach" control for pages that offer the same task as a
 * Build Agent prompt and as manual steps. Two buttons in a radio group.
 */

const OPTIONS: { value: Approach; label: string; blurb: string }[] = [
    {
        value: 'ba',
        label: 'Build Agent',
        blurb: 'Describe the task in a prompt and let ServiceNow Build Agent build it, then approve the result.',
    },
    {
        value: 'manual',
        label: 'Manual',
        blurb: 'Do each step yourself in the ServiceNow screens by following the numbered steps and screenshots.',
    },
]

export default function ApproachSwitch({
    value,
    onChange,
}: {
    value: Approach
    onChange: (a: Approach) => void
}) {
    return (
        <section className="lab-approach" aria-labelledby="lab-approach-title">
            <h3 id="lab-approach-title" className="lab-approach-title">
                Choose your approach
            </h3>
            <div className="lab-approach-options" role="radiogroup" aria-labelledby="lab-approach-title">
                {OPTIONS.map(o => (
                    <button
                        key={o.value}
                        type="button"
                        role="radio"
                        aria-checked={value === o.value}
                        className={'lab-approach-option' + (value === o.value ? ' is-selected' : '')}
                        onClick={() => onChange(o.value)}
                    >
                        <span className="lab-approach-label">{o.label}</span>
                        <span className="lab-approach-blurb">{o.blurb}</span>
                    </button>
                ))}
            </div>
            <p className="lab-approach-hint">
                The steps below follow your choice. It applies to every exercise page and is remembered in this browser.
            </p>
        </section>
    )
}
