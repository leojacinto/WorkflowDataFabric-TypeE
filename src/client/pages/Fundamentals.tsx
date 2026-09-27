import React from "react";
import { asset, DEPENDENCY_STEPS, SCOPE_STEPS } from "../content";
import StepList from "../components/StepList";

export default function Fundamentals({
  navigate
}: {
  navigate: (p: string) => void;
}) {
  return (
    <div className="lab-page">
      <header className="lab-titleblock">
        <span className="lab-tag lab-tag--section">Main Exercises</span>
        <h2 className="lab-h2">Lab Exercise: Fundamentals</h2>
        <div className="lab-badges">
          <span className="lab-tag lab-tag--level">Beginner</span>
          <span className="lab-tag lab-tag--ghost">No AI agents</span>
          <span className="lab-tag lab-tag--ghost">30 minutes</span>
        </div>
      </header>

      <section className="lab-section">
        <p className="lab-p">
          Not a fan of complicated schematics and the Data and Flow Diagrams not
          to your liking? Check out the simplified architectural view of the
          solution you will be building below.
        </p>
        <figure className="lab-figure">
          <img
            className="lab-img"
            src={asset("sc_slide_e2e_architecture.png")}
            alt="Simplified end-to-end architecture diagram of the lab solution"
          />
        </figure>
        <p className="lab-p">
          This lab will walk you through creation of the scoped tables needed to
          interact with the external system integrations.
        </p>
        <figure className="lab-figure">
          <img
            className="lab-img"
            src={asset("sc_slide_fundamentals_overview.png")}
            alt="Overview diagram of the Fundamentals exercise scope"
          />
        </figure>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Data flow</h3>
        <p className="lab-p">
          The data flow below shows how ServiceNow consumes REST API endpoints
          via an Integration Hub Spoke, further processed by a Flow so the
          entries are written to the scoped table.
        </p>
        <figure className="lab-figure">
          <img
            className="lab-img"
            src={asset("dataflow_fundamentals.png")}
            alt="Fundamentals exercise data flow diagram"
          />
        </figure>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Lab story</h3>
        <p className="lab-p">
          While you have the power of CMDB at your fingertips, the process we are
          solving for here does not concern CI data. You will need to create a
          scoped table which will store information from an expense event API.
          This can come from cloud services such as AWS or Azure.
        </p>
        <p className="lab-p">
          The table you create here will not be used for the rest of the lab and
          serves mainly to introduce how target tables for REST API endpoints are
          created for ServiceNow.
        </p>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Steps</h3>

        <h4 className="lab-h4">
          <span className="lab-tag lab-tag--note">
            Skip if already done for AI Day 1
          </span>
          Install Lab Dependencies
        </h4>
        <p className="lab-p">
          This contains critical steps to prepare your Demo Hub instance.
        </p>
        <StepList steps={DEPENDENCY_STEPS} />

        <h4 className="lab-h4">Hands on: Create a Scope</h4>
        <p className="lab-p">
          Create a dummy scope. This activity is meant to make you familiar with
          scope creation &mdash; the scope you create here will not be used in
          the lab. If you are familiar with scope creation, you can skip this
          exercise, as it is not a dependency for the rest of the exercises.
        </p>
        <StepList steps={SCOPE_STEPS} />
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Conclusion</h3>
        <div className="lab-callout">
          Congratulations! You have created the destination table within
          ServiceNow for the external REST API sources. As a recap, the table you
          created will NOT be used for the rest of the steps and serves mainly to
          introduce how target tables for REST API endpoints are created for
          ServiceNow.
        </div>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Next step</h3>
        <p className="lab-p">
          Let us continue building the data foundations for the use case. Next up
          is creation of the Data Fabric tables which will be used by AI Agents.
        </p>
        <button
          type="button"
          className="lab-action lab-action--primary"
          onClick={() => navigate("/exercises/integration-hub")}
        >
          Continue to Integration Hub
        </button>
      </section>

      <button
        type="button"
        className="lab-action lab-action--outline"
        onClick={() => navigate("/home")}
      >
        Take me back to main page
      </button>
    </div>
  );
}
