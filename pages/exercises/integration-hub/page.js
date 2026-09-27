import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../../utils/document-title.js';

// Each step is a () => i18n.getMessage('<literal>') getter (see toc.js for
// why: the build's extractor only captures string literals passed directly
// to getMessage(), so the literal has to stay inline with its own call).
const LLM_CONFIG_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type Now Assist Admin, then click Settings.'
      ),
    image: 'image.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to Manage AI models > Manage model Providers, then click Model providers (takes ~2 minutes to load) and check whether the Current Model Provider is NOT Azure OpenAI. If it is not, click Edit model provider; otherwise skip to Platform Configuration.'
      ),
    image: 'image (1).png'
  },
  {
    text: () =>
      i18n.getMessage(
        'In the drop-down, select Azure OpenAI, then click Save and Activate.'
      ),
    image: 'image (2).png'
  },
  {
    text: () =>
      i18n.getMessage(
        'It will take ~3-5 minutes to reassign the services. Some services may fail to reassign — this can be ignored. Click Okay.'
      ),
    image: 'image (3).png'
  },
  {
    text: () =>
      i18n.getMessage(
        'The Model provider column will show that assignment is mostly Azure OpenAI.'
      ),
    image: 'image (4).png'
  }
];

const PLATFORM_CONFIG_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'As admin user, this preparation section includes setting up the scope, authorization, and Now Assist configurations.'
      ),
    image: null
  },
  {
    text: () =>
      i18n.getMessage(
        'Ensure you are in the correct scope. Click the scope (globe icon) and Forecast Variance, WITHOUT your initials.'
      ),
    image: 'sc_fund_exercise_scope.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type Users and Groups, then click Users and Groups > Users.'
      ),
    image: 'sc_common_agent_studio_users_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Search for System Administrator, hit Enter, then click on admin.'
      ),
    image: 'sc_common_search_admin_user.png'
  },
  {
    text: () => i18n.getMessage('In the Roles tab, click Edit.'),
    image: 'sc_common_roles_tab_edit.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Search for sn_aia.admin, click it, move it to the right panel, then Save. Note: there are also integration and viewer roles for users who need less privilege.'
      ),
    image: 'sc_ihub_roles_sn_aia_save.png'
  },
  {
    text: () => i18n.getMessage('Right-click the top panel and click Save.'),
    image: 'sc_xcc_prep_save.png'
  },
  {
    text: () => i18n.getMessage('IMPORTANT: log out and log back in.'),
    image: 'sc_common_logout.png',
    critical: true
  }
];

const INITIAL_CHECK_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'If the Now Assist Panel is set up correctly, you should see the Now Assist icon on the top right.'
      ),
    image: 'sc_ihub_now_assist_panel.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Ensure you are in the correct scope. Click the scope (globe icon) and Forecast Variance, WITHOUT your initials.'
      ),
    image: 'sc_fund_exercise_scope.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to All, type x_snc_forecast_v_0_expense_transaction_event.list, and hit Enter. Ensure it is empty.'
      ),
    image: 'sc_common_expense_event_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'This list SHOULD be EMPTY for the AI agent to work. If not, select all rows via the top-rightmost checkbox, click Action on selected rows, then Delete twice.'
      ),
    image: 'sc_ihub_expense_event_delete.png'
  }
];

const CONNECTION_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type Connection & Credential Aliases, then click Connections & Credentials > Connection & Credential Aliases.'
      ),
    image: 'sc_common_conn_cred_aliases_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Search for Get Expense Event, then click on it. This is a pre-configured alias to reduce rewiring needed for this exercise.'
      ),
    image: 'sc_ihub_search_get_expense_event.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Navigate to Connections > New. This creates a new connection that gets data from the REST API endpoint and serves as the trigger for the AI Agent.'
      ),
    image: 'sc_ihub_connections_new.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Provide Name as Get Expense Event, Connection URL as https://wdflab.servicenow.workers.dev, then click Submit. The Fundamentals table structure is based on the data coming from this endpoint.'
      ),
    image: 'sc_ihub_connection_url_submit.png'
  }
];

const AGENT_WALKTHROUGH_STEPS = [
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
        'Go to the AI agents tab, click Conditions, set Field = Name, Operator = is, Value = Forecast Variance Integration Hub Trigger, then hit Enter and click the result.'
      ),
    image: 'sc_ihub_ai_studio_search.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Define the specialty. This shows all instructions for this AI Agent in plain English — the sequence, purpose, and nuances of the tools configured. No action required.'
      ),
    image: 'sc_ihub_define_specialty.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Add tools and information — a collection of Search retrievals and Subflows the agent uses: Extract Event ID, Extract Cost Center, Search Cost Center History, Search for Expense Transactions History, and Budget Variance Analysis (which creates a Finance Case if over budget).'
      ),
    image: 'sc_ihub_add_tools_info.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Under Define security controls, click Define data access, select Dynamic user, then add admin as the Approved role if not already filled in.'
      ),
    image: 'sc_ihub_define_security.png'
  }
];

