import React, { useState } from "react";
import { Icon } from "../icons";
import { NAV, NavSection } from "../toc";

interface Props {
  route: string;
  navigate: (path: string) => void;
  children?: React.ReactNode;
}

function isActive(route: string, path?: string) {
  if (!path) return false;
  return route === path || route.startsWith(`${path}/`);
}

function sectionHasActive(route: string, section: NavSection) {
  return Boolean(section.items?.some(i => isActive(route, i.path)));
}

export default function Shell({ route, navigate, children }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    NAV.forEach(s => {
      if (s.items) init[s.id] = sectionHasActive(route, s);
    });
    return init;
  });

  const toggle = (id: string) =>
    setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="lab-app">
      <header className="lab-header">
        {/*
         * Genuine ServiceNow logo: the wdf-lab experience theme's own asset,
         * db_image "light_logo.svg" (sys_id 97ec325f3f523210860f2248001f8b20),
         * served by the platform. Never substitute a redrawn wordmark.
         */}
        <img className="lab-logo" src="/light_logo.svg" alt="ServiceNow" />
        <h1 className="lab-app-title">WDF Lab</h1>
      </header>

      <nav className="lab-sidebar" aria-label="Lab navigation">
        <ul className="lab-nav">
          {NAV.map(section => (
            <li key={section.id}>
              {section.dividerBefore && (
                <div className="lab-nav-divider" role="presentation" />
              )}

              {section.path ? (
                <button
                  type="button"
                  className={`lab-nav-btn${
                    isActive(route, section.path) ? " is-active" : ""
                  }`}
                  onClick={() => navigate(section.path as string)}
                >
                  <Icon name={section.icon} />
                  <span className="lab-nav-btn-label">{section.title}</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className={`lab-nav-btn${
                      sectionHasActive(route, section) ? " is-active" : ""
                    }`}
                    aria-expanded={Boolean(open[section.id])}
                    onClick={() => toggle(section.id)}
                  >
                    <Icon name={section.icon} />
                    <span className="lab-nav-btn-label">{section.title}</span>
                    <span
                      className={`lab-nav-caret${
                        open[section.id] ? " is-open" : ""
                      }`}
                    >
                      <Icon name="chevronRight" size={12} />
                    </span>
                  </button>

                  {open[section.id] && (
                    <ul className="lab-nav-l2">
                      {section.items?.map(item => (
                        <li key={item.path}>
                          <button
                            type="button"
                            className={`lab-nav-btn${
                              isActive(route, item.path) ? " is-active" : ""
                            }`}
                            onClick={() => navigate(item.path)}
                          >
                            <span className="lab-nav-btn-label">
                              {item.title}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <main className="lab-main">{children}</main>
    </div>
  );
}
