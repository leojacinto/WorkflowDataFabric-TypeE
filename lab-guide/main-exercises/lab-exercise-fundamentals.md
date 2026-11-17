---
icon: atom
---

# Install Lab Dependencies

[Take me back to main page](../)

This contains critical steps to prepare your Demo Hub Instance.

### Minimum versions

The lab was tested on instances with these app versions or newer. Check yours in **All** > **Application Manager**: search the app name and read the **Version** column. Search by the plugin name or scope in the table below, because the app name alone is not enough: Build Agent, for example, comes as three plugins (Build Agent (Trial), Build Agent Premium and Build Agent Glide Tools), and the minimum version below is for Build Agent (Trial). On an older Build Agent the Integration Hub prompts stop with an error about the build, so check Build Agent and Studio first.

| App | Plugin name in Application Manager (scope) | Minimum version |
|---|---|---|
| Build Agent | Build Agent (Trial) (`sn_build_agent`) | 2.6.4 |
| ServiceNow Studio | ServiceNow IDE (`sn_glider`) | 5.0.2 |
| AI Agents | ServiceNow Otto AI Agents (`sn_aia`) | 9.0.14 |
| Generative AI Controller | Generative AI Controller (`sn_generative_ai`) | 15.0.3 |
| Generative AI platform | ServiceNow Otto for Platform (`sn_genai_platform`) | 13.0.1 |
| Skill Builder | AI Skill Kit (`sn_skill_builder`) | 10.0.6 |
| Now Assist Admin | AI Admin Hub (`sn_nowassist_admin`) | 10.3.5 |
| Model Context Protocol Client | Model Context Protocol Client (`sn_mcp_client`) | 2.4.4 |
| Model Context Protocol Server | Model Context Protocol Server (`sn_mcp_server`) | 1.8.0 |
| Universal MCP Client | Universal MCP Client (`sn_wdf_mcp_client`) | 1.0.2 |
| Zero Copy Connector Hub | Zero Copy Connector Hub (`sn_data_fabric`) | 3.2.2 |
| Zero Copy Connector for ERP | Zero Copy Connector for ERP (`sn_erp_integration`) | 10.6.0 |
| Document Intelligence | Document Intelligence (`sn_docintel`) | 8.0.9 |
| ServiceNow AI Lens | ServiceNow AI Lens (`sn_ai_lens`) | 8.1.1 |
| Flow Designer | Flow Designer - Designer (`sn_flow_designer`) | 30.0.7 |


1.  Ensure you are at least in Zurich Patch 6. Go to **All** > type **stats.do** and hit Return/Enter ↵. Ensure that it is empty.

    <figure><img src="../.gitbook/assets/sc_fund_stats.png" alt=""><figcaption></figcaption></figure>
2.  You should get a build tag with Zurich and the needed patch name.

    <figure><img src="../.gitbook/assets/sc_demohub_stats_build_tag.png" alt=""><figcaption></figcaption></figure>
3. If you have not done so yet, log in to [Demo Hub](https://demohub.service-now.com/) then go to the [APAC End-to-End AI Workshop ](https://demohub.service-now.com/edsp?id=sc_cat_item\&sys_id=8bb12066fb2f761042e1f57675efdc85\&sysparm_category=f2d15f6893429250e0d5b3aa6aba105a)catalog item to install the lab dependencies in your instance.
4.  Provide your <mark style="color:green;">**a.)**</mark> Zurich Patch 6 or newer **Instance** name, <mark style="color:green;">**b.)**</mark>**&#x20;Admin User ID**, and <mark style="color:green;">**c.)**</mark> **Password**, then <mark style="color:green;">**d.)**</mark> click **Submit**.

    <figure><img src="../.gitbook/assets/sc_fund_cat_item.png" alt="" width="516"><figcaption></figcaption></figure>
5. Wait for 10 to 15 minutes.
6. Once completed, you will get an email indicating that the import of update sets is successful.

<figure><img src="../.gitbook/assets/sc_fund_cat_complete.png" alt=""><figcaption></figcaption></figure>

## Next step

Let us continue building the data foundations for the use case. Next up is creation of the Data Fabric tables which will be used by AI Agents. Let us work on AI Agents' ability to use REST API connectivity by proceeding with the [Integration Hub configuration](https://servicenow-lf.gitbook.io/the-workflow-data-fabric-loom/main-exercises/lab-exercise-integration-hub).

[Take me back to main page](../)
