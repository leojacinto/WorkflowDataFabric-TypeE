import React, { useCallback, useEffect, useState } from "react";
import Shell from "./components/Shell";
import Home from "./pages/Home";
import LabPage from "./pages/LabPage";
import { findItem } from "./toc";
import "./app.css";

const DEFAULT_ROUTE = "/home";

/*
 * Routing uses the `view` search param so every lab page is linkable, e.g.
 * x_snc_forecast_v_0_fundamentals.do?view=/exercises/fundamentals
 */
function routeFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("view") || DEFAULT_ROUTE;
}

function titleFor(route: string): string {
  const item = findItem(route);
  return item ? `${item.title} \u00b7 WDF Lab` : "WDF Lab";
}

export default function App() {
  const [route, setRoute] = useState<string>(routeFromUrl);

  useEffect(() => {
    const onPop = () => setRoute(routeFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((path: string) => {
    const params = new URLSearchParams({ view: path });
    const relativePath = `${window.location.pathname}?${params}`;
    const title = titleFor(path);

    if (window.self !== window.top) {
      const ce = (window as unknown as {
        CustomEvent: { fireTop?: (n: string, d: unknown) => void };
      }).CustomEvent;
      ce?.fireTop?.("magellanNavigator.permalink.set", {
        relativePath,
        title
      });
    }

    window.history.pushState({ view: path }, "", relativePath);
    document.title = title;
    setRoute(path);
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    document.title = titleFor(route);
  }, [route]);

  let body: React.ReactNode;
  if (route === "/home") {
    body = <Home navigate={navigate} />;
  } else {
    const item = findItem(route) || { path: route, title: "Not found" };
    body = <LabPage route={route} item={item} navigate={navigate} />;
  }

  return (
    <Shell route={route} navigate={navigate}>
      {body}
    </Shell>
  );
}
