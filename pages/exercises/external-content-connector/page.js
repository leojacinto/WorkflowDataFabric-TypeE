import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../../utils/document-title.js';

const PREP_STEPS = [
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
    text: () =>
      i18n.getMessage(
        'Set Email to demouser@wdfdemo.onmicrosoft.com, click Save, then click Roles and Edit. The email will be mapped to the SharePoint External Content Connector destination.'
      ),
    image: 'sc_xcc_prep_email_roles_edit.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Search for ais_high_security_admin, click it, move it to the right panel, then Save.'
      ),
    image: 'sc_xcc_prep_add_ais_role.png'
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

const CONNECTION_CRAWL_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Change the scope to Global via the globe icon.'
      ),
    image: 'sc_ldi_scope_global.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Elevate your role: click your user (System Administrator), then Elevate role.'
      ),
    image: 'sc_xcc_elevate_role_menu.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Select ais_high_security_admin, then click Update.'
      ),
    image: 'sc_xcc_elevate_select_ais.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type External Content Connectors, then click External Content Admin Home.'
      ),
    image: 'sc_xcc_xcc_home.png'
  },
  {
    text: () => i18n.getMessage('Click Create to create a new connection.'),
    image: 'sc_xcc_home_create.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Select SharePoint as the source, then click Next.'
      ),
    image: 'sc_xcc_select_source_sharepoint.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Provide the Connector Name, Application (client) ID, Directory (tenant) ID, JKS certificate, password, and thumbprint (obtained via the credential links in the source doc), then click Validate Connection.'
      ),
    image: 'sc_xcc_connection_config.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'A "Successfully created" message appears. Click Next.'
      ),
    image: 'sc_xcc_connection_success.png'
  },
  {
    text: () =>
      i18n.getMessage('Accept the default crawl settings and click Next.'),
    image: 'sc_xcc_crawl_settings.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'With ais_high_security_admin elevated, you can map or test permissions, or simply click Next.'
      ),
    image: 'sc_xcc_mapping_test.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Full document crawl, tick Crawl user permissions, then click Next. This can also be run separately later if missed.'
      ),
    image: 'sc_xcc_full_crawl_options.png'
  },
  {text: () => i18n.getMessage('Click Proceed.'), image: 'sc_xcc_crawl_proceed.png'},
  {
    text: () => i18n.getMessage('Accept default settings and click Save.'),
    image: 'sc_xcc_crawl_save.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'It takes ~1 minute for the User Mapping and Document crawls to complete.'
      ),
    image: 'sc_xcc_crawls_complete.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Remove your role elevation — it is no longer needed. Click your user, then Elevate role.'
      ),
    image: 'sc_xcc_elevate_role_menu.png'
  },
  {
    text: () =>
      i18n.getMessage('Deselect ais_high_security_admin, then click Update.'),
    image: 'sc_xcc_deselect_ais_role.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type Employee Center, then click Employee Center.'
      ),
    image: 'sc_xcc_employee_center_nav.png'
  }
];

const USAGE_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'This leads to the Employee Center home page. Note the "Ask Now Assist for help or search" field.'
      ),
    image: 'sc_xcc_employee_center_home.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Type: "Marketing team cost centre in France seems to have gone over-budget. Can you look for any documents that can assist in checking if there are management directives which might have triggered this?" then hit Enter.'
      ),
    image: 'sc_xcc_now_assist_query.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'You will get a detailed response based on the crawled SharePoint documents, aligned with the over-budget entries. Click result 1 and note the PDF file "Strategic Memo - European Product Launch.pdf" (no need to open it — that requires SharePoint login). Responses may vary since Now Assist is probabilistic, but the key ideas remain the same.'
      ),
    image: 'sc_xcc_response_detail.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'For reference, a screenshot of the PDF used as source for why cost center MKTG-FR-PR went over-budget.'
      ),
    image: 'sc_xcc_overbudget.png'
  }
];

