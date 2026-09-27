import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../utils/document-title.js';
import {TOC_SECTIONS} from '../../constants/toc.js';
import {
  VIRTUAL_ON_HTML,
  VIRTUAL_ON_CSS,
  VIRTUAL_ON_JS
} from './virtual-on-embed.js';

const mainExercises = TOC_SECTIONS.find(s => s.id === 'main-exercises');
const extendedExercises = TOC_SECTIONS.find(s => s.id === 'extended-exercises');
const hungryForMore = TOC_SECTIONS.find(s => s.id === 'hungry-for-more');

// `title`/`difficulty`/`duration` are () => i18n.getMessage('<literal>')
// getters (see constants/toc.js) — call them, don't pass them to getMessage().
const EXERCISES = [
  {
    title: () => i18n.getMessage('Workflow Data Fabric Diagrams'),
    path: '/diagrams'
  },
  {group: () => i18n.getMessage('Main Exercises')},
  ...mainExercises.items,
  {group: () => i18n.getMessage('Extended Exercises')},
  ...extendedExercises.items,
  {group: () => i18n.getMessage('Hungry for more?')},
  ...hungryForMore.items
];

const DEPENDENCIES = [
  {
    component: () => i18n.getMessage('Zero Copy Connector for SQL'),
    version: '2.0.0'
  },
  {
    component: () => i18n.getMessage('Zero Copy Connector for ERP'),
    version: '8.0.14'
  },
  {
    component: () =>
      i18n.getMessage('External Content Connectors for SharePoint Online'),
    version: '4.1.7'
  },
  {component: () => i18n.getMessage('Workflow Studio'), version: '28.1.4'},
  {component: () => i18n.getMessage('Now Assist Skill Kit'), version: '6.0.7'},
  {component: () => i18n.getMessage('MCP Server'), version: '1.0.0'},
  {component: () => i18n.getMessage('MCP Client'), version: '1.0.7'},
  {component: () => i18n.getMessage('Lens'), version: '2.0.0'},
  {
    component: () => i18n.getMessage('Document Intelligence'),
    version: '7.1.5'
  }
];