const TRIGGER_STEPS = [
  {
    text: () => i18n.getMessage('Click Define trigger.'),
    image: 'sc_ihub_define_trigger_view.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'CRITICAL: due to a lab update-set bug, if a trigger already exists you must delete it and re-create it. Click delete, then Add trigger.'
      ),
    image: 'sc_ihub_trigger_delete_add.png',
    critical: true
  },
  {
    text: () =>
      i18n.getMessage(
        'Select trigger: Created. Name: Create New Expense Transaction Event <YOUR INITIALS>. Toggle Trigger ON. Scroll down.'
      ),
    image: 'sc_ihub_trigger_details_1.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Table: Expense Transaction Event. Field: Vendor. Condition operator: is not empty. Sys_user: Owner. Click Save.'
      ),
    image: 'sc_ihub_trigger_details_2.png'
  },
  {
    text: () => i18n.getMessage('Click Save and Continue.'),
    image: 'sc_common_save_and_continue (1).png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Select channels and status. Enable Now Assist panel and add Now Assist in Virtual Agent as chat assistant, then click Save. Keep this browser window open — you will need it again later.'
      ),
    image: 'sc_ihub_select_channels.png'
  }
];

const ACTION_WALKTHROUGH_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type Flow Designer, go to Process Automation > Flow Designer. This opens in a new tab.'
      ),
    image: 'sc_ihub_flow_designer_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'In Flow Designer, click Actions, then the overflow menu, type Get Expense Event, then click Apply.'
      ),
    image: 'sc_ihub_action_search.png'
  },
  {
    text: () =>
      i18n.getMessage('Click Get Expense Event. Note: this might take a while to load.'),
    image: 'sc_ihub_action_list.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Get Expense Event. The Base URL comes from a service that creates the expense event, and the Imported Specifications are generated from the same service. No action needed.'
      ),
    image: 'sc_ihub_action_details.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to Outputs, where output is generated based on the Imported Specifications. This is why the Fundamentals table structure matters — mismatched fields will cause this Action to fail.'
      ),
    image: 'sc_ihub_action_output.png'
  }
];

const FLOW_EXECUTION_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'In the current browser window, click Workflow Studio to go back to the application home.'
      ),
    image: 'sc_ihub_home.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'In Flow Designer, click Subflows, the overflow menu, type Get Expense Event, then click Apply.'
      ),
    image: 'sc_ihub_flow_search.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'This leads to the subflow. It uses the Get Expense Event Action to update the Transaction Event Record table.'
      ),
    image: 'sc_ihub_get_expense_event.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'On the top right of the Subflow screen, click Test. This runs an actual execution against the REST API endpoint.'
      ),
    image: 'sc_ihub_test_flow.png'
  },
  {
    text: () => i18n.getMessage('A pop-up appears. Click Run Test.'),
    image: 'sc_ihub_test_run.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'After a few seconds, a link appears: "Your test has finished running. View the subflow execution details." Click it.'
      ),
    image: 'sc_ihub_test_link.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'If everything worked, all steps show Completed or Evaluated - True.'
      ),
    image: 'sc_ihub_test_results.png'
  }
];

const AGENT_RUNTIME_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Go back to the AI Agent Studio browser window. A new Now Assist badge appears — the AI agent reacting to the change in the Expense Transaction Event table. Click the Now Assist icon. If the badge does not appear, reload the page; in some cases it will not load at all, so just open Now Assist and look for new chats.'
      ),
    image: 'sc_ihub_now_assist_badge_notification.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'This opens the Now Assist chat. Click the two-headed diagonal arrow to enter Modal view.'
      ),
    image: 'sc_ihub_now_assist_chat_expand.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Review the executed steps: expand Planning the next steps to see tools used; note the event ID, cost_center, and vendor extracted; review the RAG search results for the cost center and vendor; and, if the cost center goes over budget, the Finance Case created (e.g. FINC0010020). If Extract Cost Center fails, see the AI Agent Configuration section for a possible prompt fix.'
      ),
    image: 'sc_ihub_agent_results_overview.png'
  }
];

const VERIFY_CASE_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to Workspaces, type Finance Operations Workspace, and click on it. We will check if the Finance Case was created successfully.'
      ),
    image: 'sc_common_fow_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'For this exercise, we are not impersonating a persona, so you remain as the System user.'
      ),
    image: 'sc_common_fow_system_user.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to Lists, sort by Number, and look for the Finance Case created by the AI agent (e.g. FINC0010020).'
      ),
    image: 'sc_ihub_finance_case_list.png'
  }
];

@customElement('x-snc-wdf-lab-integration-hub-page')
export default class IntegrationHubPage extends AIUXElement {
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
    setDocumentTitle(i18n.getMessage('Lab Exercise: Integration Hub'));
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path => `${basePath.replace(/^\/aiux/, '')}/public/wdf/integration-hub/${path}`;

