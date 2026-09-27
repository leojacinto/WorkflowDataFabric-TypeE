import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import {setDocumentTitle} from '../../../utils/document-title.js';

const DATA_SOURCE_STEPS = [
  {text: () => i18n.getMessage('Go to All, search for Data Sources.'), image: 'sc_data_source_start.png'},
  {text: () => i18n.getMessage('Click New.'), image: 'sc_data_source_new.png'},
  {
    text: () =>
      i18n.getMessage(
        'Name: a descriptive name like "CMDB Data Array [Your Initials]". Import set table label populates the Import set table name. Type: File. Format: JSON. Path for each row: //. Tick Data in single column.'
      ),
    image: 'sc_data_source_create.png'
  },
  {
    text: () => i18n.getMessage('Right-click the header and click Save.'),
    image: 'sc_data_source_save.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Create a JSON file with the source data structure and save it as "cmdb complex data array.json".'
      ),
    image: null
  },
  {
    text: () =>
      i18n.getMessage(
        'Upload the JSON file: select the clip icon, click Choose file, and upload it from your machine.'
      ),
    image: 'sc_data_source_json.png'
  },
  {
    text: () => i18n.getMessage('Right-click the header and click Save.'),
    image: 'sc_data_source_save.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Under Related Links, click Test Load 20 Records.'
      ),
    image: 'sc_data_source_test_load.png'
  }
];

const ETL_STEPS = [
  {text: () => i18n.getMessage('Go to All, search for IntegrationHub ETL.'), image: 'sc_ihub.png'},
  {text: () => i18n.getMessage('In the IntegrationHub ETL home screen, click Create new.'), image: 'sc_ihub_create.png'},
  {
    text: () =>
      i18n.getMessage(
        'Under Specify Basic Details, click Import Source Data and Provide Basic Details.'
      ),
    image: 'sc_ihub_specify_basic.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'CMDB Application: CMDB Import. Name: e.g. "CMDB Complex Nested". Data Source: the one created in Part 1. Sample Import Set should auto-populate. Preview Size Override: 100. Click Save, then Mark as Complete.'
      ),
    image: 'sc_ihub_provide_basic.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Under Prepare Source Data for Mapping, click Preview and Prepare Data.'
      ),
    image: 'sc_ihub_prepare.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Verify the first tree node fields, then the third node fields (sequence is not important, checking the first few fields is sufficient), then click Mark as Complete.'
      ),
    image: 'sc_ihub_preview_object.png'
  },
  {
    text: () => i18n.getMessage('Verify the third tree node fields similarly.'),
    image: 'sc_ihub_preview_data.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Under Map to CMDB and Add Relationships, click Select CMDB Classes to Map Source Data.'
      ),
    image: 'sc_ihub_map_data_select.png'
  },
  {
    text: () => i18n.getMessage('Click Add Conditional Class.'),
    image: 'sc_ihub_select_class.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Collection: object. If object.table_name is cmdb_ci_linux_server, Then Class = Linux Server. Add a new criteria: if object.table_name is cmdb_ci_win_server, Then Class = Windows Server. Click Save.'
      ),
    image: 'sc_ihub_add_class.png'
  },
  {
    text: () => i18n.getMessage('Set up Mapping for Linux Server 1.'),
    image: 'sc_ihub_select_linux_mapping.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Source Native Key > Source Column: hostname. Name > Source Column: data.name. Product instance identifier: data.name. Serial number: data.site_code. Click back.'
      ),
    image: 'sc_ihub_linux_host.png'
  },
  {
    text: () => i18n.getMessage('The final mapping output for Linux Server 1.'),
    image: 'sc_ihub_linux_final.png'
  },
  {
    text: () => i18n.getMessage('Set up Mapping for Windows Server 1.'),
    image: 'sc_ihub_select_windows_mapping.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Repeat the same field mappings as Linux Server 1 for Windows Server 1.'
      ),
    image: null
  },
  {
    text: () => i18n.getMessage('The final mapping output for Windows Server 1.'),
    image: 'sc_ihub_windows_final.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Click Mark as Complete to finish Select CMDB Classes to Map Source Data.'
      ),
    image: 'sc_ihub_map_data_complete.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Under Map to CMDB and Add Relationships, click Add Relationships.'
      ),
    image: 'sc_ihub_map_data_add.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Leave the relationship blank (just to show the option exists), then click back.'
      ),
    image: 'sc_ihub_map_data_add_complete.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Under Preview Sample Integration Results and Schedule Import, click Test and Rollback Integration Results.'
      ),
    image: 'sc_ihub_preview_sample.png'
  },
  {text: () => i18n.getMessage('Click Run Integration.'), image: 'sc_ihub_run_integration.png'},
  {text: () => i18n.getMessage('Review the integration results.'), image: 'sc_ihub_integration_result.png'},
  {
    text: () => i18n.getMessage('Click back, then click Perform Rollback.'),
    image: 'sc_ihub_rollback_integration.png'
  },
  {
    text: () => i18n.getMessage('Setup of the ETL Transform Map is complete. Click back.'),
    image: 'sc_ihub_complete.png'
  }
];

