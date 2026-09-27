import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../../utils/document-title.js';

// `text` is a () => i18n.getMessage('<literal>') getter, not a raw string —
// the build's static extractor only captures string literals passed
// directly to i18n.getMessage(), so the literal has to stay inline with its
// own call. Call the getter (e.g. `step.text()`) at render time.
const DEPENDENCY_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Ensure you are at least on Zurich Patch 6. Go to All, type stats.do, and press Enter. Confirm the page is empty.'
      ),
    image: 'sc_demohub_stats_build_tag.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'You should see a build tag with Zurich and the needed patch name.'
      ),
    image: null
  },
  {
    text: () =>
      i18n.getMessage(
        'If you have not done so yet, log in to Demo Hub, then go to the APAC End-to-End AI Workshop catalog item to install the lab dependencies in your instance.'
      ),
    image: 'sc_fund_cat_item.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Provide your Zurich Patch 6 (or newer) instance name, admin user ID, and password, then click Submit.'
      ),
    image: null
  },
  {text: () => i18n.getMessage('Wait 10 to 15 minutes.'), image: null},
  {
    text: () =>
      i18n.getMessage(
        'Once completed, you will get an email indicating that the import of update sets is successful.'
      ),
    image: 'sc_fund_cat_complete.png'
  }
];

const SCOPE_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Go to the top-right of your navigation, click the globe icon, then the arrow, then the list icon to create a new scope.'
      ),
    image: 'sc_fund_scope_change.png'
  },
  {
    text: () => i18n.getMessage('In the next screen, click New.'),
    image: 'sc_fund_new_scope.png'
  },
  {
    text: () =>
      i18n.getMessage('Go to the Start from Scratch section and click Create.'),
    image: 'sc_fund_create_scope.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Provide the scope details with name "Lab <YOUR INITIALS> Forecast Variance" and the scope, then click Create. The scope is a technical name, auto-populated but editable — for example, x_snc_lab_lfr. This dummy scope will not be used in the exercise. Click Back to list once done. Note: you may get an error that your scope cannot be created because someone with similar initials has already created theirs.'
      ),
    image: 'sc_fund_dummy_scope_create.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Verify you are in the correct scope after creating it, by clicking the scope (globe icon) and confirming it shows the Lab <YOUR INITIALS> Forecast Variance label you just created. Being in the correct scope avoids access and object management issues.'
      ),
    image: 'sc_fund_forcast_variance_dummy.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'This next step is critical: change scope again after creating the simulation scope. Click the scope (globe icon) and select Forecast Variance, this time WITHOUT your initials. This is the scope you will use throughout the lab.'
      ),
    image: 'sc_fund_forcast_variance_scope.png',
    critical: true
  },
  {
    text: () =>
      i18n.getMessage(
        'Now that you are in the right scope, navigate to All, type System Definition, then search for Tables.'
      ),
    image: 'sc_fund_sysdef_tables_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Note: the table you create in the next steps will NOT be used for the rest of the lab, and serves mainly to introduce how target tables for REST API endpoints are created in ServiceNow.'
      ),
    image: null,
    note: true
  },
  {
    text: () => i18n.getMessage('Go to the top-right of the navigation and click New.'),
    image: 'sc_fund_new_table.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Provide the Label as "Expense Transaction Event <your initials>". The Name (technical identifier) auto-populates and can be modified. Finally, untick Create module.'
      ),
    image: 'sc_fund_new_table_details.png'
  },
  {
    text: () => i18n.getMessage('Right-click the header and click Save.'),
    image: 'sc_fund_save.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Staying on the same screen, an option to create fields for the table appears. In the Columns tab, click New.'
      ),
    image: 'sc_fund_new_field.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'As an example: provide the Type (String), the Column label (Cost Center, which auto-populates the Column name), and since it is a string, a Max length of 40. Right-click the header and Save.'
      ),
    image: 'sc_fund_field_details.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Repeat for all 16 other fields, varying Column label, Column name, Type, and Max length as needed. Keep Display as false across all fields. These fields are expense, invoice, and finance related — correct data foundations are critical so agents have the correct context and structure.'
      ),
    image: 'sc_fund_all_fields.png'
  }
];

@customElement('x-snc-wdf-lab-fundamentals-page')
export default class FundamentalsPage extends AIUXElement {
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
    setDocumentTitle(i18n.getMessage('Lab Exercise: Fundamentals'));
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path => `${basePath.replace(/^\/aiux/, '')}/public/wdf/fundamentals/${path}`;

