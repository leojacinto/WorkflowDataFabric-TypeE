import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../../utils/document-title.js';

const PLATFORM_CONFIG_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'If you have not done the Integration Hub exercise yet, complete its Platform Configuration steps first.'
      ),
    image: null
  },
  {
    text: () => i18n.getMessage('Make sure you are logged in as admin.'),
    image: null
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
        'Search for sn_erp_integration.erp_admin, click it, move it to the right panel, then Save.'
      ),
    image: 'sc_zcc_roles_erp_admin_save.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'You will get messages such as "Adding Role decision_table_reader to admin" (4 of them). Right-click the top panel and click Save.'
      ),
    image: 'sc_zcc_role_messages_save.png'
  },
  {
    text: () => i18n.getMessage('IMPORTANT: log out and log back in.'),
    image: 'sc_common_logout.png',
    critical: true
  }
];

const ERP_WORKSPACE_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type Zero Copy Connector for ERP Home, then click it.'
      ),
    image: 'sc_zcc_erp_home_nav.png'
  },
  {
    text: () =>
      i18n.getMessage('The Zero Copy Connector for ERP Home workspace layout.'),
    image: 'sc_zcc_erp_home_layout.png'
  }
];

const CLONE_DP_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Click Models (database icon), Model Name, the overflow menu, type DP: Cost Center, then click Apply. We will replicate the structure of this out-of-the-box data model.'
      ),
    image: 'sc_zcc_models_filter_cost_center.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click DP: Cost Center (Data Product: Cost Center (Function Call)).'
      ),
    image: 'sc_zcc_dp_cost_center_click.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'A popup indicates this is an ERP Data Product delivered as an out-of-the-box template and cannot be edited. Click Clone to create a copy.'
      ),
    image: 'sc_zcc_clone_popup.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Provide the label as SAP Cost Center Lab; the Target application should be Forecast Variance. Click Clone this model.'
      ),
    image: 'sc_zcc_clone_model_details.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Assign the ERP system name as S4D, then click Save — this ties your model to an ERP system integrated via Connections & Credentials. Then click Manage model.'
      ),
    image: 'sc_zcc_model_config_save.png'
  }
];

const BAPI_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Click Read to use a read-only operation configured in the model. ZCC for ERP models can also perform Update and Create actions.'
      ),
    image: 'sc_zcc_click_read.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'The BAPI_COSTCENTER_GETDETAIL1 entity is already configured in the cloned model — no action needed. Other ways to obtain master data include RFC table reads or OData endpoints.'
      ),
    image: 'sc_zcc_bapi_configured.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Specify Inputs. No action needed — this shows what can be configured as selection fields when extracting from the ERP system.'
      ),
    image: 'sc_zcc_specify_inputs.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Choose outputs. No action needed — this shows what can be configured as the extraction output.'
      ),
    image: 'sc_zcc_choose_outputs.png'
  }
];

const EXTRACTION_TABLE_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Go to Extraction tables (Sankey diagram icon), Name, the overflow menu, type SAP Cost Center, then click Apply. Extraction tables persist ERP model data as an alternative to reading via Zero Copy — useful for high-volume or infrequently-updated tables.'
      ),
    image: 'sc_zcc_extraction_tables_filter.png'
  },
  {
    text: () => i18n.getMessage('Click SAP Cost Center.'),
    image: 'sc_zcc_sap_cost_center_click.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'A notification confirms the object is in the Zero Copy Connector for ERP application (expected). The ERP model used here (SAP Material Transfer Cost Center) differs because this lab is not connected to a live SAP system. Click the Target table link, sn_erp_integration_cost_center_list.do.'
      ),
    image: 'sc_zcc_target_table_link.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'This leads to the extraction table containing Cost Center Master Data from SAP.'
      ),
    image: 'sc_zcc_cc_target_table_list.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Congratulations! You have set up the integration to an ERP system using Zero Copy Connector for ERP.'
      ),
    image: null
  }
];

const WDF_HUB_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'On Zurich: navigate to All, type Workflow Data Fabric Hub, then go to Workflow Data Fabric Hub.'
      ),
    image: 'sc_zcc_wdf_hub_nav_zu.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'On Australia: navigate to All, type Workflow Data Fabric Hub, then go to Workflow Data Fabric > Connect Hub.'
      ),
    image: 'sc_zcc_wdf_hub_nav_au.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'On the landing page, go to Established connections > Snowflake Connection (S). Note: this connection is configured specifically for ServiceNow-led lab instances.'
      ),
    image: 'sc_zcc_snowflake_established.png'
  },
  {
    text: () =>
      i18n.getMessage(
        "In Connection details, the established connection is shown. No action needed. A notification about read-only access in the Forecast Variance scope can be ignored."
      ),
    image: 'sc_zcc_connection_details.png'
  }
];

