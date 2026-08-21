"use client";

import { useEffect, useRef } from "react";
import { createIframeDocument } from "@/utils/iframeExecutor";

import "./Map.css";

export default function Map({ htmlCode, cssCode, jsCode, onExecutionError }) {

  const iframeRef = useRef(null);

  useEffect(() => {

    const handleMessage = (event) => {

      if (event.data?.type === "MAP_ERROR") {
        console.error("Error en ejemplo:", event.data.error);
        onExecutionError?.(event.data.error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };

  }, [onExecutionError]);


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

    <div className="m-map-panel">
      <iframe ref={iframeRef} className="m-map-iframe" title="Visualizador API-IDEE" />
    </div>
  );
}