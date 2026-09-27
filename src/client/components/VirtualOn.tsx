import React, { useEffect, useRef } from "react";
import { buildVirtualOnDoc } from "../virtual-on";

export default function VirtualOn() {
  const ref = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let active = true;
    void buildVirtualOnDoc().then(doc => {
      if (active && ref.current) ref.current.srcdoc = doc;
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <iframe
      ref={ref}
      className="lab-vo-frame"
      title="Workflow Data Fabric"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