const COLUMN_MAPPING_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Go to Data assets, and beside u_lab_cc_summary click Create data fabric table.'
      ),
    image: 'sc_zcc_data_assets_create.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Provide the Label (e.g. cc_summ_<your initials>); the Name auto-populates — keep it under 35 characters (e.g. x_snc_forecast_v_0_df_cc_summ_lfr). Click Continue. This creates a data fabric table containing only field/mapping information, not a copy of the Snowflake data.'
      ),
    image: 'sc_zcc_df_table_label.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Tick the box beside Name to include all fields from the Snowflake data asset.'
      ),
    image: 'sc_zcc_select_all_columns.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Find the Cost center column, change its data type from String to Reference, then click Reference to set the table it points to. A Reference field keeps data consistent by pointing to a record in an existing table.'
      ),
    image: 'sc_zcc_cost_center_reference.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'In the modal, select the table sn_erp_integration_cost_center you set up in the ZCC for ERP exercise.'
      ),
    image: 'sc_zcc_reference_table.png'
  },
  {
    text: () => i18n.getMessage('In the same modal, select Cost Center.'),
    image: 'sc_zcc_reference_key.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Set Reference. This creates the reference to the cost center details from SAP.'
      ),
    image: 'sc_zcc_reference_label.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Set GL account as the Primary key toggle, then click Finish.'
      ),
    image: 'sc_zcc_gl_primary_key_finish.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'A dialog confirms the primary key. Click Confirm — a primary key distinguishes unique records from the source warehouse.'
      ),
    image: 'sc_zcc_confirm_pk.png'
  }
];

const OPEN_TABLE_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'On the data assets screen, click the overflow menu, then Open list to see the table contents.'
      ),
    image: 'sc_zcc_data_assets_open_list.png'
  },
  {
    text: () => i18n.getMessage('This leads to the data fabric table.'),
    image: 'sc_zcc_df_table_result.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Congratulations! You have set up the integration to a Cloud Data Warehouse using Zero Copy Connector for SQL.'
      ),
    image: null
  }
];

const AGENT_WALKTHROUGH_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Go to All, type x_snc_forecast_v_0_expense_transaction_event.list, and hit Enter.'
      ),
    image: 'sc_common_expense_event_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'This is the table created in Fundamentals and populated with data from the Integration Hub exercise.'
      ),
    image: 'sc_zcc_expense_event_list.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type AI Agent Studio, then click Create and Manage.'
      ),
    image: 'sc_zcc_agent_studio_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to the AI agents tab, click Conditions, set Field = Name, Operator = is, Value = Forecast Variance, hit Enter, then click the result.'
      ),
    image: 'sc_zcc_agent_studio_search.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Define the specialty. This shows all instructions for this AI Agent in plain English. No action required.'
      ),
    image: 'sc_zcc_define_specialty.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Add tools and information — Extract Cost Center, Search Cost Center History, Search for Expense Transactions History, and Budget Variance Analysis.'
      ),
    image: 'sc_zcc_add_tools_info.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Under Define security controls, click Define data access, select Dynamic user, and add admin as the approved role.'
      ),
    image: 'sc_zcc_define_security.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Define trigger, which is kept blank — for this exercise the AI Agent is triggered manually so you can see the detailed chat responses and debugging.'
      ),
    image: 'sc_zcc_define_trigger_blank.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Select channels and status. Enable Now Assist panel and Now Assist in Virtual Agent, then click Save and test.'
      ),
    image: 'sc_zcc_select_channels_save.png'
  }
];

const TEST_AGENT_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'In the Test AI reasoning tab, type "Help me process EXP-2025-IT-002-1007-01" then click Continue to Test Chat Response.'
      ),
    image: 'sc_zcc_test_input.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Wait for the test to complete (End with a check mark). Expand Planning the next steps; note the cost_center and vendor extracted; review the RAG search results for cost center and vendor; and, if the cost center goes over budget, the Finance Case created (e.g. FINC0010003).'
      ),
    image: 'sc_zcc_test_results_overview.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'The right panel shows the AI agent decision logs for debugging.'
      ),
    image: 'sc_zcc_decision_logs.png'
  }
];

const VERIFY_CASE_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to Workspaces, type Finance Operations Workspace, and click on it.'
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
        'Go to Lists, sort by Number, and look for the Finance Case created by the AI Agent (e.g. FINC0010003).'
      ),
    image: 'sc_zcc_finance_case_list.png'
  }
];