    const renderSteps = steps => html`
      <ol class="list-decimal space-y-4 pl-6 text-base text-text-secondary">
        ${steps.map(
          step => html`
            <li>
              ${step.critical
                ? html`<span
                    class="aiux-badge aiux-badge-error aiux-badge-soft mr-2"
                    >${i18n.getMessage('Critical')}</span
                  >`
                : null}
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
            ${i18n.getMessage('Main Exercises')}
          </span>
          <h2 class="text-3xl font-bold text-text-primary">
            ${i18n.getMessage('Lab Exercise: Integration Hub')}
          </h2>
          <div class="flex flex-wrap gap-2">
            <span class="aiux-badge aiux-badge-warning aiux-badge-soft"
              >${i18n.getMessage('Intermediate')}</span
            >
            <span class="aiux-badge aiux-badge-ghost"
              >${i18n.getMessage('AI agents involved')}</span
            >
            <span class="aiux-badge aiux-badge-ghost"
              >${i18n.getMessage('90 minutes')}</span
            >
          </div>
        </header>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Where we are in this workshop')}
          </h3>
          <figure>
            <img
              src="${asset(
                'dataflow_outcome_agent_flow_integration_hub.png'
              )}"
              alt="${i18n.getMessage(
                'Integration Hub focus: Expense to REST API'
              )}"
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
              'This lab walks you through the configuration and usage of Actions and Flows to get expense data from an external source periodically or ad hoc, and trigger an agent which evaluates the expense data and creates a Finance Case if the involved cost center will be over budget.'
            )}
          </p>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'There are dedicated Integration Hub and Flow Designer labs, so the focus of this exercise is to walk through the configurations in AI Agent Studio and Flow Designer, with a short exercise on configuring an Action to understand how AI Agents are triggered.'
            )}
          </p>
          <figure>
            <img
              src="${asset('sc_slide_inthub_overview.png')}"
              alt="${i18n.getMessage('Integration Hub exercise overview slide')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <figure>
            <img
              src="${asset('sc_slide_inthub_demo_preview.png')}"
              alt="${i18n.getMessage('Integration Hub demo preview slide')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Data flow')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'The data flow below shows how ServiceNow consumes REST API endpoints via Integration Hub Spokes, further processed by a Flow so the entries are written to the scoped table.'
            )}
          </p>
          <figure>
            <img
              src="${asset('dataflow_integration_hub.png')}"
              alt="${i18n.getMessage('Integration Hub data flow diagram')}"
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
            ${i18n.getMessage('Preparation')}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Preparation: LLM Configuration')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Ensure the AI model provider is Azure OpenAI so you have an experience consistent with the environment this lab was built on.'
            )}
          </p>
          ${renderSteps(LLM_CONFIG_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Preparation: Platform Configuration')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'These are required preparation steps at the platform level — cross configurations that affect instance behaviour across applications.'
            )}
          </p>
          ${renderSteps(PLATFORM_CONFIG_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Preparation: Initial Checks')}
          </h4>
          ${renderSteps(INITIAL_CHECK_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-on: Connection Setup')}
          </h4>
          ${renderSteps(CONNECTION_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('AI Agent Configuration')}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage(
              'Walkthrough: Custom Forecast Variance AI Agent'
            )}
          </h4>
          <div class="aiux-alert aiux-alert-warning aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Note: this is a custom AI agent pre-configured in the lab instance provided in ServiceNow-led lab sessions — it is not an out-of-the-box agent.'
              )}
            </span>
          </div>
          ${renderSteps(AGENT_WALKTHROUGH_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-on: Configure AI Agent Trigger')}
          </h4>
          ${renderSteps(TRIGGER_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Action and Subflow')}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Walkthrough: Action')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'The scoped Action is key for the trigger that obtains expense data via REST API. This section walks through Flow Designer > Action > Get Expense Event to understand its dependency on Connections.'
            )}
          </p>
          ${renderSteps(ACTION_WALKTHROUGH_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-on: Flow Execution')}
          </h4>
          ${renderSteps(FLOW_EXECUTION_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage(
              'AI Agent and Finance Operations Workspace'
            )}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Walkthrough: Agent Runtime')}
          </h4>
          ${renderSteps(AGENT_RUNTIME_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Completion: Verify Finance Case')}
          </h4>
          ${renderSteps(VERIFY_CASE_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Conclusion')}
          </h3>
          <div class="aiux-alert aiux-alert-success aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Congratulations! You have created the Workflow Data Fabric integrations that power the Financial Forecast Variance Agent, allowing proactive creation of cases based on multiple data sources with zero human intervention. The AI Agent is triggered as soon as there are changes in the Expense Transaction Event table.'
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
              'Let us continue building the data foundations for AI Agents to use. The next suggested exercise is a deep dive into the data integrations used by this same agent — Zero Copy.'
            )}
          </p>
          <a
            class="aiux-btn aiux-btn-primary w-fit"
            href="${basePath}/exercises/zero-copy-connectors"
          >
            ${i18n.getMessage('Continue to Zero Copy Connectors')}
          </a>
        </section>



        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
