"use client";

import { useEffect, useRef } from "react";
import { createIframeDocument } from "@/utils/iframeExecutor";

import "./Map.css";

export default function Map({ htmlCode, cssCode, jsCode, onExecutionError }) {

  const iframeRef = useRef(null);


  useEffect(() => {

    if (!iframeRef.current) { return; }
    if (!htmlCode) { return; }

    try {
      onExecutionError?.(null);
      const document = createIframeDocument(htmlCode, cssCode, jsCode);

      iframeRef.current.srcdoc = document;
    }
    catch (error) {
      console.error(error);

      onExecutionError?.(
        error.message
      );
    }

  }, [htmlCode, cssCode, jsCode]);

  return (
      <iframe ref={iframeRef} className="map-iframe" title="Visualizador API-IDEE" />
  );
}