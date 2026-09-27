import {i18n} from '@servicenow/aiux/aiux-services';

/**
 * Table of contents for the WDF Lab, mirroring the GitBook SUMMARY.md structure
 * (https://servicenow-data-and-ai.gitbook.io/wdf-lab) 1:1 so the sidebar nav and
 * the "coming soon" placeholder page both reflect the full lab, not just the
 * pages that have been ported so far.
 *
 * `built: true` pages have a real pages/<route>/page.js. Everything else
 * renders through pages/[...slug]/page.js as a "coming soon" placeholder.
 *
 * Translatable fields (`title`, `label`, `difficulty`, `duration`) are
 * `() => i18n.getMessage('<literal>')` getters, not raw strings — the build's
 * static extractor only captures string literals passed directly to
 * i18n.getMessage(), so keeping the literal inline with its own call, right
 * here, is what gets each string into the catalog. Call the getter (e.g.
 * `item.title()`) to read the localized text; do not pass these getters
 * themselves to i18n.getMessage().
 */
export const TOC_SECTIONS = [
  {
    id: 'overview',
    label: null,
    items: [
      {
        path: '/home',
        title: () =>
          i18n.getMessage(
            'APAC AI End-to-End Lab: Workflow Data Fabric'
          ),
        icon: 'home',
        built: true
      },
      {
        path: '/diagrams',
        title: () => i18n.getMessage('Data and Flow Diagrams'),
        icon: 'document-outline',
        built: true
      }
    ]
  },
  {
    id: 'main-exercises',
    label: () => i18n.getMessage('Main Exercises'),
    icon: 'list-outline',
    items: [
      {
        path: '/exercises/fundamentals',
        title: () => i18n.getMessage('Lab Exercise: Fundamentals'),
        difficulty: () => i18n.getMessage('Beginner'),
        aiAgents: false,
        duration: () => i18n.getMessage('30 minutes'),
        built: true
      },
      {
        path: '/exercises/integration-hub',
        title: () => i18n.getMessage('Lab Exercise: Integration Hub'),
        difficulty: () => i18n.getMessage('Intermediate'),
        aiAgents: true,
        duration: () => i18n.getMessage('90 minutes'),
        built: true
      },
      {
        path: '/exercises/zero-copy-connectors',
        title: () => i18n.getMessage('Lab Exercise: Zero Copy Connectors'),
        difficulty: () => i18n.getMessage('Intermediate'),
        aiAgents: true,
        duration: () => i18n.getMessage('90 minutes'),
        built: true
      }
    ]
  },
  {
    id: 'extended-exercises',
    label: () => i18n.getMessage('Extended Exercises'),
    icon: 'lightbulb',
    items: [
      {
        path: '/exercises/external-content-connector',
        title: () =>
          i18n.getMessage('Lab Exercise: External Content Connector'),
        difficulty: () => i18n.getMessage('Beginner'),
        aiAgents: true,
        duration: () => i18n.getMessage('30 minutes'),
        built: true
      },
      {
        path: '/exercises/lens-and-document-intelligence',
        title: () =>
          i18n.getMessage(
            'Lab Exercise: ServiceNow Lens and Document Intelligence'
          ),
        difficulty: () => i18n.getMessage('Beginner'),
        aiAgents: true,
        duration: () => i18n.getMessage('30 minutes'),
        built: true
      },
      {
        path: '/exercises/mcp-server-client',
        title: () =>
          i18n.getMessage(
            'Lab Exercise: Model Context Protocol Server/Client'
          ),
        difficulty: () => i18n.getMessage('Intermediate'),
        aiAgents: true,
        duration: () => i18n.getMessage('1 hour'),
        built: true
      }
    ]
  },
  {
    id: 'conclusion',
    label: () => i18n.getMessage('Conclusion'),
    icon: 'document-outline',
    items: [
      {
        path: '/conclusion/key-takeaways',
        title: () => i18n.getMessage('Key Takeaways'),
        built: true
      },
      {
        path: '/conclusion/final-activity',
        title: () => i18n.getMessage('Final Activity'),
        built: true
      }
    ]
  },
  {
    id: 'hungry-for-more',
    label: () => i18n.getMessage('Hungry for more?'),
    icon: 'link-outline',
    items: [
      {
        path: '/exercises/kafka-stream-connect',
        title: () =>
          i18n.getMessage(
            'Lab Exercise: Stream Connect for Apache Kafka Lab'
          ),
        difficulty: () => i18n.getMessage('Advanced'),
        aiAgents: true,
        duration: () => i18n.getMessage('1 hour'),
        built: true
      }
    ]
  },
  {
    id: 'troubleshooting-section',
    label: null,
    items: [
      {
        path: '/troubleshooting',
        title: () => i18n.getMessage('Troubleshooting'),
        icon: 'gear',
        built: true
      }
    ]
  },
  {
    id: 'demo-hub',
    label: () => i18n.getMessage('Demo Hub for SCs'),
    icon: 'building',
    items: [
      {
        path: '/demo-hub/considerations',
        title: () => i18n.getMessage('Demo Hub Preparations'),
        built: true
      },
      {
        path: '/demo-hub/for-facilitators',
        title: () => i18n.getMessage('For Lab Facilitators'),
        built: true
      }
    ]
  }
];

/** Flat lookup of every TOC entry by path, with its owning section attached. */
export function findTocEntry(path) {
  for (const section of TOC_SECTIONS) {
    const item = section.items.find(i => i.path === path);
    if (item) return {...item, section: section.label};
  }
  return null;
}
