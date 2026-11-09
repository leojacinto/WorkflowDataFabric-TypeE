import React from "react";
import { asset } from "../content";
import { MAIN_EXERCISES, EXTENDED_EXERCISES, HUNGRY_FOR_MORE } from "../toc";
import VirtualOn from "../components/VirtualOn";

/* Content below is verbatim from the lab's GitBook README.md. */

const MOTIVATION_BULLETS: [string, string][] = [
  ["Detect budget issues in real-time", " before they escalate"],
  ["Scale financial operations", " with AI agents, not headcount"],
  [
    "Automate financial case creation",
    " enriched with multiple external data sources and trend analysis"
  ]
];

const PROBLEMS = [
  "\u201cWe find out about budget overruns too late: can we get real-time alerts?\u201d",
  "\u201cInvestigation means manually searching expenses, reports, and memos: can you unify this?\u201d",
  "\u201cWe answer the same questions daily: can employees self-serve?\u201d"
];

const OUTCOME_BULLETS: [string, string][] = [
  ["Integration Hub", " for real-time expense event processing"],
  [
    "Zero Copy integration",
    " with ERP and cloud warehouses (no data duplication)"
  ],
  [
    "MCP Server",
    " enabling integration with any application that supports the protocol"
  ],
  ["AI agents", ""],
  [
    "Lens and Document Intelligence",
    " for invoice data capture individually or batch, respectively"
  ],
  [
    "External Content Connector",
    " bringing executive memos into making decisions"
  ],
  [
    "Finance Case Management",
    " which receives the cases pre-processed by the AI Agents based on data taken from WDF"
  ]
];

const COURSES = [
  {
    course: "What are the Components of Workflow Data Fabric",
    href:
      "https://learning.servicenow.com/lxp/en/general/what-are-the-components-of-workflow-data-fabric?id=learning_course_prev&course_id=5a15e37147052e103c6f6013e16d430b&s=1&ssa=3",
    level: "Beginner",
    type: "On-demand Course",
    duration: "10 minutes"
  },
  {
    course: "Workflow Data Fabric Explained",
    href:
      "https://learning.servicenow.com/lxp/en/automation-engine/workflow-data-fabric-explained?id=learning_course_prev&course_id=72a3657f87671a58e6ba74c7dabb35c6&s=1&ssa=3",
    level: "Beginner",
    type: "On-demand Course",
    duration: "1 hour, 5 minutes"
  },
  {
    course: "Introduction to AI Search and External Content Connectors",
    href:
      "https://learning.servicenow.com/lxp/en/now-platform/introduction-to-ai-search-and-external-content-connectors?id=learning_course_prev&course_id=62283c7c93d46e50f2d9bc686cba107b&s=1&ssa=3",
    level: "Beginner",
    type: "On-demand Course",
    duration: "1 hour, 10 minutes"
  }
];

const DEPENDENCY_ROWS: [string, string][] = [
  ["Zero Copy Connector for SQL", "2.0.0"],
  ["Zero Copy Connector for ERP", "8.0.14"],
  ["External Content Connectors for SharePoint Online", "4.1.7"],
  ["Workflow Studio", "28.1.4"],
  ["Now Assist Skill Kit", "6.0.7"],
  ["MCP Server", "1.0.0"],
  ["MCP Client", "1.0.7"],
  ["Lens", "2.0.0"],
  ["Document Intelligence", "7.1.5"]
];

const CREDITS: [string, string][] = [
  ["Krithiga Velmurugan", "https://www.linkedin.com/in/krithiga-velmurugan-306757159/"],
  ["Kamal Shewakramani", "https://www.linkedin.com/in/kamal-shewakramani/"],
  ["Gurjot Joshi", "https://www.linkedin.com/in/gurjotjoshi/"],
  ["Santosh Panda", "https://www.linkedin.com/in/santosh-panda015/"],
  ["Jia Khee Lim", "https://www.linkedin.com/in/jia-khee-lim-79427a151/"],
  ["Rahul Adlakha", "https://www.linkedin.com/in/rahuladlakha/"],
  ["Theo Simmons", "https://www.linkedin.com/in/theo-simmonsnow/"],
  ["Quentin Carton", "https://www.linkedin.com/in/quentincarton/"],
  ["Dan Clark", "https://www.linkedin.com/in/dannyclark/"]
];

