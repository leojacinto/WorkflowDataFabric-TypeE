import { IconName } from './icons'

/*
 * Mirrors the AIUX app's constants/toc.js and application.js nav structure
 * 1:1 (same paths, titles, icons, ordering and L2 grouping).
 */
export interface TocItem {
    path: string
    title: string
    difficulty?: string
    duration?: string
    aiAgents?: boolean
    built?: boolean
}

export interface NavSection {
    id: string
    icon: IconName
    title: string
    path?: string
    items?: TocItem[]
    dividerBefore?: boolean
}

export const MAIN_EXERCISES: TocItem[] = [
    {
        path: '/exercises/fundamentals',
        title: 'Lab Exercise: Fundamentals',
        difficulty: 'Beginner',
        aiAgents: false,
        duration: '30 minutes',
        built: true,
    },
    {
        path: '/exercises/integration-hub',
        title: 'Lab Exercise: Integration Hub',
        difficulty: 'Intermediate',
        aiAgents: true,
        duration: '90 minutes',
    },
    {
        path: '/exercises/zero-copy-connectors',
        title: 'Lab Exercise: Zero Copy Connectors',
        difficulty: 'Intermediate',
        aiAgents: true,
        duration: '90 minutes',
    },
]

export const EXTENDED_EXERCISES: TocItem[] = [
    {
        path: '/exercises/external-content-connector',
        title: 'Lab Exercise: External Content Connector',
        difficulty: 'Beginner',
        aiAgents: true,
        duration: '30 minutes',
    },
    {
        path: '/exercises/lens-and-document-intelligence',
        title: 'Lab Exercise: ServiceNow Lens and Document Intelligence',
        difficulty: 'Beginner',
        aiAgents: true,
        duration: '30 minutes',
    },
    {
        path: '/exercises/mcp-server-client',
        title: 'Lab Exercise: Model Context Protocol Server/Client',
        difficulty: 'Intermediate',
        aiAgents: true,
        duration: '1 hour',
    },
]

export const CONCLUSION: TocItem[] = [
    { path: '/conclusion/key-takeaways', title: 'Key Takeaways' },
    { path: '/conclusion/final-activity', title: 'Final Activity' },
]

export const HUNGRY_FOR_MORE: TocItem[] = [
    {
        path: '/exercises/kafka-stream-connect',
        title: 'Lab Exercise: Stream Connect for Apache Kafka Lab',
        difficulty: 'Advanced',
        aiAgents: true,
        duration: '1 hour',
    },
]

export const DEMO_HUB: TocItem[] = [
    { path: '/demo-hub/considerations', title: 'Demo Hub Preparations' },
    { path: '/demo-hub/for-facilitators', title: 'For Lab Facilitators' },
]

export const NAV: NavSection[] = [
    { id: 'home', icon: 'home', title: 'Overview', path: '/home' },
    {
        id: 'diagrams',
        icon: 'chartSankey',
        title: 'Data & Flow Diagrams',
        path: '/diagrams',
    },
    { id: 'main', icon: 'list', title: 'Main Exercises', items: MAIN_EXERCISES },
    {
        id: 'extended',
        icon: 'lightbulb',
        title: 'Extended Exercises',
        items: EXTENDED_EXERCISES,
    },
    { id: 'conclusion', icon: 'flag', title: 'Conclusion', items: CONCLUSION },
    {
        id: 'hungry',
        icon: 'rocketship',
        title: 'Hungry for more?',
        items: HUNGRY_FOR_MORE,
    },
    {
        id: 'troubleshooting',
        icon: 'gear',
        title: 'Troubleshooting',
        path: '/troubleshooting',
        dividerBefore: true,
    },
    {
        id: 'demo-hub',
        icon: 'building',
        title: 'Demo Hub for SCs',
        items: DEMO_HUB,
    },
]

/** Flat lookup of every routable entry. */
export const ALL_ITEMS: TocItem[] = [
    { path: '/home', title: 'Overview', built: true },
    { path: '/diagrams', title: 'Data and Flow Diagrams' },
    ...MAIN_EXERCISES,
    ...EXTENDED_EXERCISES,
    ...CONCLUSION,
    ...HUNGRY_FOR_MORE,
    { path: '/troubleshooting', title: 'Troubleshooting' },
    ...DEMO_HUB,
]

export function findItem(path: string): TocItem | undefined {
    return ALL_ITEMS.find((i) => i.path === path)
}