@customElement('x-snc-wdf-lab-external-content-connector-page')
export default class ExternalContentConnectorPage extends AIUXElement {
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
    setDocumentTitle(i18n.getMessage('Lab Exercise: External Content Connector'));
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path => `${basePath.replace(/^\/aiux/, '')}/public/wdf/external-content-connector/${path}`;

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
            ${i18n.getMessage('Extended Exercises')}
          </span>
          <h2 class="text-3xl font-bold text-text-primary">
            ${i18n.getMessage('Lab Exercise: External Content Connector')}
          </h2>
          <div class="flex flex-wrap gap-2">
            <span class="aiux-badge aiux-badge-success aiux-badge-soft"
              >${i18n.getMessage('Beginner')}</span
            >
            <span class="aiux-badge aiux-badge-ghost"
              >${i18n.getMessage('AI agents involved')}</span
            >
            <span class="aiux-badge aiux-badge-ghost"
              >${i18n.getMessage('30 minutes')}</span
            >
          </div>
        </header>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Where we are in this workshop')}
          </h3>
          <figure>
            <img
              src="${asset('dataflow_outcome_agent_flow_external_content.png')}"
              alt="${i18n.getMessage(
                'External Content Connector focus: Executive Memos to SharePoint'
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
              'This lab walks you through the configuration and usage of External Content Connectors as a source of unstructured document data to supplement automations needed in Finance case creation.'
            )}
          </p>
          <figure>
            <img
              src="${asset('sc_slide_xcc_overview.png')}"
              alt="${i18n.getMessage('External Content Connector overview slide')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <figure>
            <img
              src="${asset('sc_slide_xcc_demo_preview.png')}"
              alt="${i18n.getMessage('External Content Connector demo preview slide')}"
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
              'ServiceNow retrieves information from indexed documents in a document repository such as SharePoint, providing additional context to assist Flows and Automations.'
            )}
          </p>
          <figure>
            <img
              src="${asset('dataflow_external_content_connector.png')}"
              alt="${i18n.getMessage('External Content Connector data flow diagram')}"
              class="w-full rounded-xl border border-base-300"
            />
            <figcaption class="mt-2 text-sm text-text-tertiary">
              ${i18n.getMessage('Color Legend:')} 🟢
              ${i18n.getMessage('Platform')} | 🟣
              ${i18n.getMessage('Workflow Data Fabric')} | 🔵
              ${i18n.getMessage('External Systems')} | ⚪
              ${i18n.getMessage('User Interaction')}
            </figcaption>
          </figure>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Steps')}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Preparation steps')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Configure the admin user email and assign the ais_high_security_admin role for elevated access to External Content Connector configuration.'
            )}
          </p>
          ${renderSteps(PREP_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Connection and Crawl Config')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Create a SharePoint connection with authentication credentials, then configure and run a full document crawl with user permissions to index documents for AI-powered search.'
            )}
          </p>
          ${renderSteps(CONNECTION_CRAWL_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Usage of External Content Connector')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Test Now Assist queries in Employee Center to verify indexed SharePoint documents are searchable and provide relevant context for finance-related inquiries.'
            )}
          </p>
          ${renderSteps(USAGE_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Conclusion')}
          </h3>
          <div class="aiux-alert aiux-alert-success aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Congratulations! You have completed configuration of the External Content Connector integration that allows ServiceNow to read indexed unstructured documents to supplement both interactive and AI Agent-based workflows.'
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
              'Keeping with the unstructured data theme, explore how ServiceNow gets unstructured data from documents and feeds them into ServiceNow forms or records.'
            )}
          </p>
          <a
            class="aiux-btn aiux-btn-primary w-fit"
            href="${basePath}/exercises/lens-and-document-intelligence"
          >
            ${i18n.getMessage(
              'Continue to ServiceNow Lens and Document Intelligence'
            )}
          </a>
        </section>



        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
