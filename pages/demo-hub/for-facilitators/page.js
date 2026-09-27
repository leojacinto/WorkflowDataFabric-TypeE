import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../../utils/document-title.js';

const NEON_ASSETS = [
  {
    file: () => i18n.getMessage('neon_setup.sql'),
    purpose: () =>
      i18n.getMessage(
        'Complete SQL script — creates the table and inserts all 24 rows. Copy-paste into Neon SQL Editor.'
      )
  },
  {
    file: () => i18n.getMessage('VARIANCE_BASELINE_V.csv'),
    purpose: () =>
      i18n.getMessage(
        'Raw seed data in CSV format for reference or manual inspection.'
      )
  }
];

@customElement('x-snc-wdf-lab-for-facilitators-page')
export default class ForFacilitatorsPage extends AIUXElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100%;
      container-type: inline-size;
    }
  `;

  firstUpdated() {
    setDocumentTitle(i18n.getMessage('For Lab Facilitators'));
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};

    return html`
      <div class="mx-auto flex max-w-4xl flex-col gap-8 p-4 lg:p-8">
        <header class="flex flex-col gap-2">
          <span class="aiux-badge aiux-badge-primary aiux-badge-outline w-fit">
            ${i18n.getMessage('Demo Hub for SCs')}
          </span>
          <h2 class="text-3xl font-bold text-text-primary">
            ${i18n.getMessage('For Lab Facilitators')}
          </h2>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage('This contains considerations for Lab Facilitators.')}
          </p>
        </header>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Lab Presentation')}
          </h3>
          <ol class="list-decimal space-y-2 pl-6 text-base text-text-secondary">
            <li>
              ${i18n.getMessage(
                'Download the Lab Presentation deck (accessible only through internal ServiceNow login credentials).'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'Familiarize yourself with the presentation guide and modify it as needed.'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'Update the Lab URL, QR Codes, and Reservation codes accordingly — using a URL shortener with QR codes keeps the experience seamless for participants.'
              )}
            </li>
          </ol>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Credentials')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Credentials for integrated systems are not shown in this lab guide — they are kept in a separate credential sheet requiring ServiceNow login.'
            )}
          </p>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Integration Hub Action Endpoint')}
          </h3>
          <ol class="list-decimal space-y-2 pl-6 text-base text-text-secondary">
            <li>
              ${i18n.getMessage(
                'In the Integration Hub exercise\'s Connection Setup step, feel free to use a service other than the free tier of beeceptor.com, especially with more than 10 attendees, as the free endpoint may hit access limits.'
              )}
            </li>
            <li>
              ${i18n.getMessage(
                'Updates are ongoing to make the Integration Hub endpoint used for the Action more scalable for more attendees.'
              )}
            </li>
          </ol>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Neon Database Setup (for MCP Lab)')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'The MCP Server/Client exercise requires an external cloud database hosted on Neon that ServiceNow connects to via MCP. This database contains a table called VARIANCE_BASELINE_V with 24 rows of cost center variance data used by the AI Agent during the lab.'
            )}
          </p>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'If the existing Neon database becomes unavailable (API key expired, project deleted, free tier limits reached), follow the steps below to recreate it from scratch — no technical expertise beyond copy-pasting is required.'
            )}
          </p>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Step 1: Create a Neon Account and Project')}
          </h4>
          <ol class="list-decimal space-y-1 pl-6 text-base text-text-secondary">
            <li>${i18n.getMessage('Go to neon.tech and sign up using GitHub or Google login.')}</li>
            <li>${i18n.getMessage('Click New Project.')}</li>
            <li>${i18n.getMessage('Enter a project name (e.g. wdf-loom).')}</li>
            <li>
              ${i18n.getMessage(
                'Select a region close to your lab audience (e.g. East US 2 for Americas, Singapore for APAC).'
              )}
            </li>
            <li>${i18n.getMessage('Click Create Project.')}</li>
            <li>
              ${i18n.getMessage(
                'Once created, note your Project ID from the dashboard URL (e.g. shy-base-71725149) — you will need this later.'
              )}
            </li>
          </ol>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Step 2: Create the Table and Seed Data')}
          </h4>
          <ol class="list-decimal space-y-1 pl-6 text-base text-text-secondary">
            <li>${i18n.getMessage('In your Neon project, navigate to SQL Editor from the left sidebar.')}</li>
            <li>${i18n.getMessage('Open neon_setup.sql from this repository and copy its entire contents.')}</li>
            <li>${i18n.getMessage('Paste it into the Neon SQL Editor and click Run.')}</li>
            <li>
              ${i18n.getMessage(
                'You should see output confirming 24 rows inserted, with a sample row for cost center CC_IT_001.'
              )}
            </li>
          </ol>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Step 3: Create a Neon API Key')}
          </h4>
          <ol class="list-decimal space-y-1 pl-6 text-base text-text-secondary">
            <li>
              ${i18n.getMessage(
                'In the Neon Console, click your profile icon (bottom-left), then Account Settings.'
              )}
            </li>
            <li>${i18n.getMessage('Go to API Keys, then Generate new API key.')}</li>
            <li>${i18n.getMessage('Give it a name (e.g. wdf-lab-mcp) and click Create.')}</li>
            <li>
              ${i18n.getMessage(
                'Copy the generated key — it starts with napi_. Save it securely; you will not be able to see it again.'
              )}
            </li>
          </ol>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Step 4: Verify the MCP Connection')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Run a curl POST to https://mcp.neon.tech/mcp with your API key as a Bearer token to confirm the Neon MCP server can reach your data. A successful response contains "serverInfo":{"name":"mcp-server-neon"}. A 401 error means the API key should be double-checked.'
            )}
          </p>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Step 5: Values to Share with Lab Participants')}
          </h4>
          <div class="aiux-card aiux-card-border bg-base-100 overflow-x-auto">
            <table class="aiux-table">
              <thead>
                <tr>
                  <th scope="col">${i18n.getMessage('Field')}</th>
                  <th scope="col">${i18n.getMessage('Value')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">${i18n.getMessage('MCP Server URL')}</th>
                  <td data-i18n-skip>https://mcp.neon.tech/mcp</td>
                </tr>
                <tr>
                  <th scope="row">${i18n.getMessage('API Key')}</th>
                  <td data-i18n-skip>Bearer &lt;YOUR_NEON_API_KEY&gt;</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="aiux-alert aiux-alert-warning aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Important: the API Key field in ServiceNow must include the word "Bearer" as a prefix (e.g. Bearer napi_abc123...). Without this prefix, the connection fails with a 401 error.'
              )}
            </span>
          </div>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Also provide the following for the MCP Step and Tool configuration, entered in the Tool description field: a projectId (camelCase, not project_id) and a SQL statement selecting cost_center, actual_amount_usd, baseline_amount_usd, variance, and variance_pct from VARIANCE_BASELINE_V filtered by cost_center, limited to 1 row.'
            )}
          </p>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Summary of Assets')}
          </h4>
          <div class="aiux-card aiux-card-border bg-base-100 overflow-x-auto">
            <table class="aiux-table">
              <thead>
                <tr>
                  <th scope="col">${i18n.getMessage('File')}</th>
                  <th scope="col">${i18n.getMessage('Purpose')}</th>
                </tr>
              </thead>
              <tbody>
                ${NEON_ASSETS.map(
                  asset => html`
                    <tr>
                      <th scope="row">${asset.file()}</th>
                      <td>${asset.purpose()}</td>
                    </tr>
                  `
                )}
              </tbody>
            </table>
          </div>
        </section>

        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