@customElement('x-snc-wdf-lab-zero-copy-connectors-page')
export default class ZeroCopyConnectorsPage extends AIUXElement {
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
    setDocumentTitle(i18n.getMessage('Lab Exercise: Zero Copy Connectors'));
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path => `${basePath.replace(/^\/aiux/, '')}/public/wdf/zero-copy-connectors/${path}`;

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
            ${i18n.getMessage('Lab Exercise: Zero Copy Connectors')}
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
              src="${asset('dataflow_outcome_agent_flow_zero_copy.png')}"
              alt="${i18n.getMessage(
                'Zero Copy Connectors focus: Cost Center and Expense data from CDW and ERP'
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
              'This lab walks you through integrating data from Cloud Data Warehouses and ERP using Zero Copy Connectors (ZCC) for SQL and ERP respectively.'
            )}
          </p>
          <figure>
            <img
              src="${asset('sc_slide_zerocopy_overview.png')}"
              alt="${i18n.getMessage('Zero Copy Connectors overview slide')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <figure>
            <img
              src="${asset('sc_slide_zerocopy_how_it_works.png')}"
              alt="${i18n.getMessage('How Zero Copy Connectors work slide')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <figure>
            <img
              src="${asset('sc_slide_zerocopy_demo_preview.png')}"
              alt="${i18n.getMessage('Zero Copy Connectors demo preview slide')}"
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
              'ServiceNow consumes data from the local Expense Transaction Event table populated by REST API events, and also consumes external data from a Cloud Data Warehouse and an ERP system via ZCC for SQL and ERP. An agent uses this data to create Finance Cases for cost centers going over budget, enriched by AI-agent searches comparing expenses and cost center histories.'
            )}
          </p>
          <div class="aiux-alert aiux-alert-info aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Note: future versions of this lab will include ServiceNow Enterprise Graph for universal query across internal and external data sources. As of this lab, that feature is not yet globally available.'
              )}
            </span>
          </div>
          <figure>
            <img
              src="${asset('dataflow_zero_copy_connectors.png')}"
              alt="${i18n.getMessage('Zero Copy Connectors data flow diagram')}"
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
            ${i18n.getMessage('Preparation: Platform Configuration')}
          </h4>
          ${renderSteps(PLATFORM_CONFIG_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Zero Copy Connector for ERP')}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Walkthrough: Explore ZCC for ERP Workspace')}
          </h4>
          ${renderSteps(ERP_WORKSPACE_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage(
              'Hands-on: Clone ERP Data Product for Cost Center'
            )}
          </h4>
          ${renderSteps(CLONE_DP_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Walkthrough: Explore ZCC for ERP BAPI Entity')}
          </h4>
          ${renderSteps(BAPI_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage(
              'Walkthrough: Explore ZCC for ERP Extraction Tables'
            )}
          </h4>
          ${renderSteps(EXTRACTION_TABLE_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Zero Copy Connector for SQL')}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Reference: Cloud Data Warehouse Source')}
          </h4>
          <figure>
            <img
              src="${asset('sc_zcc_snowflake.png')}"
              alt="${i18n.getMessage(
                'Snowflake source table used for Zero Copy for SQL'
              )}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage(
              'Walkthrough: Navigation and Review of ZCC Connection'
            )}
          </h4>
          ${renderSteps(WDF_HUB_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-on: Configure Column Mappings')}
          </h4>
          ${renderSteps(COLUMN_MAPPING_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Walkthrough: Open Data Fabric Table')}
          </h4>
          ${renderSteps(OPEN_TABLE_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('AI Agent and Finance Operations Workspace')}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage(
              'Walkthrough: Custom Forecast Variance AI Agent'
            )}
          </h4>
          <div class="aiux-alert aiux-alert-warning aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Note: this is a custom AI agent pre-configured in the lab instance provided in ServiceNow-led lab sessions — it is not a pre-built agent.'
              )}
            </span>
          </div>
          ${renderSteps(AGENT_WALKTHROUGH_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage(
              'Hands-on: Test and review Custom AI Agent'
            )}
          </h4>
          ${renderSteps(TEST_AGENT_STEPS)}

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
                'Congratulations! You have created the Workflow Data Fabric integrations that power the Financial Forecast Variance Agent, allowing proactive creation of cases based on multiple data sources in a complex landscape.'
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
              'Let us continue building the data foundations for AI Agents to use. The next suggested exercise is the creation of the External Content Connector to SharePoint.'
            )}
          </p>
          <a
            class="aiux-btn aiux-btn-primary w-fit"
            href="${basePath}/exercises/external-content-connector"
          >
            ${i18n.getMessage('Continue to External Content Connector')}
          </a>
        </section>



        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
