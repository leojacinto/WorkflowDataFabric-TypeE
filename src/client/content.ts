/*
 * Lab content. Text is copied verbatim from the AIUX pages.
 *
 * IMAGES: high-resolution originals from the GitBook repo. The instance's own
 * copies under /wdf-lab/public/wdf/... are downscaled, so REPO_ASSETS is the
 * primary source and INSTANCE_ASSETS is kept as the documented fallback if the
 * instance content policy blocks the external host.
 */
export const REPO_ASSETS =
  "https://raw.githubusercontent.com/leojacinto/WorkflowDataFabric-TypeB/main/.gitbook/assets";

export const INSTANCE_ASSETS_FUNDAMENTALS =
  "/wdf-lab/public/wdf/fundamentals";
export const INSTANCE_ASSETS_HOME = "/wdf-lab/public/wdf/home";

export const asset = (file: string) => `${REPO_ASSETS}/${file}`;

export interface Step {
  text: string;
  image: string | null;
  critical?: boolean;
  note?: boolean;
}

export const DEPENDENCY_STEPS: Step[] = [
  {
    text: "Ensure you are at least on Zurich Patch 6. Go to All, type stats.do, and press Enter. Confirm the page is empty.",
    image: "sc_demohub_stats_build_tag.png"
  },
  {
    text: "You should see a build tag with Zurich and the needed patch name.",
    image: null
  },
  {
    text: "If you have not done so yet, log in to Demo Hub, then go to the APAC End-to-End AI Workshop catalog item to install the lab dependencies in your instance.",
    image: "sc_fund_cat_item.png"
  },
  {
    text: "Provide your Zurich Patch 6 (or newer) instance name, admin user ID, and password, then click Submit.",
    image: null
  },
  { text: "Wait 10 to 15 minutes.", image: null },
  {
    text: "Once completed, you will get an email indicating that the import of update sets is successful.",
    image: "sc_fund_cat_complete.png"
  }
];

export const SCOPE_STEPS: Step[] = [
  {
    text: "Go to the top-right of your navigation, click the globe icon, then the arrow, then the list icon to create a new scope.",
    image: "sc_fund_scope_change.png"
  },
  { text: "In the next screen, click New.", image: "sc_fund_new_scope.png" },
  {
    text: "Go to the Start from Scratch section and click Create.",
    image: "sc_fund_create_scope.png"
  },
  {
    text: 'Provide the scope details with name "Lab <YOUR INITIALS> Forecast Variance" and the scope, then click Create. The scope is a technical name, auto-populated but editable \u2014 for example, x_snc_lab_lfr. This dummy scope will not be used in the exercise. Click Back to list once done. Note: you may get an error that your scope cannot be created because someone with similar initials has already created theirs.',
    image: "sc_fund_dummy_scope_create.png"
  },
  {
    text: "Verify you are in the correct scope after creating it, by clicking the scope (globe icon) and confirming it shows the Lab <YOUR INITIALS> Forecast Variance label you just created. Being in the correct scope avoids access and object management issues.",
    image: "sc_fund_forcast_variance_dummy.png"
  },
  {
    text: "This next step is critical: change scope again after creating the simulation scope. Click the scope (globe icon) and select Forecast Variance, this time WITHOUT your initials. This is the scope you will use throughout the lab.",
    image: "sc_fund_forcast_variance_scope.png",
    critical: true
  },
  {
    text: "Now that you are in the right scope, navigate to All, type System Definition, then search for Tables.",
    image: "sc_fund_sysdef_tables_nav.png"
  },
  {
    text: "Note: the table you create in the next steps will NOT be used for the rest of the lab, and serves mainly to introduce how target tables for REST API endpoints are created in ServiceNow.",
    image: null,
    note: true
  },
  {
    text: "Go to the top-right of the navigation and click New.",
    image: "sc_fund_new_table.png"
  },
  {
    text: 'Provide the Label as "Expense Transaction Event <your initials>". The Name (technical identifier) auto-populates and can be modified. Finally, untick Create module.',
    image: "sc_fund_new_table_details.png"
  },
  {
    text: "Right-click the header and click Save.",
    image: "sc_fund_save.png"
  },
  {
    text: "Staying on the same screen, an option to create fields for the table appears. In the Columns tab, click New.",
    image: "sc_fund_new_field.png"
  },
  {
    text: "As an example: provide the Type (String), the Column label (Cost Center, which auto-populates the Column name), and since it is a string, a Max length of 40. Right-click the header and Save.",
    image: "sc_fund_field_details.png"
  },
  {
    text: "Repeat for all 16 other fields, varying Column label, Column name, Type, and Max length as needed. Keep Display as false across all fields. These fields are expense, invoice, and finance related \u2014 correct data foundations are critical so agents have the correct context and structure.",
    image: "sc_fund_all_fields.png"
  }
];

/** Component / version table from the AIUX home page. */
export const DEPENDENCIES: { component: string; version: string }[] = [
  { component: "Zero Copy Connector for SQL", version: "2.0.0" },
  { component: "Zero Copy Connector for ERP", version: "8.0.14" },
  {
    component: "External Content Connectors for SharePoint Online",
    version: "4.1.7"
  },
  { component: "Workflow Studio", version: "28.1.4" },
  { component: "Now Assist Skill Kit", version: "6.0.7" },
  { component: "MCP Server", version: "1.0.0" },
  { component: "MCP Client", version: "1.0.7" },
  { component: "Lens", version: "2.0.0" },
  { component: "Document Intelligence", version: "7.1.5" }
];
