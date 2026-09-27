import React from "react";
import { asset, Step } from "../content";

export default function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="lab-steps">
      {steps.map((step, i) => (
        <li key={i} className="lab-step">
          <div className="lab-step-body">
            {step.critical && (
              <span className="lab-tag lab-tag--critical">Critical</span>
            )}
            {step.note && <span className="lab-tag lab-tag--note">Note</span>}
            <span>{step.text}</span>
          </div>
          {step.image && (
            <figure className="lab-figure lab-figure--step">
              <img
                src={asset(step.image)}
                alt=""
                loading="lazy"
                className="lab-img lab-img--inline"
              />
            </figure>
          )}
        </li>
      ))}
    </ol>
  );
}
