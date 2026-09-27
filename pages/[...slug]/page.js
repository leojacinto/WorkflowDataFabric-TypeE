import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../utils/document-title.js';
import {findTocEntry} from '../../constants/toc.js';

/**
 * Placeholder for every WDF Lab page from SUMMARY.md that has not been
 * ported into AIUX yet. Keeps the full GitBook table of contents navigable
 * end to end while content is ported exercise by exercise.
 */
@customElement('x-snc-wdf-lab-coming-soon-page')
export default class ComingSoonPage extends AIUXElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100%;
      container-type: inline-size;
    }
  `;

  firstUpdated() {
    const {entry} = this.loaderData || {};
    setDocumentTitle(
      entry ? entry.title() : i18n.getMessage('Page not found')
    );
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath, entry: findTocEntry(ctx.pagePath)};
  }

  render() {
    const {basePath, entry} = this.loaderData || {};

    if (!entry) {
      return html`
        <div class="mx-auto flex max-w-2xl flex-col gap-4 p-4 lg:p-8">
          <h2 class="text-2xl font-bold text-text-primary">
            ${i18n.getMessage('Page not found')}
          </h2>
          <a class="aiux-btn aiux-btn-primary w-fit" href="${basePath}/home">
            ${i18n.getMessage('Take me back to main page')}
          </a>
        </div>
      `;
    }

    return html`
      <div class="mx-auto flex max-w-2xl flex-col gap-4 p-4 lg:p-8">
        <span class="aiux-badge aiux-badge-primary aiux-badge-outline w-fit">
          ${entry.section
            ? entry.section()
            : i18n.getMessage('Workflow Data Fabric')}
        </span>
        <h2 class="text-3xl font-bold text-text-primary">${entry.title()}</h2>

        ${entry.difficulty || entry.duration || entry.aiAgents !== undefined
          ? html`
              <div class="flex flex-wrap gap-2">
                ${entry.difficulty
                  ? html`<span class="aiux-badge aiux-badge-ghost"
                      >${entry.difficulty()}</span
                    >`
                  : null}
                ${entry.aiAgents !== undefined
                  ? html`<span class="aiux-badge aiux-badge-ghost"
                      >${entry.aiAgents
                        ? i18n.getMessage('AI agents involved')
                        : i18n.getMessage('No AI agents')}</span
                    >`
                  : null}
                ${entry.duration
                  ? html`<span class="aiux-badge aiux-badge-ghost"
                      >${entry.duration()}</span
                    >`
                  : null}
              </div>
            `
          : null}

        <div class="aiux-alert aiux-alert-info aiux-alert-soft">
          <span>
            ${i18n.getMessage(
              'This page has not been ported into the AIUX experience yet — it still lives on the GitBook version of the WDF Lab.'
            )}
          </span>
        </div>

        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