const CONSUMER_STEPS = [
  {text: () => i18n.getMessage('Go to All, search for Stream Connect Home.'), image: 'sc_sc_home.png'},
  {text: () => i18n.getMessage('Go to Consumers, then click Create.'), image: 'sc_sc_create_consumer.png'},
  {text: () => i18n.getMessage('Select ETL Consumer.'), image: 'sc_sc_etl_consumer.png'},
  {
    text: () =>
      i18n.getMessage(
        'Name: a descriptive name. Robust import set transformer: the Integration Hub ETL created in Part 2.'
      ),
    image: 'sc_sc_rte_consumer.png'
  },
  {text: () => i18n.getMessage('Right-click the header and click Save.'), image: 'sc_data_source_save.png'},
  {
    text: () =>
      i18n.getMessage(
        'In the Kafka RTE Consumer screen, under Kafka Streams, click New.'
      ),
    image: 'sc_sc_new_kafka_stream.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Name: a descriptive name. Topic: wdftosn. Click Activate.'
      ),
    image: 'sc_sc_rte_consumer.png'
  },
  {text: () => i18n.getMessage('Right-click the header and click Save.'), image: 'sc_data_source_save.png'},
  {
    text: () =>
      i18n.getMessage(
        'If configured correctly, the Subscriptions box at the bottom of Kafka Streams shows an active stream.'
      ),
    image: 'sc_sc_active_stream.png'
  },
  {text: () => i18n.getMessage('Press back in the header.'), image: 'sc_sc_kafka_stream_back.png'},
  {
    text: () =>
      i18n.getMessage(
        'In the Kafka RTE Consumer screen, the Kafka Stream shows as active. Press back.'
      ),
    image: 'sc_sc_active_rte.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'In the Stream Connect Consumers section, the ETL shows as active. Click the consumer name.'
      ),
    image: 'sc_sc_active_consumer.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'This shows consumer statistics; optionally click Manage RTE to see the configurations from earlier steps.'
      ),
    image: 'sc_sc_active_consumer_stats.png'
  }
];