export default function Home({
  navigate
}: {
  navigate: (p: string) => void;
}) {
  return (
    <div className="lab-page">
      <VirtualOn />

      <header className="lab-titleblock">
        <span className="lab-tag lab-tag--section">APAC AI End-to-End Lab</span>
        <h2 className="lab-h1">Workflow Data Fabric</h2>
        <p className="lab-p">
          Building integrations and agents to scale financial intelligence
        </p>
      </header>

      <section className="lab-section">
        <h3 className="lab-h3">Business motivation</h3>

        <figure className="lab-figure">
          <img
            className="lab-img"
            src={asset("sc_slide_building_for_whom.gif")}
            alt="Illustration of the Finance Managers and Cost Center Owners this lab is built for"
          />
        </figure>

        <p className="lab-p">
          Finance teams discover budget overruns weeks too late. Expense
          analysis requires manually piecing together data from ERP systems,
          data warehouses, and SharePoint. By the time finance reacts, small
          variances become major problems.{" "}
          <strong className="lab-strong">
            ServiceNow Workflow Data Fabric transforms reactive financial
            management into proactive intelligence
          </strong>
          . By unifying data across systems through Zero Copy for SQL and ERP,
          Integration Hub, External Content Connectors, MCP, and AI agents,
          organizations can:
        </p>

        <ul className="lab-list">
          {MOTIVATION_BULLETS.map(([lead, rest]) => (
            <li key={lead}>
              <strong className="lab-strong">{lead}</strong>
              {rest}
            </li>
          ))}
        </ul>

        <p className="lab-p">
          Your automations and AI Agents are just as good as your underlying
          data. Integrations powered by Workflow Data Fabric allow AI Agents to
          automate critical processes using accurate and consistent data.
        </p>

        <p className="lab-p">
          With the trend of external agents reaching through enterprise data, it
          is worth examining why platform-native agents can scale more safely.
          Agents built within ServiceNow inherit battle-tested authorization
          models: role-based access, ACLs, and purpose-built security controls
          for AI agents; allowing organizations to automate confidently without
          stepping outside their governance boundaries.
        </p>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Persona context</h3>
        <p className="lab-p">
          You&rsquo;re a <strong className="lab-strong">Data Architect</strong>{" "}
          serving the Finance department. Finance Managers need immediate
          visibility into budget performance. Cost Center Owners need to
          understand why they&rsquo;re over budget; with context beyond just
          numbers. <strong className="lab-strong">Your mission</strong>: Build
          an intelligent financial data fabric that connects ServiceNow to
          external systems, deploys AI agents to detect and analyze budget
          issues automatically, surfaces executive guidance, and enables
          self-service analytics through Employee Center and Claude Desktop.
          You&rsquo;ll solve three critical problems:
        </p>
        <ol className="lab-list lab-list--ordered">
          {PROBLEMS.map(p => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Outcome</h3>

        <figure className="lab-figure">
          <img
            className="lab-img"
            src={asset("dataflow_outcome_agent_flow.png")}
            alt="Agent tools and data sources flowing to external systems"
          />
        </figure>

        <blockquote className="lab-quote">
          <strong className="lab-strong">Legend:</strong> &#128994; Data |
          &#128995; Workflow Data Fabric | &#128309; External Systems | &#9898;
          Workspace | &darr; Takes data from
        </blockquote>

        <figure className="lab-figure">
          <img
            className="lab-img"
            src={asset("sc_readme_hero.png")}
            alt="Illustration of the completed Workflow Data Fabric solution"
          />
        </figure>

        <p className="lab-p">
          By completing this lab, you&rsquo;ll build an interconnected financial
          intelligence platform demonstrating:
        </p>

        <ul className="lab-list">
          {OUTCOME_BULLETS.map(([lead, rest]) => (
            <li key={lead}>
              <strong className="lab-strong">{lead}</strong>
              {lead === "AI agents" ? (
                <>
                  {" that autonomously search via "}
                  <a
                    className="lab-link"
                    href="https://en.wikipedia.org/wiki/Retrieval-augmented_generation"
                    target="_blank"
                    rel="noreferrer"
                  >
                    RAG
                  </a>
                  {", analyze trends, and create contextual cases"}
                </>
              ) : (
                rest
              )}
            </li>
          ))}
        </ul>

        <p className="lab-p">
          You&rsquo;ll master the architectural patterns for transforming siloed
          enterprise data into unified, intelligent decision-making platforms.{" "}
          <strong className="lab-strong">
            Let&rsquo;s build something intelligent
          </strong>
          .
        </p>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Lab exercises</h3>
        <p className="lab-p">
          This lab is divided into 7 exercises over 3 sections with the
          suggested sequence below. The ServiceNow-led lab environments which
          contains these exercises will allow you to complete individual labs in
          any sequence you prefer. The exercises focus on walk through and basic
          configuration of Workflow Data Fabric integrations and there are
          pre-made custom agents that make use of the integrations to
          demonstrate what is possible. You will not need to configure agents in
          this lab but steps are provided on how you can explore how the agents
          were configured.
        </p>
        <p className="lab-p">
          This is designed to be a full day workshop covering most of
          WDF&rsquo;s capabilities. As such, we will not be able to cover in
          great depth all of the capabilities. If there are capabilities most
          relevant to your requirements, do ask your Lab Admin if there is a
          relevant deep dive lab available.
        </p>

        <table className="lab-table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>AI Agents involved</th>
              <th>Suggested duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button
                  type="button"
                  className="lab-linkbtn"
                  onClick={() => navigate("/diagrams")}
                >
                  Workflow Data Fabric Diagrams
                </button>
              </td>
              <td>N/A</td>
              <td>No</td>
              <td>N/A</td>
            </tr>

            {[
              { label: "Main Exercises", items: MAIN_EXERCISES },
              { label: "Extended Exercises", items: EXTENDED_EXERCISES },
              { label: "Hungry for more?", items: HUNGRY_FOR_MORE }
            ].map(group => (
              <React.Fragment key={group.label}>
                <tr>
                  <td colSpan={4}>
                    <strong className="lab-strong">{group.label}</strong>
                  </td>
                </tr>
                {group.items.map(item => (
                  <tr key={item.path}>
                    <td>
                      <button
                        type="button"
                        className="lab-linkbtn"
                        onClick={() => navigate(item.path)}
                      >
                        {item.title}
                      </button>
                    </td>
                    <td>{item.difficulty ?? "N/A"}</td>
                    <td>{item.aiAgents ? "Yes" : "No"}</td>
                    <td>{item.duration ?? "N/A"}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">How each lab exercise will be conducted</h3>
        <figure className="lab-figure">
          <img
            className="lab-img"
            src={asset("sc_slide_how_this_workshop_works.png")}
            alt="Diagram of how each lab exercise is conducted"
          />
        </figure>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Post-lab recommended materials</h3>
        <p className="lab-p">
          Below is a list of recommended courses that you can read up on after
          the lab to learn more about Workflow Data Fabric.
        </p>
        <table className="lab-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Level</th>
              <th>Type</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {COURSES.map(c => (
              <tr key={c.course}>
                <td>
                  <a
                    className="lab-link"
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.course}
                  </a>
                </td>
                <td>{c.level}</td>
                <td>{c.type}</td>
                <td>{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">A note from the author and some disclaimers</h3>
        <p className="lab-p">
          This lab involves integrating ServiceNow with external systems (e.g.,
          databases, APIs, cloud services). Some steps require pre-configured
          environments and connectivity that may not be available in a standard
          PDI; this is best run as a guided workshop.
        </p>

        <h4 className="lab-h4">ServiceNow dependencies</h4>
        <p className="lab-p">
          Before attempting these exercises, ensure you have access and license
          entitlements to the following:
        </p>
        <table className="lab-table">
          <thead>
            <tr>
              <th>Component needed</th>
              <th>Required version, Zurich Patch 4 recommended</th>
            </tr>
          </thead>
          <tbody>
            {DEPENDENCY_ROWS.map(([component, version]) => (
              <tr key={component}>
                <td>{component}</td>
                <td>{version}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 className="lab-h4">About the author</h4>
        <p className="lab-p">
          This lab is created by{" "}
          <a
            className="lab-link"
            href="https://www.linkedin.com/in/leojmfrancia/"
            target="_blank"
            rel="noreferrer"
          >
            Leo Francia
          </a>
          , a Data Architect at ServiceNow, and is in no way a ServiceNow
          official manual. Leo is an active member of the{" "}
          <a
            className="lab-link"
            href="https://www.servicenow.com/community/workflow-data-fabric/ct-p/workflow-data-fabric"
            target="_blank"
            rel="noreferrer"
          >
            ServiceNow community
          </a>{" "}
          and presales organization so do not hesitate to drop him a note. He is
          also not sure if he should continue to talk about himself in the third
          person, but please leave him be.
        </p>

        <h4 className="lab-h4">Acknowledgement</h4>
        <p className="lab-p">
          This lab would not have been possible without the help of exceptional
          colleagues at ServiceNow:
        </p>
        <ul className="lab-list">
          {CREDITS.map(([name, href]) => (
            <li key={name}>
              <a
                className="lab-link"
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
