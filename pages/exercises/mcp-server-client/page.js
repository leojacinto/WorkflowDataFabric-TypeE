import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../../utils/document-title.js';

const CONFIGURE_CLIENT_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type AI Agent Studio, then click Settings.'
      ),
    image: 'sc_mcp_agent_studio_settings_nav (3).png'
  },
  {
    text: () =>
      i18n.getMessage('Go to Manage MCP Servers, then click New.'),
    image: 'sc_mcp_manage_servers_new.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Name: Neon MCP Lab. Authentication type: API Key. URL: https://mcp.neon.tech/mcp. API Key: Bearer <key obtained via the credential link>, with the word "Bearer" as a prefix. Click Add.'
      ),
    image: 'sc_mcp_add_neon_server_details.png'
  }
];

const CONFIGURE_AGENT_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type AI Agent Studio, then click Create and Manage.'
      ),
    image: 'sc_common_agent_studio_create_manage.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to the AI agents tab, click Conditions, set Field = Name, Operator = is, Value = Forecast Variance, hit Enter, then click the result.'
      ),
    image: 'sc_zcc_agent_studio_search.png'
  },
  {
    text: () => i18n.getMessage('Click Forecast Variance.'),
    image: 'sc_zcc_forecast_variance_agent.png'
  },
  {
    text: () =>
      i18n.getMessage('Click the overflow menu, then Duplicate.'),
    image: 'sc_mcp_duplicate_agent_menu.png'
  },
  {
    text: () =>
      i18n.getMessage('Confirm the duplication by clicking Duplicate.'),
    image: 'sc_mcp_duplicate_confirm.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'In the new agent, rename it to "Forecast Variance Neon MCP Lab".'
      ),
    image: 'sc_mcp_rename_agent_neon.png'
  }
];

const MCP_TOOL_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'In Define the Specialty > Define the role and Required steps > List of steps, after the paragraph starting with "Get cost center obtained in...", add: "Also run the MCP tool \'Get Details via Neon MCP\' as a secondary check. Only return one entry (limit = 1). Columns should be [\'COST_CENTER\', \'ACTUAL_AMOUNT_USD\', \'BASELINE_AMOUNT_USD\', \'VARIANCE\', \'VARIANCE_PCT\']".'
      ),
    image: 'sc_mcp_define_role_neon_step.png'
  },
  {
    text: () => i18n.getMessage('Click Save and Continue.'),
    image: 'sc_mcp_save_and_continue.png'
  },
  {
    text: () =>
      i18n.getMessage('Go to Add tools and information, Add tool, MCP server tool.'),
    image: 'sc_mcp_add_tool_neon.png'
  },
  {
    text: () =>
      i18n.getMessage('In the pop-up dropdown, select Neon MCP.'),
    image: 'sc_mcp_select_neon.png'
  },
  {
    text: () => i18n.getMessage('Select the tool run_sql.'),
    image: 'sc_mcp_variance_baseline_neon.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Set Name to "Get Details via Neon MCP"; Tool description with projectId "shy-base-71725149" (camelCase) and the SQL query selecting cost_center, actual_amount_usd, baseline_amount_usd, variance, and variance_pct from VARIANCE_BASELINE_V filtered by cost_center, limit 1; Execution mode: Autonomous. Click Save.'
      ),
    image: 'sc_mcp_tool_settings_neon.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'The pop-up exits, showing the Model Context Protocol tools section.'
      ),
    image: 'sc_mcp_tools_section_neon.png'
  },
  {
    text: () => i18n.getMessage('Click Save and Continue.'),
    image: 'sc_common_save_and_continue (1).png'
  }
];

const COMPLETE_CONFIG_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Since this is duplicated from an existing agent, accept the default values for Define security controls and its sub-items, and keep Add triggers blank.'
      ),
    image: 'sc_mcp_security_defaults.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Select channels and status. Enable Now Assist panel and add Now Assist in Virtual Agent as chat assistant, then click Save and test.'
      ),
    image: 'sc_mcp_channels_status_neon.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'You might be alerted of potential duplicates due to multiple test agents. Click Ignore and continue.'
      ),
    image: 'sc_mcp_duplicate_warning.png'
  }
];

const TEST_AGENT_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'In the Test AI reasoning tab, type "Help me process EXP-2025-IT-002-1007-01" then click Continue to Test Chat Response.'
      ),
    image: 'sc_mcp_test_input.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'The test runs and shows it executing the "Get Details in Neon MCP" tool you created.'
      ),
    image: 'sc_mcp_test_running_neon.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'The tool returns the closest match for cost center CC_IT_001, using only a high-level instruction — no SQL or API call was hand-written.'
      ),
    image: 'sc_mcp_test_results_neon.png'
  }
];