const PRODUCER_STEPS = [
  {text: () => i18n.getMessage('Go to All, search for Instance PKI Certificate Generator.'), image: 'sc_producer_pki.png'},
  {
    text: () =>
      i18n.getMessage(
        'Provide a password (minimum 8 characters, e.g. "streamconnect"), then click Configure Acl.'
      ),
    image: 'sc_producer_password_acl.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'In Namespaces, select all namespaces to avoid authorization issues (in a real environment, identify the correct namespace instead).'
      ),
    image: 'sc_producer_select_namespace.png'
  },
  {text: () => i18n.getMessage('Namespaces selected.'), image: 'sc_producer_namespaces_selected.png'},
  {text: () => i18n.getMessage('In Defined Topics, select wdftosn.'), image: 'sc_producer_select_topic.png'},
  {text: () => i18n.getMessage('Topic selected. Click Save.'), image: 'sc_producer_topic_selected.png'},
  {text: () => i18n.getMessage('Generate the certificate.'), image: 'sc_producer_generate_certificate.png'},
  {
    text: () =>
      i18n.getMessage(
        'After a few seconds, click Download Keystore and Download Truststore.'
      ),
    image: 'sc_producer_download_certificate.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Put the downloaded files into a folder called "servicenow_certs" to avoid permission issues.'
      ),
    image: null
  },
  {
    text: () =>
      i18n.getMessage(
        'The next steps can be done in Docker Desktop or on your own machine — Docker-specific steps can be skipped if working locally.'
      ),
    image: null
  },
  {
    text: () =>
      i18n.getMessage(
        'In Docker Desktop, go to Containers and ensure the earlier image is started (green dot). If not, click Start.'
      ),
    image: 'sc_producer_start_container.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Go to Files, navigate to opt > kafka > config > producer.properties, then click Open file editor.'
      ),
    image: 'sc_producer_properties.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Paste the producer.properties content (bootstrap.servers pointing to hermes1, SSL keystore/truststore locations and password matching what you set earlier).'
      ),
    image: 'sc_producer_properties_content.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Still in Files, navigate to opt > kafka > config, right-click any file, then click Import.'
      ),
    image: 'sc_producer_import_cert.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Navigate to the servicenow_certs folder from earlier and select it (do not double-click).'
      ),
    image: 'sc_producer_import_cert_upload.png'
  },
  {text: () => i18n.getMessage('Go to the Exec portion of the Docker image.'), image: 'sc_producer_exec.png'},
  {
    text: () =>
      i18n.getMessage(
        'Copy the downloaded certificates into place with cp commands, matching filenames carefully — they may vary.'
      ),
    image: null
  },
  {
    text: () =>
      i18n.getMessage(
        'The Kafka Producer is now ready to securely connect with the ServiceNow instance.'
      ),
    image: null
  }
];

const SEND_MESSAGE_STEPS = [
  {
    text: () =>
      i18n.getMessage(
        'In the Exec portion of the Docker image, connect to ServiceNow Stream Connect using kafka-console-producer.sh with the topic, producer config, and bootstrap servers.'
      ),
    image: null
  },
  {
    text: () =>
      i18n.getMessage(
        'If working correctly, a line with ">" and a blinking cursor appears.'
      ),
    image: 'sc_producer_connect.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Send a message using the provided JSON template, modifying the name and site_code with your initials and the date to make it unique.'
      ),
    image: null
  },
  {
    text: () => i18n.getMessage('If sent successfully, the ">" prompt returns.'), image: 'sc_producer_message_sent.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Back in ServiceNow, go to All, type cmdb_ci_win_server.list, and hit Enter.'
      ),
    image: 'sc_producer_servers.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Add the Updated field via Update Personalized List (gear icon), sort it descending, and look for the server you just created.'
      ),
    image: 'sc_producer_servers_validate.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'If successful, go back to the Docker image and press Ctrl+C (or Cmd+C on Mac) to cancel the message-sending session, then stop or remove the container.'
      ),
    image: 'sc_producer_cleanup.png'
  },
  {
    text: () =>
      i18n.getMessage(
        'Congratulations on building your Kafka Stream Connect integration with ServiceNow!'
      ),
    image: null
  }
];

