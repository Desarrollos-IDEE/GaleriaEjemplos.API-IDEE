"use client";

import React, { useEffect, useState } from "react";

import LoadingIcon from "@/components/Helpers/LoadingIcon";
import Map from "@/components/Map/Map";
import Code from "@/components/Code/Code";
import Header from "@/components/Header/Header";

import { generateJS } from "@/utils/jsGenerator";
import { generateHTML } from "@/utils/htmlGenerator";
import { generateCSS } from "@/utils/cssGenerator";

import "./MapPage.css";


export default function MapPage({ config }) {

  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [executedCode, setExecutedCode] = useState({ html: "", css: "", js: "" });
  const [executionError, setExecutionError] = useState(null);
  const [leftWidth, setLeftWidth] = useState(40);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!config) return;
    const { favicon, mapOptions, layers, plugins } = config;
    const html = generateHTML(favicon, plugins);
    const css = generateCSS();
    const js = generateJS(mapOptions, layers, plugins);

    setHtmlCode(html);
    setCssCode(css);
    setJsCode(js);

    setExecutedCode({ html, css, js });

  }, [config]);

  useEffect(() => {
    const handleIframeMessage = (event) => {
      if (event.data?.type !== "MAP_ERROR") return;

      setExecutionError(event.data.error || "Error desconocido en el visor");
    };

    window.addEventListener("message", handleIframeMessage);

    return () => {
      window.removeEventListener("message", handleIframeMessage);
    };
  }, []);


  const startResize = (event) => {
    event.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {

    if (!isResizing) return;


    const handleMouseMove = (event) => {
      const width = (event.clientX / window.innerWidth) * 100;
      const newWidth = Math.min(80, Math.max(20, width));

      setLeftWidth(newWidth);
    };

    const handleMouseUp = () => { setIsResizing(false); };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener( "mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

  }, [isResizing]);

  const handleExecute = () => {
    setExecutionError(null);
    setExecutedCode({ html: htmlCode, css: cssCode, js: jsCode });
  };

  const handleExecutionError = (error) => {
    setExecutionError(error);
  };

  if (!config) {
    return (
      <div className="block-loader-container">
        <LoadingIcon width={256} height={256} />
      </div>
    );
  }

  return (
    <div className="page-root">
      <Header showSearch={false} />
      <div className={`page-content ${isResizing ? "is-resizing" : ""}`}>
        <section className="panel-left" style={{ width: `${leftWidth}%` }} >
          <Code htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} onChangeHTML={setHtmlCode} onChangeCSS={setCssCode} onChangeJS={setJsCode} onExecute={handleExecute} executionError={executionError} /></section>
        <div className="panel-resizer" onMouseDown={startResize}>
          <div className="resizer-arrow"> ↔ </div>
        </div>
        <section className="panel-right">
          <Map htmlCode={executedCode.html} cssCode={executedCode.css} jsCode={executedCode.js} onExecutionError={handleExecutionError} />
        </section>
      </div>
    </div>
  );
}