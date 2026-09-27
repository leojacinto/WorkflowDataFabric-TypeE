import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../../utils/document-title.js';

const DOC_INTEL_SETUP_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type Now Assist Admin, then click Now Assist Admin > Skills.'
      ),
    image: 'sc_ldi_now_assist_skills_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to Platform > Other, type Extract information from documents, then Edit it via the overflow menu.'
      ),
    image: 'sc_ldi_edit_extract_skill.png'
  },
  {
    text: () =>
      i18n.getMessage('Go to Create Usecase, then click Expense Transaction Event.'),
    image: 'sc_ldi_create_usecase.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Review the preconfigured use case: Status Active, Target table Expense Transaction Event, Full automation mode On, Field Names and Target fields, Type set to Text, and Required flags. No action needed. Go to the Integrations tab.'
      ),
    image: 'sc_ldi_usecase_config_overview.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Verify the Extract integration targets x_snc_forecast_v_0_expense_transaction_event with flow "DocIntel Extract Values Flow - Expense Transaction Event - Extract", and the Process integration uses "DocIntel Task Processing Flow - Expense Transaction Event - Process". Click Exit.'
      ),
    image: 'sc_ldi_integrations_tab.png'
  },
  {
    text: () => i18n.getMessage('Click Save and Continue.'),
    image: 'sc_ldi_save_and_continue.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Activate (or Done if already activated).'
      ),
    image: 'sc_ldi_activate.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Return to Platform (this modal only appears if not already activated).'
      ),
    image: 'sc_ldi_return_to_platform.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'You are redirected to the Skills screen — this concludes the walkthrough.'
      ),
    image: 'sc_ldi_skills_screen.png'
  }
];

const DOC_INTEL_PARAMS_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'These steps apply if Document Intelligence Admin is not installed (the case for this lab).'
      ),
    image: null
  },
  {
    text: () => i18n.getMessage('Change the scope to Global via the globe icon.'),
    image: 'sc_ldi_scope_global.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type Document Data Extraction, then click Document Data Extraction > System Properties.'
      ),
    image: 'sc_ldi_doc_extraction_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Search for "*threshold" and update the three parameters to 0.01, to reduce the threshold for automation and avoid trial-and-error issues.'
      ),
    image: 'sc_ldi_threshold_search.png'
  },
  {
    text: () =>
      i18n.getMessage('Change the scope back to Forecast Variance via the globe icon.'),
    image: 'sc_ldi_scope_forecast_variance.png'
  }
];

const DOC_INTEL_RUNTIME_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Go to All, type x_snc_forecast_v_0_variance_task.do, and hit Enter.'
      ),
    image: 'sc_ldi_variance_task_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Upload a document in the variance_task table (a stand-in for ERP invoice upload). Remember the auto-generated task ID. Put "CC_IT_002" as the short description, then click the Attach (paper clip) button.'
      ),
    image: 'sc_ldi_upload_document.png'
  },
  {
    text: () => i18n.getMessage('Click Choose file.'),
    image: 'sc_ldi_choose_file.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Upload Invoice_IT_Laptop_CC_IT_002.pdf, then click Exit.'
      ),
    image: 'sc_ldi_upload_file_exit.png'
  },
  {
    text: () => i18n.getMessage('Change the State field to Work in Progress.'),
    image: 'sc_ldi_state_wip.png'
  },
  {
    text: () =>
      i18n.getMessage('Right-click the header and Save, or simply click Submit.'),
    image: 'sc_ldi_save_or_submit.png'
  }
];

const AGENT_WALKTHROUGH_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'A new Now Assist badge appears — the Document Intelligence integration flows triggered the same agent from Integration Hub. Click the Now Assist icon. If the badge does not appear, reload the page or open Now Assist and wait for a new Active chat.'
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
        'Expand Planning the next steps; note the Event ID (reusing the Integration Hub flow — in a real scenario this would be an invoice ID); note the cost_center and vendor extracted; there are no RAG results for this vendor; and, if over budget, the Finance Case created (e.g. FINC0010017).'
      ),
    image: 'sc_ldi_agent_results_overview.png'
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
        'Go to Lists, sort by Number, and look for the Finance Case created by the AI Agent (e.g. FINC0010017).'
      ),
    image: 'sc_ldi_finance_case_list.png'
  }
];

const VERIFY_OUTPUT_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type Now Assist Admin, then click Now Assist Admin > Skills.'
      ),
    image: 'sc_ldi_now_assist_skills_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to Platform > Other, type Extract information from documents, then Edit it via the overflow menu.'
      ),
    image: 'sc_ldi_edit_extract_skill.png'
  },
  {
    text: () =>
      i18n.getMessage('Go to Create Usecase, then click Expense Transaction Event.'),
    image: 'sc_ldi_create_usecase.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to Test Outputs, note the Task ID auto-generated for your variance_task entry, then click Process.'
      ),
    image: 'sc_ldi_test_outputs.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Review the uploaded invoice with its extracted information and Status. You can also open the section in a new Document Intelligence window.'
      ),
    image: 'sc_ldi_extracted_info_view.png'
  }
];

const LENS_SETUP_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type Now Assist Admin, then click Now Assist Admin > Skills.'
      ),
    image: 'sc_ldi_now_assist_skills_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to Platform > Other, type ServiceNow AI Lens, then click Turn on.'
      ),
    image: 'sc_ldi_lens_turn_on.png'
  },
  {
    text: () => i18n.getMessage('Accept defaults and click Turn on.'),
    image: 'sc_ldi_lens_accept_defaults.png'
  },
  {
    text: () => i18n.getMessage('Click Back to skills on the pop-up.'),
    image: 'sc_ldi_lens_back_to_skills.png'
  }
];

