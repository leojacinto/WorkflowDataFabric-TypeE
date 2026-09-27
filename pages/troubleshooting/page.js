import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../utils/document-title.js';

@customElement('x-snc-wdf-lab-troubleshooting-page')
export default class TroubleshootingPage extends AIUXElement {
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
    setDocumentTitle(i18n.getMessage('Troubleshooting'));
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path => `${basePath.replace(/^\/aiux/, '')}/public/wdf/troubleshooting/${path}`;

    return html`
      <div class="mx-auto flex max-w-4xl flex-col gap-8 p-4 lg:p-8">
        <header class="flex flex-col gap-2">
          <span class="aiux-badge aiux-badge-primary aiux-badge-outline w-fit">
            ${i18n.getMessage('Reference')}
          </span>
          <h2 class="text-3xl font-bold text-text-primary">
            ${i18n.getMessage('Troubleshooting')}
          </h2>
        </header>

        <section class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <span class="aiux-badge aiux-badge-info aiux-badge-soft w-fit">
              ${i18n.getMessage('Applies to: Integration Hub')}
            </span>
            <p class="text-base leading-relaxed text-text-secondary">
              ${i18n.getMessage(
                'If the URL in Action Configuration fails to fetch data due to rate limiting or another reason, you can upload an XML file to trigger a created/updated row in x_snc_forecast_v_0_expense_transaction_event.'
              )}
            </p>
            <ul class="list-disc space-y-1 pl-6 text-base text-text-secondary">
              <li>
                ${i18n.getMessage(
                  'If uploading the XML file instead of using the Action, change the trigger in Custom Forecast Variance AI Agent to Created or updated, instead of Created.'
                )}
              </li>
              <li>
                ${i18n.getMessage(
                  'This approach is not representative of a real integration scenario, since it is only a file upload. A Created trigger will not fire from an upload.'
                )}
              </li>
            </ul>
            <figure>
              <img
                src="${asset('sc_ihub_alternate_trigger.png')}"
                alt=""
                class="max-w-lg rounded-xl border border-base-300"
              />
            </figure>
          </div>

          <div class="flex flex-col gap-2">
            <span class="aiux-badge aiux-badge-info aiux-badge-soft w-fit">
              ${i18n.getMessage('Applies to: Integration Hub')}
            </span>
            <p class="text-base leading-relaxed text-text-secondary">
              ${i18n.getMessage(
                'The agent might not trigger after creating a new expense event entry, or might throw an error such as "Sorry, there was a problem on my side trying to complete this request. Try asking again later." This can be fixed with a dummy change to the Custom Forecast Variance AI Agent trigger — e.g. recreating it.'
              )}
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <span class="aiux-badge aiux-badge-info aiux-badge-soft w-fit">
              ${i18n.getMessage('Applies to: Integration Hub')}
            </span>
            <p class="text-base leading-relaxed text-text-secondary">
              ${i18n.getMessage(
                "If the Now Assist Agent is not showing the action being executed and the chat history, wait ~5 minutes and refresh — this is primarily due to the instance's freshly configured Now Assist settings."
              )}
            </p>
            <figure>
              <img
                src="${asset('sc_common_troubleshoot_now_assist.png')}"
                alt=""
                class="max-w-lg rounded-xl border border-base-300"
              />
            </figure>
          </div>

          <div class="flex flex-col gap-2">
            <span class="aiux-badge aiux-badge-info aiux-badge-soft w-fit">
              ${i18n.getMessage('Applies to: DocIntel, Integration Hub, MCP, Zero Copy')}
            </span>
            <p class="text-base leading-relaxed text-text-secondary">
              ${i18n.getMessage(
                'If Now Assist reports messages like "There is no available information indicating similar transactions for this vendor" or "insufficient data to determine whether the results are On Target, Over Budget, or Under Budget", the tables the agent searches have not finished indexing yet. Wait 10 to 15 minutes — this does not affect the outcome of the lab, it is only related to lab instance server load.'
              )}
            </p>
            <p class="text-base leading-relaxed text-text-secondary">
              ${i18n.getMessage(
                'If the errors persist after waiting, you can force an indexing job (not a guaranteed fix if lab ML services are under high load):'
              )}
            </p>
            <ol class="list-decimal space-y-2 pl-6 text-base text-text-secondary">
              <li>
                ${i18n.getMessage(
                  'Navigate to All, type Indexed Sources, then click AI Search > AI Search Index > Indexed Sources (open in a new window).'
                )}
                <figure class="mt-2">
                  <img
                    src="${asset('sc_common_indexed_sources_nav.png')}"
                    alt=""
                    class="max-w-lg rounded-xl border border-base-300"
                  />
                </figure>
              </li>
              <li>
                ${i18n.getMessage(
                  'Search Sources for "*x_snc_forecast", then open both Cost Center Budget History Indexed Source and Expense Transactions Indexed Source in new windows.'
                )}
                <figure class="mt-2">
                  <img
                    src="${asset('sc_common_search_indexed_sources.png')}"
                    alt=""
                    class="max-w-lg rounded-xl border border-base-300"
                  />
                </figure>
              </li>
              <li>
                ${i18n.getMessage(
                  'In the Cost Center Budget History Indexed Source window, click Index All Tables.'
                )}
                <figure class="mt-2">
                  <img
                    src="${asset('sc_common_index_budget_history.png')}"
                    alt=""
                    class="max-w-lg rounded-xl border border-base-300"
                  />
                </figure>
              </li>
              <li>
                ${i18n.getMessage(
                  'In the Expense Transactions Indexed Source window, click Index All Tables.'
                )}
                <figure class="mt-2">
                  <img
                    src="${asset('sc_common_index_expense_transactions.png')}"
                    alt=""
                    class="max-w-lg rounded-xl border border-base-300"
                  />
                </figure>
              </li>
              <li>${i18n.getMessage('Once done, re-execute your agent.')}</li>
            </ol>
          </div>
        </section>

        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
