import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'aiux-color-swatch|wdf-lab': {
                        table: 'sys_aix_color_swatch'
                        id: '3eb64c1b9148bf302111fca9fd31e2bb'
                        deleted: false
                    }
                    'aiux-dependency|build-agent-chat.js': {
                        table: 'sys_aix_dependency'
                        id: '19952c035770a3696c8f1d85e4c007cc'
                        deleted: true
                    }
                    'aiux-dependency|document-title.js': {
                        table: 'sys_aix_dependency'
                        id: '4dda3c22972cde5ff3bb7de2044d2277'
                        deleted: false
                    }
                    'aiux-dependency|toc.js': {
                        table: 'sys_aix_dependency'
                        id: '64660b0cb996d59927d49f126aefd78e'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-coming-soon-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: 'd1f038ca309e114917529d8b931fb1e6'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-demo-hub-considerations-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '8bc6210c13b76ef3f1e82f1f31d5fd5c'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-diagrams-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '14b44c98ec41c10fab4b357adf27a3c2'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-external-content-connector-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '3584400c8671e992dc7035b871bceaca'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-final-activity-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '7568835c05e4c99f5208f5df213bd814'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-for-facilitators-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '431f7afedb2823cbf321762ec96bbf42'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-fundamentals-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: 'e98de7619d6f676ffc36974965f3d7a0'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-home-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: 'f11d1b92e6b1ca819de4cd157cd5bb00'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-integration-hub-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '0c1bccade71a423500c7d68b5187f97d'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-kafka-stream-connect-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '393cd14e19861fba8ed0bbafc5e05005'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-key-takeaways-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: 'd5eb4614d3d29e77814f807f68d28643'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-lens-and-document-intelligence-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: 'c55fbcacdd64d2f33ae238d932daea6b'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-mcp-server-client-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '80fad55b7153d1974e50dab854b8e9a7'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-troubleshooting-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: 'c657b4a6a875114e401a9e61c0be530c'
                        deleted: false
                    }
                    'aiux-experience-page-rel|x-snc-wdf-lab-zero-copy-connectors-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: 'cc777d4da3f6d181828eb2412335174e'
                        deleted: false
                    }
                    'aiux-experience-prop|appHeadCss': {
                        table: 'sys_aix_experience_properties'
                        id: 'beb3f3ec6f5e0779349cd7192f99d1c7'
                        deleted: false
                    }
                    'aiux-experience-prop|appTailwindCss': {
                        table: 'sys_aix_experience_properties'
                        id: '6d6633d4774f9e3a38b19edc9e689e7b'
                        deleted: false
                    }
                    'aiux-experience|wdf-lab': {
                        table: 'sys_aix_experience'
                        id: '58121a22b9f8524797eec460af16cdee'
                        deleted: false
                    }
                    'aiux-layout-widget|lifecycle': {
                        table: 'sys_aix_widget'
                        id: '97ff2e940d733d0131b24003ea9343a9'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-coming-soon-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '7ea912868c9bdf3138857b65f7c15c5f'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-coming-soon-page|toc.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '59a8a92d969ba07fbbddc119f77a7229'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-demo-hub-considerations-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '1285a7002ac73f18ae90ea3dbd4615fe'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-diagrams-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '14033d724c04b60c8e4917a542f507e5'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-external-content-connector-page|build-agent-chat.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '50d32132d7523cb72f5fb92fca402f07'
                        deleted: true
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-external-content-connector-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: 'c3a4b098c8a9dd1868ce65faf49a8e85'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-final-activity-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '7dbb7848fc8f8bd61e1bc11972a0fe94'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-for-facilitators-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '89fb7dc97d349cc9e1b2edf49d3ee76f'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-fundamentals-page|build-agent-chat.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '2caf568613c2e1824a7e53907cc7b9af'
                        deleted: true
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-fundamentals-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '41f0821b928c2abcb7b021bbc8ebce9b'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-home-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '90e88ee310e99c3e3b83d705ed176cc4'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-home-page|toc.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: 'd3d6485fc471ff14e8104481dfbf0226'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-integration-hub-page|build-agent-chat.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: 'f52d8ec55de44a2579ccc5622a30e698'
                        deleted: true
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-integration-hub-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '7d35ce4c7921ae0aefc7408adca26c4e'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-kafka-stream-connect-page|build-agent-chat.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: 'd2d66d835f0a79998d426b4dd2eecb14'
                        deleted: true
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-kafka-stream-connect-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: 'ecef4065dd7c90e24963c81ba1501e26'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-key-takeaways-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: 'f228126f5d3c6d7a12c495821f9a09ac'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-lens-and-document-intelligence-page|build-agent-chat.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '757263e8f5ee95ec7d5f00f1218fc427'
                        deleted: true
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-lens-and-document-intelligence-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '19f88b562aab282397cc7f31faec1eed'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-mcp-server-client-page|build-agent-chat.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '5dba3211b57ffa793d3f905acc1ef0c9'
                        deleted: true
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-mcp-server-client-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: '76f38162b57b4d8fbe2a3c57e96b8c12'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-troubleshooting-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: 'e42ca7f7f661a12ec67c348c55832ca6'
                        deleted: false
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-zero-copy-connectors-page|build-agent-chat.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: 'c8940abc620f6ef9924e0f3049a8fef9'
                        deleted: true
                    }
                    'aiux-m2m-widget-dep|x-snc-wdf-lab-zero-copy-connectors-page|document-title.js': {
                        table: 'sys_aix_m2m_widget_dependency'
                        id: 'd56dfe3712011889813bb7ef6240f9f9'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-coming-soon-page': {
                        table: 'sys_aix_widget'
                        id: '463d728c550e9fb2341a453c41ff9336'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-demo-hub-considerations-page': {
                        table: 'sys_aix_widget'
                        id: 'd4bd59d00ec3b832ccea55c57255aaef'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-diagrams-page': {
                        table: 'sys_aix_widget'
                        id: '833fda4b325bb3376401a2b9dca5ddd8'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-external-content-connector-page': {
                        table: 'sys_aix_widget'
                        id: '2a8d03ac3c21008e3488b014e9491566'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-final-activity-page': {
                        table: 'sys_aix_widget'
                        id: '48c4c3437ec30f2b754abe70bedd31be'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-for-facilitators-page': {
                        table: 'sys_aix_widget'
                        id: '30c9c5ddf8e0e0c16238644191de6ca6'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-fundamentals-page': {
                        table: 'sys_aix_widget'
                        id: '881773e655bbd9a4a703caf647f8abb4'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-home-page': {
                        table: 'sys_aix_widget'
                        id: 'c9256010cf25ecad4dc82d234f6eb1d2'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-integration-hub-page': {
                        table: 'sys_aix_widget'
                        id: '8093a0d3be97260ec56a392cdb7abcf6'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-kafka-stream-connect-page': {
                        table: 'sys_aix_widget'
                        id: 'a0c71200e766b9c96ea8b88b6231584d'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-key-takeaways-page': {
                        table: 'sys_aix_widget'
                        id: '0bd83d65116c9551f7cf4ec6316db127'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-lens-and-document-intelligence-page': {
                        table: 'sys_aix_widget'
                        id: '8a039dddc5275de3b950e1a93c27ac2f'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-mcp-server-client-page': {
                        table: 'sys_aix_widget'
                        id: 'bb5887219d7c890b69eda66968de60c3'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-troubleshooting-page': {
                        table: 'sys_aix_widget'
                        id: 'b6c5a34ce6ba800a0616468e6d9ad3a6'
                        deleted: false
                    }
                    'aiux-page-widget|x-snc-wdf-lab-zero-copy-connectors-page': {
                        table: 'sys_aix_widget'
                        id: '9f1f3ce46d70e7d6eac07052822e097e'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-coming-soon-page': {
                        table: 'sys_aix_page'
                        id: '000fc36477caffe4b4ae418983f09705'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-demo-hub-considerations-page': {
                        table: 'sys_aix_page'
                        id: '23cec22fe9191ad79ac4656657a734c7'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-diagrams-page': {
                        table: 'sys_aix_page'
                        id: '09f55957d047af2f79531120ff7f585e'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-external-content-connector-page': {
                        table: 'sys_aix_page'
                        id: '8ffb33d88ca9eb249de2c5aa328d01ba'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-final-activity-page': {
                        table: 'sys_aix_page'
                        id: 'dba06e1f3de04e23e68ffd94da9397e6'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-for-facilitators-page': {
                        table: 'sys_aix_page'
                        id: '78b5a974bc45705ce2b852937180d38d'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-fundamentals-page': {
                        table: 'sys_aix_page'
                        id: 'f90f37151969627871226c94990f5a45'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-home-page': {
                        table: 'sys_aix_page'
                        id: '04d66fe62374a3214f66d0bbf7210aa5'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-integration-hub-page': {
                        table: 'sys_aix_page'
                        id: 'e9ff2801658832457697ece6ce5d9926'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-kafka-stream-connect-page': {
                        table: 'sys_aix_page'
                        id: 'd253df55319a97fcfe38404674def70f'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-key-takeaways-page': {
                        table: 'sys_aix_page'
                        id: 'a6f46a9d262c2982bc3fdf47ccd4782a'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-lens-and-document-intelligence-page': {
                        table: 'sys_aix_page'
                        id: '3b0f797244b3f8007d316366b200dfdb'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-mcp-server-client-page': {
                        table: 'sys_aix_page'
                        id: 'adf989a90b6d793ae29fbadb75d6782e'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-troubleshooting-page': {
                        table: 'sys_aix_page'
                        id: 'c7e80fc28db6cbf76409d91f2b0c58d8'
                        deleted: false
                    }
                    'aiux-page|x-snc-wdf-lab-zero-copy-connectors-page': {
                        table: 'sys_aix_page'
                        id: '4ccd5f42d9fca4bcd26b4e9f63992eac'
                        deleted: false
                    }
                    'aiux-project|x_snc_forecast_v_0': {
                        table: 'sys_aix_project'
                        id: '45d838ba91a75970fcee4ab1e1cd7a84'
                        deleted: false
                    }
                    'aiux-theme|wdf-lab': {
                        table: 'sys_aix_theme'
                        id: '9d0327647744bf643fc6cfdb15e37933'
                        deleted: false
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'e0a8ebc204ef4275a87622b958e5ae22'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '3630114b7d714ec294565f9a7dc13f1b'
                    }
                    studio_skills_assistant_agent: {
                        table: 'sn_aia_agent'
                        id: '116a31874a154caaa19a6f5270288c60'
                    }
                    studio_skills_assistant_agent_acl: {
                        table: 'sys_security_acl'
                        id: 'b119a3a707334b798092473bf93f298b'
                    }
                    'virtual-on/square.css': {
                        table: 'sys_ux_theme_asset'
                        id: 'd0ec9bdc39924703a6eead1c89b9f8ee'
                        deleted: true
                    }
                    'virtual-on/wide.css': {
                        table: 'sys_ux_theme_asset'
                        id: 'cc424bf7fde94b7b8a136fc2a10cf12c'
                    }
                    'wdf-lab/public/virtual-on/servicenow-mark-lineart.png': {
                        table: 'db_image'
                        id: '7759cf5d5862468986c60ec59ef80f2d'
                    }
                    'wdf-lab/public/wdf/conclusion/kahoot_hype_screen_dark.png': {
                        table: 'db_image'
                        id: 'cff789799de547e481e5fd1dbfcfb036'
                    }
                    'wdf-lab/public/wdf/conclusion/kahoot_hype_screen_light.png': {
                        table: 'db_image'
                        id: '3e077505bf3c4d4baf2843eb27bbebc2'
                    }
                    'wdf-lab/public/wdf/conclusion/sc_slide_key_takeaways.png': {
                        table: 'db_image'
                        id: '71904f923d4243c0ba9468f54dc073fd'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_demohub_alectri_category.png': {
                        table: 'db_image'
                        id: '5303e089a6d44082a2e12a841263446b'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_demohub_instance_form.png': {
                        table: 'db_image'
                        id: '74055041fc154478ad845fa100b0942a'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_demohub_instance_ready_email.png': {
                        table: 'db_image'
                        id: 'dca26fcd6bc046398b474d2c9eee34a7'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_demohub_instances_available_br.png': {
                        table: 'db_image'
                        id: 'ccf1a08d9b0c49e68f5c7ce728c640d5'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_demohub_manage_instances.png': {
                        table: 'db_image'
                        id: '8bad694394e34163919a8046a3aca32d'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_demohub_no_instances_au.png': {
                        table: 'db_image'
                        id: '1923283b177c4866a8685244204742dc'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_demohub_request_instance.png': {
                        table: 'db_image'
                        id: 'c3baa5ab2a01495094f59752dfd5e078'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_demohub_stats_build_tag.png': {
                        table: 'db_image'
                        id: '473999355fed49dcbfc817bdf24afb47'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_demohub_submit.png': {
                        table: 'db_image'
                        id: '892eaac9857547338f30da3d9302da90'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_fund_cat_complete.png': {
                        table: 'db_image'
                        id: '0a776339aa1c4716853edf12f7c49d30'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_fund_cat_item.png': {
                        table: 'db_image'
                        id: '678fe3216ad44afebbd9977c76ac1ce4'
                    }
                    'wdf-lab/public/wdf/demo-hub/sc_fund_stats.png': {
                        table: 'db_image'
                        id: 'c39c27ff837448f8afd9d32101e3fd40'
                    }
                    'wdf-lab/public/wdf/diagrams/dataflow_backend_components.png': {
                        table: 'db_image'
                        id: 'f40b7fc71f8a4c8cb3c28f7e403e7762'
                    }
                    'wdf-lab/public/wdf/diagrams/dataflow_complete_landscape.png': {
                        table: 'db_image'
                        id: '8c0f4217115b40799e9b2918a62703d0'
                    }
                    'wdf-lab/public/wdf/diagrams/dataflow_prerequisites.png': {
                        table: 'db_image'
                        id: '411943f0941a4dad8c4d1496bdde454f'
                    }
                    'wdf-lab/public/wdf/diagrams/dataflow_user_interaction.png': {
                        table: 'db_image'
                        id: '35ba375df98f4a33b99eb9a4b254b04b'
                    }
                    'wdf-lab/public/wdf/diagrams/sc_slide_lab_dependencies.png': {
                        table: 'db_image'
                        id: 'da43d01d7a4a473abc4233b15109a5e2'
                    }
                    'wdf-lab/public/wdf/external-content-connector/dataflow_external_content_connector.png': {
                        table: 'db_image'
                        id: 'a9b0d17096b741428938e9cd074adb5c'
                    }
                    'wdf-lab/public/wdf/external-content-connector/dataflow_outcome_agent_flow_external_content_dark.png': {
                        table: 'db_image'
                        id: '48556d262919494993e2286852f509c8'
                    }
                    'wdf-lab/public/wdf/external-content-connector/dataflow_outcome_agent_flow_external_content.png': {
                        table: 'db_image'
                        id: '22916c125c6349e5935372b748fbb7da'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_common_agent_studio_users_nav.png': {
                        table: 'db_image'
                        id: 'fa2a0ef1ed4c42588915896bba4eb0b6'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_common_logout.png': {
                        table: 'db_image'
                        id: 'fc4dc4a200314b238e0844f9f1a8edb1'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_common_search_admin_user.png': {
                        table: 'db_image'
                        id: 'a73bd266b4df483a98a507a254451787'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_ldi_scope_global.png': {
                        table: 'db_image'
                        id: '61e08360d38a4008a300b7e159067133'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_slide_xcc_demo_preview.png': {
                        table: 'db_image'
                        id: '25cb81e8144141c6ab3dad86126d32a6'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_slide_xcc_overview.png': {
                        table: 'db_image'
                        id: '7d82624364e64e16b5feeb03a5db560c'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_connection_config.png': {
                        table: 'db_image'
                        id: '4d8c4c18226e4aea8985b27a8dddefc9'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_connection_success.png': {
                        table: 'db_image'
                        id: '62a22ca24469465b80e67f283131eaa2'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_crawl_proceed.png': {
                        table: 'db_image'
                        id: '46a198b6c0584b3f9e7c3fda0bf89fd3'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_crawl_save.png': {
                        table: 'db_image'
                        id: 'cccbec9e5e884e569d6fdf7739ed26c9'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_crawl_settings.png': {
                        table: 'db_image'
                        id: '86c2d8f509a5426cae580c864b5716d9'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_crawls_complete.png': {
                        table: 'db_image'
                        id: '54800a560a7f46b9b051644f38d2b209'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_deselect_ais_role.png': {
                        table: 'db_image'
                        id: '52db5a58bcea4fcc9321f3d54a892853'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_elevate_role_menu.png': {
                        table: 'db_image'
                        id: 'c5a8e1d91dc2414e8ce585cf24a05389'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_elevate_select_ais.png': {
                        table: 'db_image'
                        id: '16bd73c7222342ceb00c697b050c2ba7'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_employee_center_home.png': {
                        table: 'db_image'
                        id: '3e34379a435746d6bd05d08a834f3e5d'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_employee_center_nav.png': {
                        table: 'db_image'
                        id: 'cb7609ebf14e431a970616c852688029'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_full_crawl_options.png': {
                        table: 'db_image'
                        id: '24c99867f38845b8a06591ba2054d602'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_home_create.png': {
                        table: 'db_image'
                        id: '07b88fceab8f435da57ae52499f4afce'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_mapping_test.png': {
                        table: 'db_image'
                        id: '80dd4313815e4d0fa9ac9fd916ab7f6d'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_now_assist_query.png': {
                        table: 'db_image'
                        id: 'f1a5f563ac6543a192731fd6413f0895'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_overbudget.png': {
                        table: 'db_image'
                        id: 'a62aaca07920440687efac4d47e7a42e'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_prep_add_ais_role.png': {
                        table: 'db_image'
                        id: '3d7e9bd8199e42b58381d0d95ca49574'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_prep_email_roles_edit.png': {
                        table: 'db_image'
                        id: 'e3b520f413664f9fa76a1d31e520cde0'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_prep_save.png': {
                        table: 'db_image'
                        id: '97b0c66cd0c548118eb417fac9926a6e'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_response_detail.png': {
                        table: 'db_image'
                        id: '49105ce083194d1f96abdc9f9f0fdf55'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_select_source_sharepoint.png': {
                        table: 'db_image'
                        id: 'b06e4fe2c1ed4206bfa7deb3c15a710f'
                    }
                    'wdf-lab/public/wdf/external-content-connector/sc_xcc_xcc_home.png': {
                        table: 'db_image'
                        id: '5727239df9f141a3a566a52677a7977f'
                    }
                    'wdf-lab/public/wdf/fundamentals/dataflow_fundamentals.png': {
                        table: 'db_image'
                        id: '5e4aa19e434a4d35ba1168ec48790a2e'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_demohub_stats_build_tag.png': {
                        table: 'db_image'
                        id: 'db4b531617be4a0992ac115ca8b56211'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_all_fields.png': {
                        table: 'db_image'
                        id: 'cf0b319cf55e4ddd9b318af5c9e1bd0c'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_cat_complete.png': {
                        table: 'db_image'
                        id: 'ce6c04b4f8b04d1abf1f2cdbbaf864d2'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_cat_item.png': {
                        table: 'db_image'
                        id: '33f1b30799094088a7effddc49335a4d'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_create_scope.png': {
                        table: 'db_image'
                        id: '36f40f8fa37641c1a6db24db911779b0'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_dummy_scope_create.png': {
                        table: 'db_image'
                        id: '55c0512c4b2342cbaf70e31dfb9a2be1'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_field_details.png': {
                        table: 'db_image'
                        id: '70cfc6d67d8c403c8c8c943790aeef11'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_forcast_variance_dummy.png': {
                        table: 'db_image'
                        id: '6fad70746ca8437889571fd2f62f1598'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_forcast_variance_scope.png': {
                        table: 'db_image'
                        id: '1a0ca00b25994b57ae756473eccf37ac'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_new_field.png': {
                        table: 'db_image'
                        id: 'a737dab3700c4b53a95e34d0f129ea75'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_new_scope.png': {
                        table: 'db_image'
                        id: '00c31eb4059b4bdb83ed45b73a323836'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_new_table_details.png': {
                        table: 'db_image'
                        id: 'e790ebaf2ead4779a3ab405115496e82'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_new_table.png': {
                        table: 'db_image'
                        id: '76c09cce38874e2c97ff66359e68b005'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_save.png': {
                        table: 'db_image'
                        id: '1c109445ad23401eae521870aad33fcb'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_scope_change.png': {
                        table: 'db_image'
                        id: '2937459af0944524ab1ebd752440e9dd'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_stats.png': {
                        table: 'db_image'
                        id: '52b932c7142545d3bd6a74cb49858584'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_fund_sysdef_tables_nav.png': {
                        table: 'db_image'
                        id: '7363f636d2514bee947d3a1936b24c36'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_slide_e2e_architecture.png': {
                        table: 'db_image'
                        id: '99a1e73855934d24874a4fc11bde68b1'
                    }
                    'wdf-lab/public/wdf/fundamentals/sc_slide_fundamentals_overview.png': {
                        table: 'db_image'
                        id: 'bfeab22b650e489d838ce616ab189a22'
                    }
                    'wdf-lab/public/wdf/home/dataflow_outcome_agent_flow_dark.png': {
                        table: 'db_image'
                        id: '0bb89cc30d544f8dafef5b8b9ae38666'
                    }
                    'wdf-lab/public/wdf/home/dataflow_outcome_agent_flow.png': {
                        table: 'db_image'
                        id: 'e3c628ff8d4248dfb9095d39082ec739'
                    }
                    'wdf-lab/public/wdf/home/sc_readme_hero.png': {
                        table: 'db_image'
                        id: '67d70f2ff4744c678938d923405f43ec'
                    }
                    'wdf-lab/public/wdf/home/sc_slide_building_for_whom.gif': {
                        table: 'db_image'
                        id: 'f5f9610fb52542418acb8e9fe8d070cd'
                        deleted: true
                    }
                    'wdf-lab/public/wdf/home/sc_slide_building_for_whom.png': {
                        table: 'db_image'
                        id: '5ccf75bba8c74fb8a7fcbaa2ab03fe20'
                    }
                    'wdf-lab/public/wdf/home/sc_slide_how_this_workshop_works.png': {
                        table: 'db_image'
                        id: '5e44bd4e7ca340188d39f5ab186ee679'
                    }
                    'wdf-lab/public/wdf/home/wdf_connectors_banner_dark.gif': {
                        table: 'db_image'
                        id: '67d45ea0cfba459cbf1f46e9d134fbe1'
                        deleted: true
                    }
                    'wdf-lab/public/wdf/home/wdf_connectors_banner_dark.png': {
                        table: 'db_image'
                        id: '906d179f31e64aa3bc456b0d4481da8a'
                    }
                    'wdf-lab/public/wdf/home/wdf_connectors_banner.gif': {
                        table: 'db_image'
                        id: '6c367769c88843e791c20088b0ff5964'
                        deleted: true
                    }
                    'wdf-lab/public/wdf/home/wdf_connectors_banner.png': {
                        table: 'db_image'
                        id: '30f7b2267ae847de838a62f6d4e1e7f8'
                    }
                    'wdf-lab/public/wdf/integration-hub/dataflow_integration_hub.png': {
                        table: 'db_image'
                        id: '74f05f44f660437db45f05a580d0dbcf'
                    }
                    'wdf-lab/public/wdf/integration-hub/dataflow_outcome_agent_flow_integration_hub_dark.png': {
                        table: 'db_image'
                        id: 'a1b29f0fb67a4daaa8c156af6463a2d3'
                    }
                    'wdf-lab/public/wdf/integration-hub/dataflow_outcome_agent_flow_integration_hub.png': {
                        table: 'db_image'
                        id: 'd43078ab534e4ab6abcd9c0e7777ff0d'
                    }
                    'wdf-lab/public/wdf/integration-hub/image (1).png': {
                        table: 'db_image'
                        id: '33f14662d2cf4afc8048af7590ec6d83'
                    }
                    'wdf-lab/public/wdf/integration-hub/image (2).png': {
                        table: 'db_image'
                        id: '822ce0fc21fb4703a7eb5f528efaa100'
                    }
                    'wdf-lab/public/wdf/integration-hub/image (3).png': {
                        table: 'db_image'
                        id: '244cedfc027c4bceb633c55bddb2711e'
                    }
                    'wdf-lab/public/wdf/integration-hub/image (4).png': {
                        table: 'db_image'
                        id: 'a5b912944f3a4a4d8be048b92a1522b2'
                    }
                    'wdf-lab/public/wdf/integration-hub/image.png': {
                        table: 'db_image'
                        id: '10b176b2108249b980be3b570444ba32'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_common_agent_studio_create_manage.png': {
                        table: 'db_image'
                        id: '1e1cc369033146a18bb5b605c6be63f8'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_common_agent_studio_users_nav.png': {
                        table: 'db_image'
                        id: '944d989bd8af46acaf00ec84fd3ef7af'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_common_conn_cred_aliases_nav.png': {
                        table: 'db_image'
                        id: 'e737a5e1f2f64a98a453741bbe5ef1dd'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_common_expense_event_nav.png': {
                        table: 'db_image'
                        id: '74249ae14ab94a50a1f0577ca1dc99e0'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_common_fow_nav.png': {
                        table: 'db_image'
                        id: 'ac66e9ebff5c4f218b482fc4f03bb2c3'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_common_fow_system_user.png': {
                        table: 'db_image'
                        id: '06a068b54aaf4ccb91aced2efb7b5b7a'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_common_logout.png': {
                        table: 'db_image'
                        id: '42e7cc6245a94a76b557c060ef324e20'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_common_roles_tab_edit.png': {
                        table: 'db_image'
                        id: '62d6aa5b08bd48e09f64b823bd1952e9'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_common_save_and_continue (1).png': {
                        table: 'db_image'
                        id: '2323882569f24eeb9888bed74466de7c'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_common_search_admin_user.png': {
                        table: 'db_image'
                        id: '81e9823badbd4c5aae53ef6b27dbc573'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_fund_exercise_scope.png': {
                        table: 'db_image'
                        id: 'd16417fedf5045a19403235cbdfcab2b'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_action_details.png': {
                        table: 'db_image'
                        id: 'ad268fa934744e069de9da425f1d45c8'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_action_list.png': {
                        table: 'db_image'
                        id: '3e1cf7c5e5fb4081acac338dc6b84620'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_action_output.png': {
                        table: 'db_image'
                        id: 'd5c0fc109dcd41c4a72d38255937708c'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_action_search.png': {
                        table: 'db_image'
                        id: 'd7b71ee3891f438b824f71658620f834'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_add_tools_info.png': {
                        table: 'db_image'
                        id: '58c1f7b44aaf4bbcb2a60465719dc0e0'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_agent_results_overview.png': {
                        table: 'db_image'
                        id: 'ec9937f046434036a5be4c7bab28c472'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_ai_studio_search.png': {
                        table: 'db_image'
                        id: 'ef133ac60ae3425e9fa4e4bff3412c7a'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_connection_url_submit.png': {
                        table: 'db_image'
                        id: 'add915d3a6c94ffeb22cf5737bf95ecd'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_connections_new.png': {
                        table: 'db_image'
                        id: '8c80cf2a11304031827baaa271c00cdc'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_define_security.png': {
                        table: 'db_image'
                        id: 'f950cbf627d64e888a3178cd73aecd7a'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_define_specialty.png': {
                        table: 'db_image'
                        id: '4c0d7ab82ea14b8dba6f223867d0fb50'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_define_trigger_view.png': {
                        table: 'db_image'
                        id: '95b42d85920042e5a377deb4befe8613'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_expense_event_delete.png': {
                        table: 'db_image'
                        id: '43c3aaec73db49799cd16b2d4f6d05f8'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_finance_case_list.png': {
                        table: 'db_image'
                        id: 'a51a967e40c14371896dc683b62a1c97'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_flow_designer_nav.png': {
                        table: 'db_image'
                        id: 'aa5f7c7edd2c4d6eba75a0b05bdd12cf'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_flow_search.png': {
                        table: 'db_image'
                        id: '1ea279aa2cdd4a63bccdc97119790ba0'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_get_expense_event.png': {
                        table: 'db_image'
                        id: '4538715d7b8040388088a7cecf724a61'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_home.png': {
                        table: 'db_image'
                        id: '078caeec8048441c967da6328e35322b'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_now_assist_badge_notification.png': {
                        table: 'db_image'
                        id: '5b623b5bdad04096984451dbe464b845'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_now_assist_chat_expand.png': {
                        table: 'db_image'
                        id: 'b8099ae50a364e1e8a1867f1d8b5c759'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_now_assist_panel.png': {
                        table: 'db_image'
                        id: '38fc1cd8fe904a979db3156953d2f050'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_roles_sn_aia_save.png': {
                        table: 'db_image'
                        id: 'ff0bda00987c42838fa2d87135f1e115'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_search_get_expense_event.png': {
                        table: 'db_image'
                        id: 'e93d77faa412484ab4fb60f6d4f37647'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_select_channels.png': {
                        table: 'db_image'
                        id: '8e3494dbbf86450a9944cca78e98caad'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_test_flow.png': {
                        table: 'db_image'
                        id: 'bc71fb65909e49ffa29ae61b5aea52ca'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_test_link.png': {
                        table: 'db_image'
                        id: '5ec96542cc7e4a5e8769830a5619d99c'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_test_results.png': {
                        table: 'db_image'
                        id: '2fafa764f7c443a8b1d860db9838ece9'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_test_run.png': {
                        table: 'db_image'
                        id: '751dd944b53d43fab2f8e3624b0ec5af'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_trigger_delete_add.png': {
                        table: 'db_image'
                        id: '19ac4a5ae9fa43b2896d81c59bb8d424'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_trigger_details_1.png': {
                        table: 'db_image'
                        id: 'e4aa383398fc4da2ae2a479c977679d4'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_ihub_trigger_details_2.png': {
                        table: 'db_image'
                        id: '99f6f5e436e540c9b01c4ee68e8cc2b4'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_slide_inthub_demo_preview.png': {
                        table: 'db_image'
                        id: '32f1fcab09924a128a1ee73a612bdb22'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_slide_inthub_overview.png': {
                        table: 'db_image'
                        id: '3539fef0dd3d4c20bb0a276319f29afc'
                    }
                    'wdf-lab/public/wdf/integration-hub/sc_xcc_prep_save.png': {
                        table: 'db_image'
                        id: '584129d8594a492dabe43224fab18dc6'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_data_source_create.png': {
                        table: 'db_image'
                        id: '70d6a3931e494ae58832c55de588cf84'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_data_source_json.png': {
                        table: 'db_image'
                        id: '0760cbe6d98041b5915cee38e7974c45'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_data_source_new.png': {
                        table: 'db_image'
                        id: 'c6db8c6739474fccb5106c5ac67761b9'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_data_source_save.png': {
                        table: 'db_image'
                        id: 'bd1f9a3f73eb4926a1715b066ef85ee1'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_data_source_start.png': {
                        table: 'db_image'
                        id: '5341a638479146dc8639596526470012'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_data_source_test_load.png': {
                        table: 'db_image'
                        id: '650d1306a7f34fb19294b53c692cc16a'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_docker_image.png': {
                        table: 'db_image'
                        id: '7ecb03d1f74c4f4db2418e219b292a29'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_docker_pull.png': {
                        table: 'db_image'
                        id: '317473b06700476abde6399f3926ce33'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_docker_run.png': {
                        table: 'db_image'
                        id: '75bd3989f23e4913bf512f6ffef1141c'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_add_class.png': {
                        table: 'db_image'
                        id: 'dd63b5495d2e491f86ef1bbb29f4c6f6'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_complete.png': {
                        table: 'db_image'
                        id: 'ff9891ac16b042929d5d8696e9a7a5db'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_create.png': {
                        table: 'db_image'
                        id: 'fa89b6f2dfd64116868e739a5ef2b2f4'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_integration_result.png': {
                        table: 'db_image'
                        id: '702d22699e834f3a846067b3037d9fe2'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_linux_final.png': {
                        table: 'db_image'
                        id: 'b4e35ea7eed34c9b8c6879c7caac2aa0'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_linux_host.png': {
                        table: 'db_image'
                        id: '142643c006784b35846551cc7a197533'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_linux_name.png': {
                        table: 'db_image'
                        id: '29f08f863b9b4966aaf14dd917e35db5'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_map_data_add_complete.png': {
                        table: 'db_image'
                        id: '8c8005c61cf94631818e744ec9b74abc'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_map_data_add.png': {
                        table: 'db_image'
                        id: '1d176a4c7c1548cc9b4dc31a2df24b79'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_map_data_complete.png': {
                        table: 'db_image'
                        id: 'f84036ad33704c25a90586c7e0ecbb5a'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_map_data_select.png': {
                        table: 'db_image'
                        id: '0120da0569fc40cc98f92e36fadefeab'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_prepare.png': {
                        table: 'db_image'
                        id: '5c712a24b4a44c5e98260b76e2ccf54f'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_preview_data.png': {
                        table: 'db_image'
                        id: 'ae8104a5e1a845b98f2c90946ebd1617'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_preview_object.png': {
                        table: 'db_image'
                        id: '2c673035cf994649bbaa01ff134fe2ad'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_preview_sample.png': {
                        table: 'db_image'
                        id: '28ccdad283d74655840969d585b56aef'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_provide_basic.png': {
                        table: 'db_image'
                        id: 'd4b1da4373084ae6bc01fe8a797feb11'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_rollback_integration.png': {
                        table: 'db_image'
                        id: '892e8bc20a1e4963a78771c097183ec5'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_run_integration.png': {
                        table: 'db_image'
                        id: 'b111db02d7d84cf7a334a92e5b62d9ee'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_select_class.png': {
                        table: 'db_image'
                        id: 'b8008556bb774638a7a664cda2471d75'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_select_linux_mapping.png': {
                        table: 'db_image'
                        id: 'b3349ed713be46e5a973fecd0e37fde0'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_select_windows_mapping.png': {
                        table: 'db_image'
                        id: '7d7c694e67ca41138a27ebc1a1a625cf'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_specify_basic.png': {
                        table: 'db_image'
                        id: 'ebb6e276da484bfd8aa5e6f65bed3145'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub_windows_final.png': {
                        table: 'db_image'
                        id: '2963263025ae466483a0b08611c2ca3a'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_ihub.png': {
                        table: 'db_image'
                        id: 'c457a74f704442dfbb418a56cb2c4590'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_cleanup.png': {
                        table: 'db_image'
                        id: 'd65c87b34b2647fca450b692963da1b9'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_connect.png': {
                        table: 'db_image'
                        id: 'b35c0132a5d14e24826fc04fa6a60677'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_download_certificate.png': {
                        table: 'db_image'
                        id: '8cd10d2aec5740c2b1ace075a05ae4fe'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_exec.png': {
                        table: 'db_image'
                        id: '54ad75f33e3e46979dc859e586c56541'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_generate_certificate.png': {
                        table: 'db_image'
                        id: '3a19c711d663415385ab6420113b3abe'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_import_cert_upload.png': {
                        table: 'db_image'
                        id: '4151ce8f6a374d7f8100ac80f493a0f0'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_import_cert.png': {
                        table: 'db_image'
                        id: 'a99fbc1ca7734c7aa948577256dcd11c'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_message_sent.png': {
                        table: 'db_image'
                        id: 'f74ae92f1e194538824683ffee35a5f8'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_namespaces_selected.png': {
                        table: 'db_image'
                        id: '5599d23d7246489797f692b766c2fbb2'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_password_acl.png': {
                        table: 'db_image'
                        id: '18e357dbbea44b51b2ff14a15d1e9c0e'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_pki.png': {
                        table: 'db_image'
                        id: 'e288e384986f4f468317e18cffbc3b2b'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_properties_content.png': {
                        table: 'db_image'
                        id: 'c0c2d2ebe802445097afb07e968c288d'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_properties.png': {
                        table: 'db_image'
                        id: '63a53aa999cd4937b20e5287bce3b3cc'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_select_namespace.png': {
                        table: 'db_image'
                        id: 'f6b8c4c9abda4bf2bfedd3f98033d251'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_select_topic.png': {
                        table: 'db_image'
                        id: '7f3c4d2ccc7f44058b340c0bf802b93e'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_servers_validate.png': {
                        table: 'db_image'
                        id: '5d31125d34574ac1a66169ea70f0a07e'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_servers.png': {
                        table: 'db_image'
                        id: '2f638d220f3e4324a4da3869ec0a958d'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_start_container.png': {
                        table: 'db_image'
                        id: '523539139ee8425d99fd857f05e5120b'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_producer_topic_selected.png': {
                        table: 'db_image'
                        id: 'dd19c5ec0ea94353afe01bb4d449b99a'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_sc_active_consumer_stats.png': {
                        table: 'db_image'
                        id: '9bb566f5dafd4327a34b4f14391cf4e3'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_sc_active_consumer.png': {
                        table: 'db_image'
                        id: 'd8377d3507fa46ef896b41f4e956e550'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_sc_active_rte.png': {
                        table: 'db_image'
                        id: '6f60fe08a2b04c1087e0d577fdf055f4'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_sc_active_stream.png': {
                        table: 'db_image'
                        id: '7762e64ade2842e2b15ec831e5d2e7c1'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_sc_create_consumer.png': {
                        table: 'db_image'
                        id: 'c4ab0255b57d481ab9271a61ad61a989'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_sc_etl_consumer.png': {
                        table: 'db_image'
                        id: '493f9cd2aba44bb7af1ee7fba45a9193'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_sc_home.png': {
                        table: 'db_image'
                        id: '5910655b6e2a426bbdc283d05021f442'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_sc_kafka_stream_back.png': {
                        table: 'db_image'
                        id: '7290be0e3c6547f1b80ef983af8453ac'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_sc_new_kafka_stream.png': {
                        table: 'db_image'
                        id: '8e2d6f3ad062486f82744923d340f3cd'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/sc_sc_rte_consumer.png': {
                        table: 'db_image'
                        id: '2d46b07d11414ad4b4f4b57447492c85'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/wdf_connectors_banner_dark.png': {
                        table: 'db_image'
                        id: '81199a4ba0804bceb25c031a1931cb6e'
                    }
                    'wdf-lab/public/wdf/kafka-stream-connect/wdf_connectors_banner.png': {
                        table: 'db_image'
                        id: 'dafda1cad480444ba74000cd23c29cbd'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/dataflow_lens_document_intelligence.png': {
                        table: 'db_image'
                        id: '053582c9fc354266b0d79735ed4fa17c'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/dataflow_outcome_agent_flow_doc_intelligence_dark.png': {
                        table: 'db_image'
                        id: '6208d7978b90492a95337d672d463492'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/dataflow_outcome_agent_flow_doc_intelligence.png': {
                        table: 'db_image'
                        id: '73227f1262fa4848999b99faeb389488'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_common_expense_event_nav.png': {
                        table: 'db_image'
                        id: '3cea6eac2b3a43299fed73b882ddd65c'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_common_fow_nav.png': {
                        table: 'db_image'
                        id: 'b0cd7ac2321f429d8e0ef1d6dcba88a6'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_common_fow_system_user.png': {
                        table: 'db_image'
                        id: '3724faf4a23c4a8d8b6612363d1f8a42'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ihub_now_assist_badge_notification.png': {
                        table: 'db_image'
                        id: '93cd727dd0384887a70897c644934c25'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ihub_now_assist_chat_expand.png': {
                        table: 'db_image'
                        id: 'f2ab1405c0094d2bb29e8fc946fbe8f1'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_activate.png': {
                        table: 'db_image'
                        id: '960d85a72c9b4f8481365967e3f0d113'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_agent_results_overview.png': {
                        table: 'db_image'
                        id: '04698ec58dfd4ec2aacb38fd94dfe230'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_choose_file.png': {
                        table: 'db_image'
                        id: 'c3fe1e07ee39488c901a370ab5622efe'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_create_usecase.png': {
                        table: 'db_image'
                        id: '480398728b1847fb941ae2f11770b8ce'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_doc_extraction_nav.png': {
                        table: 'db_image'
                        id: '97234af78e7d4baf800ffbbab4358be8'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_edit_extract_skill.png': {
                        table: 'db_image'
                        id: '3244d73dc68849a8adb0265f71cf4903'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_extracted_info_view.png': {
                        table: 'db_image'
                        id: '9548c40fb4884a28acaddd5802a02b5c'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_finance_case_list.png': {
                        table: 'db_image'
                        id: 'eeb27c75d27d4306b44f42dccef907c5'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_integrations_tab.png': {
                        table: 'db_image'
                        id: '97d9d5bac59647de910e3e61b743d5a6'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_lens_accept_defaults.png': {
                        table: 'db_image'
                        id: '92305956c2e446de8fb5d244908ec5c3'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_lens_back_to_skills.png': {
                        table: 'db_image'
                        id: '2bf96d3a001d4fb4bb058a8f4ff73080'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_lens_create_with_lens.png': {
                        table: 'db_image'
                        id: 'c2c8221a217a4c52af6cad9d49d01630'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_lens_download_packages.png': {
                        table: 'db_image'
                        id: '86a8aadf44304bb6af148c7cbf471920'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_lens_downloads_nav.png': {
                        table: 'db_image'
                        id: 'fddc68788e69410d9a167c5e74c87bfa'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_lens_event_saved.png': {
                        table: 'db_image'
                        id: '98bf2aeddea4404788971222d3f82f70'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_lens_frame_analyze.png': {
                        table: 'db_image'
                        id: 'd83b15177a534f0caa206900aae583e3'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_lens_open_app.png': {
                        table: 'db_image'
                        id: '2b312a1fafa340ab8798f294fecbd3d2'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_lens_record_populated.png': {
                        table: 'db_image'
                        id: '4ba6c756ff0e48698d44f652d4fd73f7'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_lens_turn_on.png': {
                        table: 'db_image'
                        id: 'cf0433642a14406ca03951533f9840d1'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_now_assist_skills_nav.png': {
                        table: 'db_image'
                        id: 'bb7b3ba92fab413a83b3d174173d4dc9'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_return_to_platform.png': {
                        table: 'db_image'
                        id: '5c6910ff345a4426bb56631212141542'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_save_and_continue.png': {
                        table: 'db_image'
                        id: '9c918b20185f449f8f3127e678b9c402'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_save_or_submit.png': {
                        table: 'db_image'
                        id: '320db4ca5e994c359315c9ae4f42d4a2'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_scope_forecast_variance.png': {
                        table: 'db_image'
                        id: '534d2cf0ac2e44d1871a36ba1a1017da'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_scope_global.png': {
                        table: 'db_image'
                        id: 'd84cab429ec64bfc806d2100968257a2'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_skills_screen.png': {
                        table: 'db_image'
                        id: 'ffe5e90552c04445b71edea586068190'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_state_wip.png': {
                        table: 'db_image'
                        id: 'c5956b8469454b6cb00fe888a1051d76'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_test_outputs.png': {
                        table: 'db_image'
                        id: '8949b624c38a4ed89cb5d68caa0a0769'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_threshold_search.png': {
                        table: 'db_image'
                        id: '666994cea869466095f35bc9760059e6'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_upload_document.png': {
                        table: 'db_image'
                        id: '5234e3d28b974c898c026b3821b8142a'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_upload_file_exit.png': {
                        table: 'db_image'
                        id: '18d60cfd08cd4ab3afa6af3e168bda1e'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_usecase_config_overview.png': {
                        table: 'db_image'
                        id: '060d9a1023b3462ea7daf0e015773660'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_ldi_variance_task_nav.png': {
                        table: 'db_image'
                        id: '0ebb3e0e68f0496581b07bd57c1ab5eb'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_slide_docintel_demo_preview.png': {
                        table: 'db_image'
                        id: '401a32b9afac4a27bc31893ec8df43d0'
                    }
                    'wdf-lab/public/wdf/lens-and-document-intelligence/sc_slide_lens_docintel_overview.png': {
                        table: 'db_image'
                        id: '4c241d67b2af434b9163ce909afb6103'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/dataflow_mcp.png': {
                        table: 'db_image'
                        id: '1b9730743b684fc1a7ce9e1104441d35'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/dataflow_outcome_agent_flow_mcp_dark.png': {
                        table: 'db_image'
                        id: '3c3d148a258f4b1e8409b6eca1eace47'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/dataflow_outcome_agent_flow_mcp.png': {
                        table: 'db_image'
                        id: '486586f47dde470bbf702308ab4bfc58'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_common_agent_studio_create_manage.png': {
                        table: 'db_image'
                        id: 'c2d175e79d9047d99ca1726ec98b56d0'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_common_save_and_continue (1).png': {
                        table: 'db_image'
                        id: 'cb944b2da4e64952b4154dd96c10ddd9'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_add_neon_server_details.png': {
                        table: 'db_image'
                        id: '36fb58870764499f9d07311a82fdee84'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_add_tool_neon.png': {
                        table: 'db_image'
                        id: '23c79cec417f4b66ba3217607ae7c248'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_agent_studio_settings_nav (3).png': {
                        table: 'db_image'
                        id: '27be0c449ddc43fc8a72da83e01fb345'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_channels_status_neon.png': {
                        table: 'db_image'
                        id: '9c6ec65f50f74c438145352dad3bf451'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_define_role_neon_step.png': {
                        table: 'db_image'
                        id: 'cf54cc57d99f40fabce57470157bb87a'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_duplicate_agent_menu.png': {
                        table: 'db_image'
                        id: 'b3369b3153814201ba4c0007e436c7ba'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_duplicate_confirm.png': {
                        table: 'db_image'
                        id: '0e53039d9cd44830a45ed361254b44d0'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_duplicate_warning.png': {
                        table: 'db_image'
                        id: '4f7a458f64db40cba2542aff0d8e09b8'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_manage_servers_new.png': {
                        table: 'db_image'
                        id: '383c5b1d602149e3851c970b99ab3cba'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_rename_agent_neon.png': {
                        table: 'db_image'
                        id: '1ac4887bb9304cc7a39b487ed3d8bc7d'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_save_and_continue.png': {
                        table: 'db_image'
                        id: '4659734a65034bf797c8dc4ec40d722e'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_security_defaults.png': {
                        table: 'db_image'
                        id: 'c8bcecbe535a4735bfafbd0c7ccf3cc6'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_select_neon.png': {
                        table: 'db_image'
                        id: 'cdead2e733604d5dbf772a4475f66ef5'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_test_input.png': {
                        table: 'db_image'
                        id: '7b1f7a00b88447ffb504b7f5a503fed7'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_test_results_neon.png': {
                        table: 'db_image'
                        id: 'a045dd34f2814be9b67619b59d2782e7'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_test_running_neon.png': {
                        table: 'db_image'
                        id: '98096c79e5714feeac0c385c9ff48abc'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_tool_settings_neon.png': {
                        table: 'db_image'
                        id: '8e185204cad541b5bcd46b6abcbf2172'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_tools_section_neon.png': {
                        table: 'db_image'
                        id: '273fa6c9ce074d02ba4ab2616ee0d89b'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_mcp_variance_baseline_neon.png': {
                        table: 'db_image'
                        id: '4871439c7b27489fa840191b17becc1d'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_slide_mcp_demo_preview.png': {
                        table: 'db_image'
                        id: '2f484d4fd9a94f9dbcf17c6b15eb31b1'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_slide_mcp_overview.png': {
                        table: 'db_image'
                        id: '7e0af6bb92c84f72bf90d9dd8aa3efef'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_zcc_agent_studio_search.png': {
                        table: 'db_image'
                        id: 'f3a07ff1507d41e59aad65d6075a1c66'
                    }
                    'wdf-lab/public/wdf/mcp-server-client/sc_zcc_forecast_variance_agent.png': {
                        table: 'db_image'
                        id: '802adaa6282a408fba6cca478d826b04'
                    }
                    'wdf-lab/public/wdf/troubleshooting/sc_common_index_budget_history.png': {
                        table: 'db_image'
                        id: '04deeaa3f9ed476cba357c1f7f8e415b'
                    }
                    'wdf-lab/public/wdf/troubleshooting/sc_common_index_expense_transactions.png': {
                        table: 'db_image'
                        id: '2209c0e666ae4b12b5cfadc66336860f'
                    }
                    'wdf-lab/public/wdf/troubleshooting/sc_common_indexed_sources_nav.png': {
                        table: 'db_image'
                        id: '0face6b4a6af44b4a67f798efc6bcee5'
                    }
                    'wdf-lab/public/wdf/troubleshooting/sc_common_search_indexed_sources.png': {
                        table: 'db_image'
                        id: 'fb27d7dabdba47c8b906247ee4956da1'
                    }
                    'wdf-lab/public/wdf/troubleshooting/sc_common_troubleshoot_now_assist.png': {
                        table: 'db_image'
                        id: '65388c330ce049b0992d8b12bedc2847'
                    }
                    'wdf-lab/public/wdf/troubleshooting/sc_ihub_alternate_trigger.png': {
                        table: 'db_image'
                        id: '6822ba59f42247ee834b91bd723e62bb'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/dataflow_outcome_agent_flow_zero_copy_dark.png': {
                        table: 'db_image'
                        id: '8047536308db46678965344fdf0a47f6'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/dataflow_outcome_agent_flow_zero_copy.png': {
                        table: 'db_image'
                        id: 'd26f611a7ed44653b3c5cf829e94fcbc'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/dataflow_zero_copy_connectors.png': {
                        table: 'db_image'
                        id: '023ed37cab1444c199d78ddc7655322c'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_common_agent_studio_users_nav.png': {
                        table: 'db_image'
                        id: 'adfcc77a42244d48b0bb8fbaa01014d5'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_common_expense_event_nav.png': {
                        table: 'db_image'
                        id: 'b02d4ae56a21486ca7565e96458bb813'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_common_fow_nav.png': {
                        table: 'db_image'
                        id: '10a2aa1af1c0420285659086509027ad'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_common_fow_system_user.png': {
                        table: 'db_image'
                        id: 'e49670c827414e6b8aea8b792baa24f5'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_common_logout.png': {
                        table: 'db_image'
                        id: '2e2c44f031ab4152adfb9f1098aed89e'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_common_roles_tab_edit.png': {
                        table: 'db_image'
                        id: '3d95599ad9c24870b55ffc61024350ac'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_common_search_admin_user.png': {
                        table: 'db_image'
                        id: 'cd6d18667cb6464ea96126a198d44ef4'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_slide_zerocopy_demo_preview.png': {
                        table: 'db_image'
                        id: '5e20ac90a56b4cc98032bf02d917f630'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_slide_zerocopy_how_it_works.png': {
                        table: 'db_image'
                        id: '6f35854ccbab43539ba1d9e42bf8645b'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_slide_zerocopy_overview.png': {
                        table: 'db_image'
                        id: '32f869e2e2b444a59d8265c195ddbf87'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_add_tools_info.png': {
                        table: 'db_image'
                        id: '259c25ff50614db287e59ec4e5d87391'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_agent_studio_nav.png': {
                        table: 'db_image'
                        id: '525cecf4728c427fbcff3ebd0e85ab3e'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_agent_studio_search.png': {
                        table: 'db_image'
                        id: '00434ed381574588a5459094c852941f'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_bapi_configured.png': {
                        table: 'db_image'
                        id: '230392a6383c48fa86e3f4a414414281'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_cc_target_table_list.png': {
                        table: 'db_image'
                        id: '9d66438636bc4104b1c306c10ff74d25'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_choose_outputs.png': {
                        table: 'db_image'
                        id: '8c4ea459fe25451ab7cdf67edd3c7731'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_click_read.png': {
                        table: 'db_image'
                        id: '1ab0d00d61ec4b8ca8f10730d2b81301'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_clone_model_details.png': {
                        table: 'db_image'
                        id: '8810cb2862884b2ab6b556db4b034e17'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_clone_popup.png': {
                        table: 'db_image'
                        id: '9f46838761364f97b368b6d2d031259f'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_confirm_pk.png': {
                        table: 'db_image'
                        id: 'e602ac2d30764e8d9672c0d2782604cf'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_connection_details.png': {
                        table: 'db_image'
                        id: 'b8cacf0d8fe3408ca22c077260fc7944'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_cost_center_reference.png': {
                        table: 'db_image'
                        id: '92c7da02de394380a02bffb5c6f86614'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_data_assets_create.png': {
                        table: 'db_image'
                        id: 'a9ed9e89d57245c2b4bff9f8c413c675'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_data_assets_open_list.png': {
                        table: 'db_image'
                        id: '8347e692092d495fbf6714dc6428bf03'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_decision_logs.png': {
                        table: 'db_image'
                        id: '1e9e32a196db417e9a6a5a28282fcc73'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_define_security.png': {
                        table: 'db_image'
                        id: '8d1ced78556643fa95e9bcb692fe5527'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_define_specialty.png': {
                        table: 'db_image'
                        id: 'e776f42d9d3f48d6b2f6b3554eba169a'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_define_trigger_blank.png': {
                        table: 'db_image'
                        id: '5e037dd9f2c14737bf89e0f49daa17b2'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_df_table_label.png': {
                        table: 'db_image'
                        id: '6bd1d0195e9448a7a453c29ba3da45c6'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_df_table_result.png': {
                        table: 'db_image'
                        id: '4c48505892f04c4285a31116f44090b4'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_dp_cost_center_click.png': {
                        table: 'db_image'
                        id: '073b2caa277e4e5ca377dc8e35f6f844'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_erp_home_layout.png': {
                        table: 'db_image'
                        id: '8860b52756924224ae517ddafa8cf40f'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_erp_home_nav.png': {
                        table: 'db_image'
                        id: 'e445950be98641f49ffc31d6214fc53a'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_expense_event_list.png': {
                        table: 'db_image'
                        id: '6a2483798a4f4596bb45f42952da293a'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_extraction_tables_filter.png': {
                        table: 'db_image'
                        id: '0a0e764dae4f451cb9f1696939402668'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_finance_case_list.png': {
                        table: 'db_image'
                        id: 'e0d1263bc2c84f2fbc34e4855ff8919c'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_gl_primary_key_finish.png': {
                        table: 'db_image'
                        id: '587c3d672a1d429eba826b1050f19884'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_model_config_save.png': {
                        table: 'db_image'
                        id: 'a02bca08ea23451ca2374abee701b708'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_models_filter_cost_center.png': {
                        table: 'db_image'
                        id: '8e451dde98194d8ea103b9c89938422d'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_reference_key.png': {
                        table: 'db_image'
                        id: '0dcd49ffea8b414e83dc1600a288e004'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_reference_label.png': {
                        table: 'db_image'
                        id: '76963dff716c437b96924c485014c66a'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_reference_table.png': {
                        table: 'db_image'
                        id: '7a2033e653b94d638f2a23812799c68b'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_role_messages_save.png': {
                        table: 'db_image'
                        id: '09db59a0c1be42e3bb5e4def3888f223'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_roles_erp_admin_save.png': {
                        table: 'db_image'
                        id: '2d5c8b62d21f490991e6740c35d78206'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_sap_cost_center_click.png': {
                        table: 'db_image'
                        id: '5434bb71d7bd4c0688fe6b8672358289'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_select_all_columns.png': {
                        table: 'db_image'
                        id: '2034e40fa6454f2fa953de888c574ca3'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_select_channels_save.png': {
                        table: 'db_image'
                        id: '5be884feba994a328384b1c5714fb2d1'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_snowflake_established.png': {
                        table: 'db_image'
                        id: 'f289fc595ddf408f91bc31e63893edae'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_snowflake.png': {
                        table: 'db_image'
                        id: '2bae59f3189b4bd78a5084b1dc780581'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_specify_inputs.png': {
                        table: 'db_image'
                        id: 'c3b7d0c2fd5c4fb99d82c59087b3be2b'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_target_table_link.png': {
                        table: 'db_image'
                        id: '9c2d058584d34b3e875e7ac3d1bab46e'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_test_input.png': {
                        table: 'db_image'
                        id: '17997fdeb40c42a48b20e4ebe58df420'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_test_results_overview.png': {
                        table: 'db_image'
                        id: '259177fd00334285ae888cf18d96ab75'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_wdf_hub_nav_au.png': {
                        table: 'db_image'
                        id: '8d2e8c809c1d400eaa00fe004af8954a'
                    }
                    'wdf-lab/public/wdf/zero-copy-connectors/sc_zcc_wdf_hub_nav_zu.png': {
                        table: 'db_image'
                        id: '6331a02a04f54d2c806b48c66d896be8'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '02b5b5cdbf954237accd415234c370c5'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'monthly_budget'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '05b997f9f8f545059f6e4fbb60656cae'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'region'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '05feeab486a640ab8cc66898394e2101'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'expense_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '06fd6b3d8f7841df982dfe86cb044a5c'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0af64a97e76f4281b297b36db493c5c1'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'approved_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0c3da01467c44740b6214d6daa0f991b'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '0c6a3d53ff1b4c5fb698021d9b548746'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0c6dc30aa1ca424a984e897a19de8039'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'owner'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0f778435664444fea4e5c64d38d9e38f'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '11f3d29fe068408692b3089c3eccf8ca'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ba89f6b03e745d0bf243798c3c3bac1'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'actual_spend'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '1c00daf32f1e4d3896b8cb3111b2e096'
                        key: {
                            name: 'x_snc_forecast_v_0/main.js.map'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1cb4cfbb398a497fa45f8f725db2fc49'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'cost_center'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d0a3e39e3b443e8a14eb0893a346a01'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'region'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1f606e54b7834859b68fdc6231a6bead'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'status'
                            value: 'in_progress'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '22802c7ddafd486dad0f0739b22f637c'
                        deleted: true
                        key: {
                            name: 'x_snc_forecast_v_0/vendor-react-dom--53df40e5.js.map'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '27381c47270040159ccfd7cc90981a3d'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'schema_version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '29885ab397bd4cfbb07ff63fec4de1a5'
                        deleted: true
                        key: {
                            name: 'x_snc_forecast_v_0/vendor-react-dom--53df40e5'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_configuration'
                        id: '2a643bcbae8f4d98ad7cf3ab6b6a3494'
                        key: {
                            agent: '116a31874a154caaa19a6f5270288c60'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2a6e5c85ca194d6d93824f92ba5714bc'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'source_system'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2e5c0dfbae9341ffa2dc59728aa27797'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'variance'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '359630e4fe524643aed10efbffbdaeb5'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'expense_category'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '36f335c8b7884b22ab59a32eef883200'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3d0fa1940e9a4406857f00b6b928ee7c'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '41d11cd77eb543eca357502ff98fe233'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'resolution_comments'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '426337c6cca34582bdd8a45c35a43656'
                        key: {
                            logical_table_name: 'x_snc_forecast_v_0_expense_transaction_event'
                            col_name_string: 'owner'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4568e2a99e1d4b0a8c1f79d2d02fafc4'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '459efdbba8234e23b7eda5f575aadeac'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'cost_center_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: '482e1e067de44e2cb04751e8a77ec90a'
                        key: {
                            agent: '116a31874a154caaa19a6f5270288c60'
                            tool: '6dc3a90d65e1468bb9fe7e6da868737c'
                            name: 'BA Glide Tools Metadata Summarizer'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '491bab41ba1d4e5e81a2b246260a1f87'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'approved_by'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4aa09b8217894766804819f15830f375'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4db4402ce59c4dccad0117b9aaa677de'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4e51d7e9d1fc44b689904050a6ae1744'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'resolution_comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4ecde5aa0c454bccb068b200e4a0e200'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'cost_center'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4f1869aa76b3462d87d6667d2342525a'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'assignee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '5256de3e955f4501b8293b92264a1e11'
                        key: {
                            name: 'x_snc_forecast_v_0/vendor-react-dom--ff7a06d7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '539d0618fcfc4add9b5b109158103598'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'cost_center'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '549652e21bd647218f3266d719ea778e'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'fiscal_month'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5bc47a3cc9214d7f8b2182548f02fd11'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5bee7a50694b49e49b10b088dd6a2e26'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5e31f507a66f4a07aaaeec5d9adf9a74'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: '5fdb962939bb4e5b89c07c66353ccd2c'
                        key: {
                            agent: '116a31874a154caaa19a6f5270288c60'
                            tool: 'cef68c77803a45ebb6d16a617e28015c'
                            name: 'Build Agent'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '633ef75ca5534c4d9ee3531d48af84ff'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'expense_transaction_event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '647ead4f6f53437aa3f25f7f9c470516'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6607dbadeba445a9a8fc005fa7c64937'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'cost_center_description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '66e5fa76e2cb444cbd2828510656390c'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'fiscal_year'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '699e84597f5c479cb1efe5e33149e8f8'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'fiscal_year'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6aa1e2def7904ffe937ff7165370b31f'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'service_category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6bb645a0fae2402fb393dd7b9299e5ab'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'service_category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_version'
                        id: '6cb078ce382d4a5ebc117b1917e44a14'
                        key: {
                            target_id: '116a31874a154caaa19a6f5270288c60'
                            version_name: 'V1'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: '6dc3a90d65e1468bb9fe7e6da868737c'
                        key: {
                            name: 'BA Glide Tools Metadata Summarizer'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e75f24ad8ab47d6ab93d45e53aa5ff4'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6ed5ae18510047e883185b874ebd200f'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'expense_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '6f2544a19f8f4c8caa732e334c8faef7'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '6fc36fdb0cd84b34ab889529b862cdba'
                        key: {
                            name: 'x_snc_forecast_v_0/vendor-react-dom--ff7a06d7.js.map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '70408bee44a8410388bcec431fd54660'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'monthly_budget'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '71e7f4327af64c6f86bc80abe41ab4b5'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'timestamp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '72c4b58a80d541c6adcf2e0b46427fb0'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7456b019af7549aea2cc12aed4d8f9ed'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'expense_transaction_event'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7514fa7db9cc4b6994ce04d2a6350a08'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'created_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7680a1262d774d00851c80e248ec4b66'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'event_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '775fd2258ecd483b8333ca9c4d1afb6b'
                        deleted: false
                        key: {
                            application_file: '45d838ba91a75970fcee4ab1e1cd7a84'
                            source_artifact: '85485b4b7943448e81ef47747dcaa9ee'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '77f004d0355741e6a04feee012c50be6'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7a45c63ad8d444e2ab0808c7ce9b6211'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'correlation_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7c5111281b294c99a96343be7ec73e27'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'business_unit'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7e30c9da44cd404fb54223ac099921a3'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'threshold_value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7f01dd75e541472dbaabc8d74b05e06a'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'assignee'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '843cf5c4f2924d3ba7a8480930555685'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'expense_date'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '84d158688cc743679c9397828def9e38'
                        key: {
                            logical_table_name: 'x_snc_forecast_v_0_expense_transactions'
                            col_name_string: 'approved_by'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '85485b4b7943448e81ef47747dcaa9ee'
                        deleted: false
                        key: {
                            name: 'aiux-source 45d838ba91a75970fcee4ab1e1cd7a84'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '855d249877c642999cb8cf2b5daa8e1d'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'timestamp'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '89057f6e0e434431bb2a578359479fde'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'status'
                            value: 'new'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8de225627ec542a3a901253b7bce6379'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'expense_category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8e488a3c538f47c6aedf680c0c37a0d6'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'event_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '90ed5eb46dec4c2e9e69bb064a10012e'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'fiscal_month'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '93ab37e229334d44ab89ac883bcbc150'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '94da40f0c0f345179927f390dbecbf07'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'business_unit'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '95d7bc78955740d19f1cc989c9ae4c58'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'billing_period'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9895d584ca66472c808419b5c9d73020'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'vendor'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '99d21b33d571429cbdbfe2005d6d1c88'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'status'
                            value: 'closed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a158de40e854732bdf0354cb50106dd'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'amount_usd'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_mapping'
                        id: '9a7305ea06ee4124ae97487077bcf9ca'
                        key: {
                            agent_access_config: {
                                id: '2a643bcbae8f4d98ad7cf3ab6b6a3494'
                                key: {
                                    agent: '116a31874a154caaa19a6f5270288c60'
                                }
                            }
                            role: {
                                id: '1e276e14dabe4259a2d333918ea41f84'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9bf5775a4a9b4dfca513af1c2c35de3a'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a0218d5035fd4694a22a2e5eefd1e6d0'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'event_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a0d7c4c83ce8426885b43a04ec333b7b'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: 'a2b76340f6074c5fb2b4ce54b2f7b9a7'
                        key: {
                            name: 'Build Agent Preprocessor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a77adb50c2f443ec8d571353e6cd759e'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a8da78d203aa40e88e429ab9667e136e'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'correlation_id'
                        }
                    },
                    {
                        table: 'sn_aia_agent_tool_m2m'
                        id: 'ab3e2a992596409ea5ac19eae8017cbf'
                        key: {
                            agent: '116a31874a154caaa19a6f5270288c60'
                            tool: 'a2b76340f6074c5fb2b4ce54b2f7b9a7'
                            name: 'Build Agent Preprocessor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'acd2f4b576bb433cb568892b8a581d05'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'gl_account'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'adc2e4b9ce144b66a1ce3a81a54e0294'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'invoice_id'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'aeef0d6e4aed4f4291d5f6b222910b6a'
                        key: {
                            logical_table_name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            col_name_string: 'owner'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b497747df6aa41d2a7b6754ea471195d'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b73f4118376c49b3936ef97be4f4c522'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'created_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b79b966bfb1342718bf630a70d884136'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b7c92997a45c44b1acac5fbdeb22473c'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'cost_center'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b85e65a4bf86459c912b2058f4ce0ede'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'gl_account'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b893807a26e74b90bfc3f1866318df5c'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'owner'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bb9055b7bb784f2abecda456fcfb2183'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'status'
                            value: 'resolved'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bbd24275c55c4e66ac4348130fb0d5fa'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'billing_period'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bc9880b69c574cd5a087a657cb83c8f1'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c108e7d19f0e4b86adcb359ef56c7001'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'expense_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c2d7792c7e474cda938be967ff1b17bb'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'variance_pct'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c5832605056c4591adc5f73e49e547a1'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c62942b4a3f84bb78988d18bea9ca753'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                            element: 'threshold_value'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c84000b10caa4551897124acc0af60af'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'schema_version'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9151ede894b44968585db41b6edd944'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'cost_center'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ca23269e69494d3f800e8d93e58b1aae'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'amount_usd'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ca56e02029c64f7492d600240a5d5b61'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cb8c2a645be746ab895525a9e70fa9d6'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'cost_center'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'cbaeffb12efe4b758e1867885a313af0'
                        key: {
                            name: 'wdf-lab/public/virtual-on/scene'
                        }
                    },
                    {
                        table: 'sn_aia_tool'
                        id: 'cef68c77803a45ebb6d16a617e28015c'
                        key: {
                            name: 'Build Agent'
                        }
                    },
                    {
                        table: 'sn_aia_agent_config'
                        id: 'd2c747cff7744720b9a9273667c478b9'
                        key: {
                            agent: '116a31874a154caaa19a6f5270288c60'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4e8d4992b4047a5a6adafdd0d2f2e09'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'event_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd55a66568ad84f41b56bec0ac045760b'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'invoice_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd63f628740b4490a8aee82bb9d59863b'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'source_system'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd956dc264682454982996d33f6040bdd'
                        key: {
                            name: 'x_snc_forecast_v_0_variance_task'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'da27e6b324f4443087ff3f09ea95917c'
                        key: {
                            name: 'x_snc_forecast_v_0/main'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'de6332fb778a46da9913230e99eda073'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dffce789ed724fb68288e21e352f0f31'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'variance_pct'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eac69dc7e2d1414684f35c78ba9f907c'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'gl_account'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'efa6d1b56ad9444d987336a33c248868'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f142838d129445d6a39400b82bc57619'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'amount'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f1d4be0c78ba454395a1dce0c640c28f'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transactions'
                            element: 'gl_account'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f27738e66e4c4ff9b92ff03f784067ca'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'sent_from'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f3b8b9cc62df431c8ccaf61b805939a7'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'actual_spend'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f495de2e638c4fbea0b38a0f78a618ad'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'variance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fad9c116515f40b6ae1e369e7f461d0c'
                        key: {
                            name: 'x_snc_forecast_v_0_cost_center_budget_history'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fb7757fb700a4dbe8df6109923b03911'
                        key: {
                            name: 'x_snc_forecast_v_0_expense_transaction_event'
                            element: 'sent_from'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
