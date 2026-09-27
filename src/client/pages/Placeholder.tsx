import React from "react";
import { TocItem } from "../toc";

export default function Placeholder({
  item,
  navigate
}: {
  item: TocItem;
  navigate: (p: string) => void;
}) {
  return (
    <div className="lab-page">
      <header className="lab-titleblock">
        <h2 className="lab-h2">{item.title}</h2>
        {(item.difficulty || item.duration) && (
          <div className="lab-badges">
            {item.difficulty && (
              <span className="lab-tag lab-tag--level">{item.difficulty}</span>
            )}
            <span className="lab-tag lab-tag--ghost">
              {item.aiAgents ? "AI agents" : "No AI agents"}
            </span>
            {item.duration && (
              <span className="lab-tag lab-tag--ghost">{item.duration}</span>
            )}
          </div>
        )}
      </header>

      <div className="lab-placeholder">
        This exercise has not been ported into this page yet.
      </div>

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