@customElement('x-snc-wdf-lab-mcp-server-client-page')
export default class McpServerClientPage extends AIUXElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100%;
      container-type: inline-size;
    }
    figure {
      margin: 0;
    }
  `;

  firstUpdated() {
    setDocumentTitle(
      i18n.getMessage('Lab Exercise: Model Context Protocol Server/Client')
    );
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path => `${basePath.replace(/^\/aiux/, '')}/public/wdf/mcp-server-client/${path}`;

    const renderSteps = steps => html`
      <ol class="list-decimal space-y-4 pl-6 text-base text-text-secondary">
        ${steps.map(
          step => html`
            <li>
              ${step.text()}
              ${step.image
                ? html`<figure class="mt-2">
                    <img
                      src="${asset(step.image)}"
                      alt=""
                      class="max-w-lg rounded-xl border border-base-300"
                    />
                  </figure>`
                : null}
            </li>
          `
        )}
      </ol>
    `;

    return html`
      <div class="mx-auto flex max-w-4xl flex-col gap-8 p-4 lg:p-8">
        <header class="flex flex-col gap-2">
          <span class="aiux-badge aiux-badge-primary aiux-badge-outline w-fit">
            ${i18n.getMessage('Extended Exercises')}
          </span>
          <h2 class="text-3xl font-bold text-text-primary">
            ${i18n.getMessage(
              'Lab Exercise: Model Context Protocol Server/Client'
            )}
          </h2>
          <div class="flex flex-wrap gap-2">
            <span class="aiux-badge aiux-badge-warning aiux-badge-soft"
              >${i18n.getMessage('Intermediate')}</span
            >
            <span class="aiux-badge aiux-badge-ghost"
              >${i18n.getMessage('AI agents involved')}</span
            >
            <span class="aiux-badge aiux-badge-ghost"
              >${i18n.getMessage('1 hour')}</span
            >
          </div>
        </header>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Where we are in this workshop')}
          </h3>
          <figure>
            <img
              src="${asset('dataflow_outcome_agent_flow_mcp.png')}"
              alt="${i18n.getMessage('MCP focus: External DB to External MCP Server')}"
              class="w-full rounded-xl border border-base-300"
            />
            <figcaption class="mt-2 text-sm text-text-tertiary">
              ${i18n.getMessage('Legend:')} 🟤 ${i18n.getMessage('Data')} |
              🟣 ${i18n.getMessage('Workflow Data Fabric')} | 🔵
              ${i18n.getMessage('External Systems')} | ↓
              ${i18n.getMessage('Takes data from')}
            </figcaption>
          </figure>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'This lab walks you through the configuration and usage of MCP (Model Context Protocol) capabilities to interact with ServiceNow either as a client or as a server. This lab covers ServiceNow acting as an MCP Client; MCP Server scenarios will be added later.'
            )}
          </p>
          <figure>
            <img
              src="${asset('sc_slide_mcp_overview.png')}"
              alt="${i18n.getMessage('MCP overview slide')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <figure>
            <img
              src="${asset('sc_slide_mcp_demo_preview.png')}"
              alt="${i18n.getMessage('MCP demo preview slide')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Specifically, this covers connecting ServiceNow to an MCP Server tool configured in Neon. Creating the MCP Service in Neon itself is not covered, as it requires administrator rights and Cloud Data Warehouse expertise not widely available to every persona.'
            )}
          </p>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Data flow')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'ServiceNow provides MCP client and server capabilities to interact with external systems.'
            )}
          </p>
          <figure>
            <img
              src="${asset('dataflow_mcp.png')}"
              alt="${i18n.getMessage('MCP data flow diagram')}"
              class="w-full rounded-xl border border-base-300"
            />
            <figcaption class="mt-2 text-sm text-text-tertiary">
              ${i18n.getMessage('Color Legend:')} 🟡
              ${i18n.getMessage('Now Assist')} | 🟢
              ${i18n.getMessage('Platform')} | 🟣
              ${i18n.getMessage('Workflow Data Fabric')} | 🔵
              ${i18n.getMessage('External Systems')} | ⚪
              ${i18n.getMessage('User Interaction')}
            </figcaption>
          </figure>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('MCP Client Configuration')}
          </h3>
          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-on: Configure MCP Client')}
          </h4>
          ${renderSteps(CONFIGURE_CLIENT_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('AI Agent Configuration')}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-On: Configure new AI Agent for MCP scenario')}
          </h4>
          ${renderSteps(CONFIGURE_AGENT_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-On: Configure MCP Step and Tool')}
          </h4>
          ${renderSteps(MCP_TOOL_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Walkthrough: Complete AI Agent configuration')}
          </h4>
          ${renderSteps(COMPLETE_CONFIG_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('AI Agent Testing')}
          </h3>
          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-on: Test and review Custom AI Agent')}
          </h4>
          ${renderSteps(TEST_AGENT_STEPS)}
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Challenge: once done, see if you can remove the Extract Cost Center tool and replace it entirely with Get Details via Neon MCP.'
            )}
          </p>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Conclusion')}
          </h3>
          <div class="aiux-alert aiux-alert-success aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Congratulations! You have created the MCP Server integrations that let ServiceNow use MCP capabilities from other systems, enabling LLM-powered integrations as an alternative to APIs that require more development.'
              )}
            </span>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Next step')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Explore a bonus use case that uses Stream Connect for Apache Kafka for integrations that require more throughput and data volume.'
            )}
          </p>
          <a
            class="aiux-btn aiux-btn-primary w-fit"
            href="${basePath}/exercises/kafka-stream-connect"
          >
            ${i18n.getMessage('Continue to Stream Connect for Apache Kafka')}
          </a>
        </section>



        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
