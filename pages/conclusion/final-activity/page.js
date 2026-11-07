import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {labAsset} from '../../../utils/lab-assets.js';
import {setDocumentTitle} from '../../../utils/document-title.js';

@customElement('x-snc-wdf-lab-final-activity-page')
export default class FinalActivityPage extends AIUXElement {
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
    setDocumentTitle(i18n.getMessage('Final Activity'));
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {

    return html`
      <div class="mx-auto flex max-w-4xl flex-col gap-4 p-4 lg:p-8">
        <header class="flex flex-col gap-2"><span class="aiux-badge aiux-badge-primary aiux-badge-outline w-fit">${i18n.getMessage('Conclusion')}</span><h2 class="text-3xl font-bold text-text-primary">${i18n.getMessage('Final Activity')}</h2></header>
        <figure class=""><img src="${labAsset('kahoot_hype_screen_light.gif')}" alt="" class="w-full rounded-xl border border-base-300" /></figure>
      </div>
    `;
  }
}
