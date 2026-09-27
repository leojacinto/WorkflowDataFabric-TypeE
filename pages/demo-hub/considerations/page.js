import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../../utils/document-title.js';

const OBTAIN_INSTANCE_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Log in to https://demohub.service-now.com/ with your ServiceNow account.'
      ),
    image: null
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to Manage Instances in the top right corner — this opens a new window.'
      ),
    image: 'sc_demohub_manage_instances.png'
  },
  {
    text: () => i18n.getMessage('Click Request an Instance.'),
    image: 'sc_demohub_request_instance.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Fill in Nickname (optional), Notes (optional), and Data Center Region — you may need to cycle across regions if your preferred one has no available instance.'
      ),
    image: 'sc_demohub_instance_form.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Example negative scenario: selecting Australia for Alectri (Zurich) shows 0 available instances.'
      ),
    image: 'sc_demohub_no_instances_au.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Selecting Brazil + Alectri (Zurich) in this example shows 8 available instances. Agree to Terms of Use.'
      ),
    image: 'sc_demohub_instances_available_br.png'
  },
  {
    text: () =>
      i18n.getMessage('Click Submit at the top-right of the navigation.'),
    image: 'sc_demohub_submit.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'In under 10 minutes you will receive an email with the instance ID and login details.'
      ),
    image: 'sc_demohub_instance_ready_email.png'
  }
];

const DEPENDENCY_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Ensure you are at least on Zurich Patch 6. Go to All, type stats.do, and press Enter. Confirm the page is empty.'
      ),
    image: 'sc_fund_stats.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'You should see a build tag with Zurich and the needed patch name.'
      ),
    image: 'sc_demohub_stats_build_tag.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Log in to Demo Hub, then go to the APAC End-to-End AI Workshop catalog item to install the lab dependencies in your instance.'
      ),
    image: null
  },
  {
    text: () =>
      i18n.getMessage(
        'Provide your Zurich Patch 6 (or newer) instance name, admin user ID, and password, then click Submit.'
      ),
    image: 'sc_fund_cat_item.png'
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

@customElement('x-snc-wdf-lab-demo-hub-considerations-page')
export default class DemoHubConsiderationsPage extends AIUXElement {
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
    setDocumentTitle(i18n.getMessage('Demo Hub Preparations'));
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path => `${basePath.replace(/^\/aiux/, '')}/public/wdf/demo-hub/${path}`;

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
            ${i18n.getMessage('Demo Hub for SCs')}
          </span>
          <h2 class="text-3xl font-bold text-text-primary">
            ${i18n.getMessage('Demo Hub Preparations')}
          </h2>
        </header>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Obtain Demo Hub Instance')}
          </h3>
          <div class="aiux-alert aiux-alert-warning aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Obtain a Zurich (Alectri) instance in Demo Hub as your instance for the workshop, in your data center of choice. Note: the workshop labs will only work on a Zurich (Alectri) image — selecting any other category will lead to steps not working correctly.'
              )}
            </span>
          </div>
          ${renderSteps(OBTAIN_INSTANCE_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Important Preparation: Install Lab Dependencies')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'This contains critical steps to prepare your Demo Hub Instance.'
            )}
          </p>
          ${renderSteps(DEPENDENCY_STEPS)}
        </section>

        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
