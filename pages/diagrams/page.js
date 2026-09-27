import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../utils/document-title.js';

@customElement('x-snc-wdf-lab-diagrams-page')
export default class DiagramsPage extends AIUXElement {
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
  `;

  firstUpdated() {
    setDocumentTitle(i18n.getMessage('Data and Flow Diagrams'));
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path => `${basePath.replace(/^\/aiux/, '')}/public/wdf/diagrams/${path}`;

    return html`
      <div class="mx-auto flex max-w-4xl flex-col gap-8 p-4 lg:p-8">
        <header class="flex flex-col gap-2">
          <span class="aiux-badge aiux-badge-primary aiux-badge-outline w-fit">
            ${i18n.getMessage('Reference')}
          </span>
          <h2 class="text-3xl font-bold text-text-primary">
            ${i18n.getMessage('Data and Flow Diagrams')}
          </h2>
        </header>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Before we proceed')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'If you have not done so yet, log in to Demo Hub then go to the APAC End-to-End AI Workshop catalog item to install the lab dependencies in your instance.'
            )}
          </p>
          <figure>
            <img
              src="${asset('sc_slide_lab_dependencies.png')}"
              alt="${i18n.getMessage(
                'Screenshot of the APAC End-to-End AI Workshop catalog item used to install lab dependencies'
              )}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Components')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Let us first start by breaking down the different components of the lab. The diagram below is a good representation of a tightly integrated ServiceNow landscape that spans various internal ServiceNow components and external data sources. The key thing to note is the end user will interact with Workspace, Employee Center, or an MCP Client (e.g., Claude Code or Desktop).'
            )}
          </p>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('External system prerequisites')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Baseline integration to the external systems listed in this lab have mostly been configured.'
            )}
          </p>
          <figure>
            <img
              src="${asset('dataflow_prerequisites.png')}"
              alt="${i18n.getMessage('External System Prerequisites diagram')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <ul class="list-disc space-y-2 pl-6 text-base text-text-secondary">
            <li>
              <strong class="text-text-primary" data-i18n-skip>ERP</strong>:
              ${i18n.getMessage(
                'this lab will use an SAP system with either BAPI/RFC or OData endpoints, already configured for this exercise.'
              )}
            </li>
            <li>
              <strong class="text-text-primary"
                >${i18n.getMessage('Cloud Data Warehouse')}</strong
              >:
              ${i18n.getMessage(
                'Snowflake will be the cloud data warehouse used in this lab, with key-pair authentication already configured.'
              )}
            </li>
            <li>
              <strong class="text-text-primary"
                >${i18n.getMessage('Document Storage')}</strong
              >:
              ${i18n.getMessage(
                'SharePoint will be the target of External Content Connectors (XCC), indexed by ServiceNow as an additional data source.'
              )}
            </li>
            <li>
              <strong class="text-text-primary"
                >${i18n.getMessage('Expense Event API')}</strong
              >:
              ${i18n.getMessage(
                'a mock endpoint that can be simulated using services such as beeceptor.com.'
              )}
            </li>
          </ul>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('User interaction layer')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'The end user will interact with Workspace, Employee Center, or an MCP Client (e.g., Claude Code or Desktop). These three interfaces will be the end test scenario for the lab exercises.'
            )}
          </p>
          <figure>
            <img
              src="${asset('dataflow_user_interaction.png')}"
              alt="${i18n.getMessage('User Interaction Layer diagram')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('ServiceNow Workflow Data Fabric')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'The diagram below shows the various ServiceNow components that interact with the external systems while working in the back end to provide the data and automation needed by users.'
            )}
          </p>
          <figure>
            <img
              src="${asset('dataflow_backend_components.png')}"
              alt="${i18n.getMessage('ServiceNow Workflow Data Fabric backend components diagram')}"
              class="w-full rounded-xl border border-base-300"
            />
            <figcaption class="text-sm text-text-tertiary">
              ${i18n.getMessage('Color Legend:')} 🟡
              ${i18n.getMessage('Now Assist')} | 🟢
              ${i18n.getMessage('Platform')} | 🟣
              ${i18n.getMessage('Workflow Data Fabric')}
            </figcaption>
          </figure>

          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div class="aiux-card bg-base-100 shadow-sm">
              <div class="aiux-card-body">
                <h5 class="aiux-card-title text-base">
                  ${i18n.getMessage('Data Integration Layer and Zero Copy Tables')}
                </h5>
                <ul class="list-disc space-y-1 pl-5 text-sm text-text-secondary">
                  <li>
                    ${i18n.getMessage(
                      'Integration Hub accesses the REST API data via a periodic trigger.'
                    )}
                  </li>
                  <li>
                    ${i18n.getMessage(
                      'Zero Copy Connector for ERP gets cost center master data from SAP.'
                    )}
                  </li>
                  <li>
                    ${i18n.getMessage(
                      'Zero Copy Connector for SQL connects to the Snowflake data assets: Cost Center History, Expenses, and Summary.'
                    )}
                  </li>
                  <li>
                    ${i18n.getMessage(
                      'External Content Connector accesses indexed SharePoint documents.'
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <div class="aiux-card bg-base-100 shadow-sm">
              <div class="aiux-card-body">
                <h5 class="aiux-card-title text-base">
                  ${i18n.getMessage('ServiceNow Native Tables')}
                </h5>
                <ul class="list-disc space-y-1 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong class="text-text-primary"
                      >${i18n.getMessage('Expense Event Table')}</strong
                    >:
                    ${i18n.getMessage(
                      'a scoped table that obtains expense events via REST API.'
                    )}
                  </li>
                  <li>
                    <strong class="text-text-primary"
                      >${i18n.getMessage('Finance Case Table')}</strong
                    >:
                    ${i18n.getMessage(
                      'the standard sn_spend_sdc_service_request table updated by Flows and Agents.'
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <div class="aiux-card bg-base-100 shadow-sm">
              <div class="aiux-card-body">
                <h5 class="aiux-card-title text-base">
                  ${i18n.getMessage('AI & Automation')}
                </h5>
                <ul class="list-disc space-y-1 pl-5 text-sm text-text-secondary">
                  <li>
                    ${i18n.getMessage(
                      'A scoped Flow and Action get expense data from a REST API source.'
                    )}
                  </li>
                  <li>
                    ${i18n.getMessage(
                      'MCP lets ServiceNow act as a data source for clients like Claude Desktop, or as a client connecting to MCP-based services.'
                    )}
                  </li>
                  <li>
                    ${i18n.getMessage(
                      'RAG grounds Now Assist responses in your actual ServiceNow local and integrated data.'
                    )}
                  </li>
                  <li>
                    ${i18n.getMessage(
                      'Proactive Budget Alert and Over-Budget Case Creator agents assess cost center history and create the appropriate Finance Case.'
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <div class="aiux-card bg-base-100 shadow-sm">
              <div class="aiux-card-body">
                <h5 class="aiux-card-title text-base">
                  ${i18n.getMessage('AI Experiences')}
                </h5>
                <ul class="list-disc space-y-1 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong class="text-text-primary"
                      >${i18n.getMessage('ServiceNow Lens')}</strong
                    >:
                    ${i18n.getMessage(
                      'scans and extracts data from on-screen sources like receipts or screenshots.'
                    )}
                  </li>
                  <li>
                    <strong class="text-text-primary"
                      >${i18n.getMessage('Document Intelligence')}</strong
                    >:
                    ${i18n.getMessage(
                      'extracts, classifies, and processes data from scanned or digital documents.'
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Overall data flow')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'The diagram below is further decomposed in each lab exercise, which has its own individual, more detailed data flow. As mentioned earlier, the end user interacts with Employee Center, an MCP Client, or in more technical scenarios, AI Control Tower.'
            )}
          </p>
          <figure>
            <img
              src="${asset('dataflow_complete_landscape.png')}"
              alt="${i18n.getMessage('Workflow Data Fabric complete landscape diagram')}"
              class="w-full rounded-xl border border-base-300"
            />
            <figcaption class="text-sm text-text-tertiary">
              ${i18n.getMessage('Color Legend:')} 🟡
              ${i18n.getMessage('Now Assist')} | 🟢
              ${i18n.getMessage('Platform')} | 🟣
              ${i18n.getMessage('Workflow Data Fabric')} | 🔵
              ${i18n.getMessage('External Systems')} | ⚪
              ${i18n.getMessage('User Interaction')}
            </figcaption>
          </figure>
        </section>

        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
