import React from "react";
import { asset, DEPENDENCIES } from "../content";
import { MAIN_EXERCISES, EXTENDED_EXERCISES, HUNGRY_FOR_MORE } from "../toc";

export default function Home({
  navigate
}: {
  navigate: (p: string) => void;
}) {
  return (
    <div className="lab-page">
      <figure className="lab-figure">
        <img
          className="lab-img"
          src={asset("sc_readme_hero.png")}
          alt="Workflow Data Fabric lab hero"
        />
      </figure>

      <header className="lab-titleblock">
        <span className="lab-tag lab-tag--section">APAC AI End-to-End Lab</span>
        <h2 className="lab-h1">Workflow Data Fabric</h2>
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
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">How this workshop works</h3>
        <figure className="lab-figure">
          <img
            className="lab-img"
            src={asset("sc_slide_how_this_workshop_works.png")}
            alt="Diagram of how the workshop is structured"
          />
        </figure>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Outcome</h3>
        <figure className="lab-figure">
          <img
            className="lab-img"
            src={asset("dataflow_outcome_agent_flow.png")}
            alt="Outcome agent flow for the lab"
          />
        </figure>
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Exercises</h3>
        <ul className="lab-steps" style={{ listStyleType: "none", paddingLeft: 0 }}>
          <li className="lab-step">
            <button
              type="button"
              className="lab-action lab-action--outline"
              onClick={() => navigate("/diagrams")}
            >
              Workflow Data Fabric Diagrams
            </button>
          </li>
        </ul>

        {[
          { label: "Main Exercises", items: MAIN_EXERCISES },
          { label: "Extended Exercises", items: EXTENDED_EXERCISES },
          { label: "Hungry for more?", items: HUNGRY_FOR_MORE }
        ].map(group => (
          <div className="lab-section" key={group.label}>
            <h4 className="lab-h4">{group.label}</h4>
            <table className="lab-table">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Difficulty</th>
                  <th>AI agents</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map(item => (
                  <tr key={item.path}>
                    <td>
                      <button
                        type="button"
                        className="lab-action lab-action--outline"
                        onClick={() => navigate(item.path)}
                      >
                        {item.title}
                      </button>
                    </td>
                    <td>{item.difficulty ?? "\u2014"}</td>
                    <td>{item.aiAgents ? "Yes" : "No"}</td>
                    <td>{item.duration ?? "\u2014"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <section className="lab-section">
        <h3 className="lab-h3">Lab dependencies</h3>
        <table className="lab-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {DEPENDENCIES.map(d => (
              <tr key={d.component}>
                <td>{d.component}</td>
                <td>{d.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