const LENS_DOWNLOAD_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'Navigate to All, type ServiceNow AI Lens, then click ServiceNow AI Lens > Downloads.'
      ),
    image: 'sc_ldi_lens_downloads_nav.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Download and install the Lens package for your device, following the default installer prompts.'
      ),
    image: 'sc_ldi_lens_download_packages.png'
  }
];

const LENS_RUNTIME_STEPS = [
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
        'Click Create with Lens, at the top right of the navigation.'
      ),
    image: 'sc_ldi_lens_create_with_lens.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Choose whether to always allow the app to open, then click Open ServiceNow AI Lens.app.'
      ),
    image: 'sc_ldi_lens_open_app.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'The Lens app opens as a frame. Drag and resize it to capture the relevant area of the document, then click Analyze.'
      ),
    image: 'sc_ldi_lens_frame_analyze.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'The new Expense Transaction Event record is populated from the invoice. Click Submit.'
      ),
    image: 'sc_ldi_lens_record_populated.png'
  },
  {
    text: () => i18n.getMessage('The new Expense Transaction Event is saved.'),
    image: 'sc_ldi_lens_event_saved.png'
  }
];

@customElement('x-snc-wdf-lab-lens-and-document-intelligence-page')
export default class LensAndDocumentIntelligencePage extends AIUXElement {
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
      i18n.getMessage('Lab Exercise: ServiceNow Lens and Document Intelligence')
    );
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path => `${basePath.replace(/^\/aiux/, '')}/public/wdf/lens-and-document-intelligence/${path}`;

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
              'Lab Exercise: ServiceNow Lens and Document Intelligence'
            )}
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
              src="${asset('dataflow_outcome_agent_flow_doc_intelligence.png')}"
              alt="${i18n.getMessage('Document Intelligence focus: Expense to Documents')}"
              class="w-full rounded-xl border border-base-300"
            />
            <figcaption class="mt-2 text-sm text-text-tertiary">
              ${i18n.getMessage('Legend:')} 🟤 ${i18n.getMessage('Data')} |
              🟡 ${i18n.getMessage('Now Assist')} | 🔵
              ${i18n.getMessage('External Systems')} | ↓
              ${i18n.getMessage('Takes data from')}
            </figcaption>
          </figure>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'This lab walks you through the configuration and usage of ServiceNow Lens and Document Intelligence as sources of unstructured document data for interactive and batch capture of expense information from documents.'
            )}
          </p>
          <figure>
            <img
              src="${asset('sc_slide_lens_docintel_overview.png')}"
              alt="${i18n.getMessage('Lens and Document Intelligence overview slide')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <figure>
            <img
              src="${asset('sc_slide_docintel_demo_preview.png')}"
              alt="${i18n.getMessage('Document Intelligence demo preview slide')}"
              class="w-full rounded-xl border border-base-300"
            />
          </figure>
          <div class="aiux-alert aiux-alert-info aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                "A note on this exercise: in production, invoices are captured at the source — an ERP, procurement platform, or expense system — not uploaded directly into ServiceNow. ServiceNow's strength is what happens after ingestion: orchestrating validation, enriching records via integration, and routing exceptions through case management. To keep this exercise self-contained and reuse the Integration Hub agent, we upload the document to a task record and let Document Intelligence extract it locally — a stand-in for the real ERP action. This exercise is about what ServiceNow does with the document, not how it receives it."
              )}
            </span>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Data flow')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'ServiceNow captures information from invoice documents and processes it to evaluate whether a Finance Case should be created.'
            )}
          </p>
          <figure>
            <img
              src="${asset('dataflow_lens_document_intelligence.png')}"
              alt="${i18n.getMessage('Lens and Document Intelligence data flow diagram')}"
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
            ${i18n.getMessage('Document Intelligence')}
          </h3>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Walkthrough: Document Intelligence Setup')}
          </h4>
          ${renderSteps(DOC_INTEL_SETUP_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-on: Document Intelligence Parameters')}
          </h4>
          ${renderSteps(DOC_INTEL_PARAMS_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-on: Document Intelligence Runtime')}
          </h4>
          ${renderSteps(DOC_INTEL_RUNTIME_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Walkthrough: Custom Forecast Variance AI Agent')}
          </h4>
          ${renderSteps(AGENT_WALKTHROUGH_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Completion: Verify Finance Case')}
          </h4>
          ${renderSteps(VERIFY_CASE_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('[Optional] Completion: Verify Document Output')}
          </h4>
          ${renderSteps(VERIFY_OUTPUT_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('AI Lens')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'ServiceNow AI Lens captures information from documents and images via UI with AI. Unlike Document Intelligence, which can run in the back end, Lens requires user interaction but less upfront setup.'
            )}
          </p>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Walkthrough: AI Lens Setup')}
          </h4>
          ${renderSteps(LENS_SETUP_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Walkthrough: AI Lens Download')}
          </h4>
          ${renderSteps(LENS_DOWNLOAD_STEPS)}

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Hands-on: AI Lens Runtime')}
          </h4>
          ${renderSteps(LENS_RUNTIME_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Conclusion')}
          </h3>
          <div class="aiux-alert aiux-alert-success aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Congratulations! You have explored the capabilities of both Document Intelligence and AI Lens.'
              )}
            </span>
          </div>
        </section>



        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