    return html`
      <div class="mx-auto flex max-w-4xl flex-col gap-8 p-4 lg:p-8">
        <header class="flex flex-col gap-2">
          <span class="aiux-badge aiux-badge-primary aiux-badge-outline w-fit">
            ${i18n.getMessage('Main Exercises')}
          </span>
          <h2 class="text-3xl font-bold text-text-primary">
            ${i18n.getMessage('Lab Exercise: Fundamentals')}
          </h2>
          <div class="flex flex-wrap gap-2">
            <span class="aiux-badge aiux-badge-success aiux-badge-soft"
              >${i18n.getMessage('Beginner')}</span
            >
            <span class="aiux-badge aiux-badge-ghost"
              >${i18n.getMessage('No AI agents')}</span
            >
            <span class="aiux-badge aiux-badge-ghost"
              >${i18n.getMessage('30 minutes')}</span
            >
          </div>
        </header>

        <section class="flex flex-col gap-4">
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Not a fan of complicated schematics and the Data and Flow Diagrams not to your liking? Check out the simplified architectural view of the solution you will be building below.'
            )}
          </p>
          <figure>
            <img
              src="${asset('sc_slide_e2e_architecture.png')}"
              alt="${i18n.getMessage(
                'Simplified end-to-end architecture diagram of the lab solution'
              )}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'This lab will walk you through creation of the scoped tables needed to interact with the external system integrations.'
            )}
          </p>
          <figure>
            <img
              src="${asset('sc_slide_fundamentals_overview.png')}"
              alt="${i18n.getMessage(
                'Overview diagram of the Fundamentals exercise scope'
              )}"
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
              'The data flow below shows how ServiceNow consumes REST API endpoints via an Integration Hub Spoke, further processed by a Flow so the entries are written to the scoped table.'
            )}
          </p>
          <figure>
            <img
              src="${asset('dataflow_fundamentals.png')}"
              alt="${i18n.getMessage('Fundamentals exercise data flow diagram')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Lab story')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'While you have the power of CMDB at your fingertips, the process we are solving for here does not concern CI data. You will need to create a scoped table which will store information from an expense event API. This can come from cloud services such as AWS or Azure.'
            )}
          </p>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'The table you create here will not be used for the rest of the lab and serves mainly to introduce how target tables for REST API endpoints are created for ServiceNow.'
            )}
          </p>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Steps')}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            <span class="aiux-badge aiux-badge-warning aiux-badge-soft mr-2">
              ${i18n.getMessage('Skip if already done for AI Day 1')}
            </span>
            ${i18n.getMessage('Install Lab Dependencies')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'This contains critical steps to prepare your Demo Hub instance.'
            )}
          </p>
          <ol class="list-decimal space-y-4 pl-6 text-base text-text-secondary">
            ${DEPENDENCY_STEPS.map(
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

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands on: Create a Scope')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Create a dummy scope. This activity is meant to make you familiar with scope creation — the scope you create here will not be used in the lab. If you are familiar with scope creation, you can skip this exercise, as it is not a dependency for the rest of the exercises.'
            )}
          </p>
          <ol class="list-decimal space-y-4 pl-6 text-base text-text-secondary">
            ${SCOPE_STEPS.map(
              step => html`
                <li>
                  ${step.critical
                    ? html`<span
                        class="aiux-badge aiux-badge-error aiux-badge-soft mr-2"
                        >${i18n.getMessage('Critical')}</span
                      >`
                    : null}
                  ${step.note
                    ? html`<span
                        class="aiux-badge aiux-badge-warning aiux-badge-soft mr-2"
                        >${i18n.getMessage('Note')}</span
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
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Conclusion')}
          </h3>
          <div class="aiux-alert aiux-alert-success aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Congratulations! You have created the destination table within ServiceNow for the external REST API sources. As a recap, the table you created will NOT be used for the rest of the steps and serves mainly to introduce how target tables for REST API endpoints are created for ServiceNow.'
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
              'Let us continue building the data foundations for the use case. Next up is creation of the Data Fabric tables which will be used by AI Agents.'
            )}
          </p>
          <a
            class="aiux-btn aiux-btn-primary w-fit"
            href="${basePath}/exercises/integration-hub"
          >
            ${i18n.getMessage('Continue to Integration Hub')}
          </a>
        </section>



        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