@customElement('x-snc-wdf-lab-kafka-stream-connect-page')
export default class KafkaStreamConnectPage extends AIUXElement {
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
      i18n.getMessage('Lab Exercise: Stream Connect for Apache Kafka Lab')
    );
  }

  static async loader(ctx) {
    return {basePath: ctx.basePath};
  }

  render() {
    const {basePath} = this.loaderData || {};
    const asset = path => `${basePath.replace(/^\/aiux/, '')}/public/wdf/kafka-stream-connect/${path}`;

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
            ${i18n.getMessage('Hungry for more?')}
          </span>
          <h2 class="text-3xl font-bold text-text-primary">
            ${i18n.getMessage('Lab Exercise: Stream Connect for Apache Kafka Lab')}
          </h2>
          <div class="flex flex-wrap gap-2">
            <span class="aiux-badge aiux-badge-error aiux-badge-soft"
              >${i18n.getMessage('Advanced')}</span
            >
            <span class="aiux-badge aiux-badge-ghost"
              >${i18n.getMessage('AI agents involved')}</span
            >
            <span class="aiux-badge aiux-badge-ghost"
              >${i18n.getMessage('1 hour')}</span
            >
          </div>
        </header>

        <section class="flex flex-col gap-4">
          <figure>
            <picture>
              <source
                srcset="${asset('wdf_connectors_banner_dark.png')}"
                media="(prefers-color-scheme: dark)"
              />
              <img
                src="${asset('wdf_connectors_banner.png')}"
                alt="${i18n.getMessage('Workflow Data Fabric')}"
                class="w-full rounded-xl"
              />
            </picture>
          </figure>

          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Business motivation')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Real-time visibility and agility are critical for making informed business decisions. Traditional integration methods relying on scheduled jobs or polling introduce delays, data inconsistencies, and operational inefficiencies.'
            )}
          </p>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Stream Connect for Apache Kafka transforms how ServiceNow interacts with external systems by enabling event-driven data exchange — publishing and subscribing to data streams so key business events are communicated instantly across systems.'
            )}
          </p>
          <ul class="list-disc space-y-1 pl-6 text-base text-text-secondary">
            <li>${i18n.getMessage('Accelerate decision-making with up-to-the-minute data.')}</li>
            <li>${i18n.getMessage('Reduce integration overhead by eliminating batch processing and manual synchronization.')}</li>
            <li>${i18n.getMessage('Enhance operational resilience through real-time monitoring and automated responses.')}</li>
            <li>${i18n.getMessage('Enable scalable digital transformation by integrating with modern event-streaming platforms like Apache Kafka.')}</li>
          </ul>

          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Story so far and persona context')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              "You have already created an Action, a Flow, Zero Copy Integrations, and AI Agents for your Finance team's proactive budget handling. The organization now wants you to get asset data from the various cost centers and register it to the CMDB."
            )}
          </p>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              "In this lab, you'll step into the role of an Integration Architect or Integration Developer responsible for designing high-performance, event-driven integrations — configuring Stream Connect for Apache Kafka to ingest CMDB data from Kafka producers."
            )}
          </p>

          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Outcome')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'By completing this lab, you will gain practical experience implementing real-time, scalable integrations that support modern enterprise use cases, enabling faster insights, proactive operations, and a more connected digital business.'
            )}
          </p>

          <div class="aiux-alert aiux-alert-warning aiux-alert-soft">
            <span>
              ${i18n.getMessage(
                'Access prerequisite: this lab uses hermes1, a ServiceNow instance accessible only to ServiceNow internal employees via HOP. It is still useful for non-internal employees as a framework and technical reference for a Consumer scenario. Fully provisioned environments are available through ServiceNow-led workshops — contact your representative given the lead time required.'
              )}
            </span>
          </div>

          <h4 class="text-lg font-semibold text-text-primary">
            ${i18n.getMessage('Set-up prerequisites')}
          </h4>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'Recommended: get a free Docker account, install Docker Desktop, pull the apache/kafka latest image, and run it — this reduces effort in building the Kafka Producer used in Part 5. Alternatively, set up Apache Kafka directly on your local machine (JVM 17+) following the Apache Kafka quickstart guide.'
            )}
          </p>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Part 1: Creating a data source')}
          </h3>
          ${renderSteps(DATA_SOURCE_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Part 2: Creating the transformation (ETL)')}
          </h3>
          ${renderSteps(ETL_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Part 3: Setting up the consumer in Stream Connect')}
          </h3>
          ${renderSteps(CONSUMER_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Part 4: Setting up a Kafka Producer')}
          </h3>
          ${renderSteps(PRODUCER_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Part 5: Sending messages from Kafka Producer')}
          </h3>
          ${renderSteps(SEND_MESSAGE_STEPS)}
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Part 6: Additional Resources')}
          </h3>
          <ul class="list-disc space-y-1 pl-6 text-base text-text-secondary">
            <li>${i18n.getMessage('Stream Connect for Apache Kafka Data Sheet')}</li>
            <li>${i18n.getMessage('Stream Connect for Apache Kafka Overview (ServiceNow University course)')}</li>
            <li>${i18n.getMessage('Stream Connect Quick Start Guide')}</li>
          </ul>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold text-text-primary">
            ${i18n.getMessage('Acknowledgement')}
          </h3>
          <p class="text-base leading-relaxed text-text-secondary">
            ${i18n.getMessage(
              'The use case which is the basis of this lab is created by Kamal Shewakramani.'
            )}
          </p>
        </section>



        <a class="aiux-btn aiux-btn-outline w-fit" href="${basePath}/home">
          ${i18n.getMessage('Take me back to main page')}
        </a>
      </div>
    `;
  }
}