@customElement('x-snc-wdf-lab-home-page')
export default class HomePage extends AIUXElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100%;
      container-type: inline-size;
    }
    figure {
      margin: 0;
    }
    figcaption {
      margin-top: 0.5rem;
    }
    .vo-frame {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      border: 0;
      border-radius: 0.75rem;
    }
  `;

  firstUpdated() {
    setDocumentTitle(i18n.getMessage('Overview'));
    this._loadVirtualOnFrame();
  }

  // The instance's static-asset host only serves image/font files from
  // public/ -- .html/.css/.js requests 404 there, so wide.html/wide.css/
  // scene.js can't be fetched at runtime. They're inlined verbatim (see
  // virtual-on-embed.js) and assembled into the srcdoc here instead. srcdoc
  // has no URL of its own, so a <base> tag is still needed for scene.js's
  // relative png reference, which *is* servable from public/. The inlined
  // script runs at the end of <body> (not <head>) because `defer` has no
  // effect on scripts without a `src` attribute -- it needs the canvas and
  // control elements already parsed before it runs.
  _loadVirtualOnFrame() {
    const {basePath} = this.loaderData || {};
    const iframe = this.renderRoot?.querySelector('#virtual-on-frame');
    if (!iframe) return;
    const assetBase = `${basePath.replace(/^\/aiux/, '')}/public/virtual-on/`;
    const html = VIRTUAL_ON_HTML.replace(
      '<head>',
      `<head><base href="${assetBase}"><style>${VIRTUAL_ON_CSS}</style>`
    )
      .replace('<link rel="stylesheet" href="wide.css">', '')
      .replace(
        '<script src="scene.js" defer></script>',
        ''
      )
      .replace('</body>', `<script>${VIRTUAL_ON_JS}</script></body>`);
    iframe.srcdoc = html;
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path =>
      `${basePath.replace(/^\/aiux/, '')}/public/wdf/home/${path}`;

    return html`
      <div class="mx-auto flex max-w-4xl flex-col gap-8 p-4 lg:p-8">
        <iframe
          id="virtual-on-frame"
          title="${i18n.getMessage('Workflow Data Fabric')}"
          class="vo-frame border border-base-300"
        ></iframe>

        <header class="flex flex-col gap-2">
          <span class="aiux-badge aiux-badge-primary aiux-badge-outline w-fit">
            ${i18n.getMessage('APAC AI End-to-End Lab')}
          </span>
          <h2 class="text-4xl font-bold text-text-primary">
            ${i18n.getMessage('Workflow Data Fabric')}
          </h2>
        </header>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Business motivation')}
          </h3>
          <figure>
            <img
              src="${asset('sc_slide_building_for_whom.png')}"
              alt="${i18n.getMessage(
                'Illustration of the Finance Managers and Cost Center Owners this lab is built for'
              )}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Finance teams discover budget overruns weeks too late. Expense analysis requires manually piecing together data from ERP systems, data warehouses, and SharePoint. By the time finance reacts, small variances become major problems.'
            )}
            <strong class="text-text-primary"
              >${i18n.getMessage(
                'ServiceNow Workflow Data Fabric transforms reactive financial management into proactive intelligence.'
              )}</strong
            >
            ${i18n.getMessage(
              'By unifying data across systems through Zero Copy for SQL and ERP, Integration Hub, External Content Connectors, MCP, and AI agents, organizations can:'
            )}
          </p>
          <ul class="list-disc space-y-1 pl-6 text-base text-text-secondary">
            <li>
              ${i18n.getMessage(
                'Detect budget issues in real-time before they escalate'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'Scale financial operations with AI agents, not headcount'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'Automate financial case creation enriched with multiple external data sources and trend analysis'
              )}
            </li>
          </ul>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Your automations and AI Agents are just as good as your underlying data. Integrations powered by Workflow Data Fabric allow AI Agents to automate critical processes using accurate and consistent data.'
            )}
          </p>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'With the trend of external agents reaching through enterprise data, it is worth examining why platform-native agents can scale more safely. Agents built within ServiceNow inherit battle-tested authorization models: role-based access, ACLs, and purpose-built security controls for AI agents; allowing organizations to automate confidently without stepping outside their governance boundaries.'
            )}
          </p>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Persona context')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              "You're a Data Architect serving the Finance department. Finance Managers need immediate visibility into budget performance. Cost Center Owners need to understand why they’re over budget; with context beyond just numbers."
            )}
          </p>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Your mission: build an intelligent financial data fabric that connects ServiceNow to external systems, deploys AI agents to detect and analyze budget issues automatically, surfaces executive guidance, and enables self-service analytics through Employee Center and Claude Desktop. You’ll solve three critical problems:'
            )}
          </p>
          <ol class="list-decimal space-y-1 pl-6 text-base text-text-secondary">
            <li>
              ${i18n.getMessage(
                '"We find out about budget overruns too late: can we get real-time alerts?"'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                '"Investigation means manually searching expenses, reports, and memos: can you unify this?"'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                '"We answer the same questions daily: can employees self-serve?"'
              )}
            </li>
          </ol>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Outcome')}
          </h3>
          <figure>
            <picture>
              <source
                srcset="${asset('dataflow_outcome_agent_flow_dark.png')}"
                media="(prefers-color-scheme: dark)"
              />
              <img
                src="${asset('dataflow_outcome_agent_flow.png')}"
                alt="${i18n.getMessage(
                  'Agent tools and data sources flowing to external systems'
                )}"
                class="w-full rounded-xl border border-base-300"
              />
            </picture>
            <figcaption class="text-sm text-text-tertiary">
              ${i18n.getMessage('Legend:')} 🟤
              ${i18n.getMessage('Data')} | 🟣
              ${i18n.getMessage('Workflow Data Fabric')} | 🔵
              ${i18n.getMessage('External Systems')} | ⚪
              ${i18n.getMessage('Workspace')} | ↓
              ${i18n.getMessage('Takes data from')}
            </figcaption>
          </figure>
          <figure>
            <img
              src="${asset('sc_readme_hero.png')}"
              alt="${i18n.getMessage(
                'Illustration of the completed Workflow Data Fabric solution'
              )}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              "By completing this lab, you'll build an interconnected financial intelligence platform demonstrating:"
            )}
          </p>
          <ul class="list-disc space-y-1 pl-6 text-base text-text-secondary">
            <li>
              ${i18n.getMessage(
                'Integration Hub for real-time expense event processing'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'Zero Copy integration with ERP and cloud warehouses (no data duplication)'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'MCP Server enabling integration with any application that supports the protocol'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'AI agents that autonomously search via RAG, analyze trends, and create contextual cases'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'Lens and Document Intelligence for invoice data capture individually or batch, respectively'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'External Content Connector bringing executive memos into making decisions'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'Finance Case Management, which receives the cases pre-processed by the AI Agents based on data taken from WDF'
              )}
            </li>
          </ul>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Lab exercises')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'This lab is divided into 7 exercises over 3 sections with the suggested sequence below. This is designed to be a full day workshop covering most of WDF’s capabilities.'
            )}
          </p>
          <div class="aiux-card aiux-card-border bg-base-100 overflow-x-auto">
            <table class="aiux-table">
              <thead>
                <tr>
                  <th scope="col">${i18n.getMessage('Topic')}</th>
                  <th scope="col">${i18n.getMessage('Difficulty')}</th>
                  <th scope="col">${i18n.getMessage('AI Agents involved')}</th>
                  <th scope="col">${i18n.getMessage('Suggested duration')}</th>
                </tr>
              </thead>
              <tbody>
                ${EXERCISES.map(row =>
                  row.group
                    ? html`
                        <tr>
                          <th scope="colgroup" colspan="4" class="bg-base-200">
                            ${row.group()}
                          </th>
                        </tr>
                      `
                    : html`
                        <tr>
                          <th scope="row">
                            <a
                              class="aiux-link aiux-link-primary"
                              href="${basePath}${row.path}"
                              >${row.title()}</a
                            >
                          </th>
                          <td>
                            ${row.difficulty
                              ? row.difficulty()
                              : i18n.getMessage('N/A')}
                          </td>
                          <td>
                            ${row.aiAgents
                              ? i18n.getMessage('Yes')
                              : i18n.getMessage('No')}
                          </td>
                          <td>
                            ${row.duration
                              ? row.duration()
                              : i18n.getMessage('N/A')}
                          </td>
                        </tr>
                      `
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('How each lab exercise will be conducted')}
          </h3>
          <figure>
            <img
              src="${asset('sc_slide_how_this_workshop_works.png')}"
              alt="${i18n.getMessage(
                'Diagram of the format each lab exercise follows'
              )}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('A note from the author and some disclaimers')}
          </h3>
          <div class="aiux-alert aiux-alert-warning aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'This lab involves integrating ServiceNow with external systems (e.g., databases, APIs, cloud services). Some steps require pre-configured environments and connectivity that may not be available in a standard PDI; this is best run as a guided workshop.'
              )}
            </span>
          </div>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('ServiceNow dependencies')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Before attempting these exercises, ensure you have access and license entitlements to the following (Zurich Patch 4 recommended):'
            )}
          </p>
          <div class="aiux-card aiux-card-border bg-base-100 overflow-x-auto">
            <table class="aiux-table aiux-table-zebra">
              <thead>
                <tr>
                  <th scope="col">${i18n.getMessage('Component needed')}</th>
                  <th scope="col">${i18n.getMessage('Required version')}</th>
                </tr>
              </thead>
              <tbody>
                ${DEPENDENCIES.map(
                  dep => html`
                    <tr>
                      <th scope="row">${dep.component()}</th>
                      <td>${dep.version}</td>
                    </tr>
                  `
                )}
              </tbody>
            </table>
          </div>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('About the author')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'This lab is created by Leo Francia, a Data Architect at ServiceNow, and is in no way a ServiceNow official manual. Leo is an active member of the ServiceNow community and presales organization so do not hesitate to drop him a note.'
            )}
          </p>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Acknowledgement')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'This lab would not have been possible without the help of exceptional colleagues at ServiceNow: Kamal Shewakramani, Gurjot Joshi, Santosh Panda, Jia Khee Lim, Rahul Adlakha, Theo Simmons, Quentin Carton, and Dan Clark.'
            )}
          </p>
        </section>
      </div>
    `;
  }
}
