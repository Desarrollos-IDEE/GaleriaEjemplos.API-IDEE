"use client";

import { useEffect, useRef, useState } from "react";

import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";

import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

import { oneDark } from "@codemirror/theme-one-dark";

import "./Code.css";


export default function Code({ htmlCode, cssCode, jsCode, onChangeHTML, onChangeCSS, onChangeJS, onExecute, executionError }) {

  const [tab, setTab] = useState("html");

  const editorRef = useRef(null);
  const viewRef = useRef(null);

  const getCode = () => {
    return tab === "html" ? htmlCode : tab === "css" ? cssCode : jsCode;
  };

  const handleChange = v => ({ html: onChangeHTML, css: onChangeCSS, js: onChangeJS }[tab]?.(v));

  useEffect(() => {

    if (!editorRef.current) {
      return;
    }

    // Destruir editor anterior
    viewRef.current && (viewRef.current.destroy(), viewRef.current = null);

    let language = tab === "html" ? html() : tab === "css" ? css() : javascript();

    const startState = EditorState.create({
      doc: getCode(), extensions: [basicSetup, language, EditorView.lineWrapping, oneDark, EditorView.updateListener.of((update) => {

        if (update.docChanged) {
          const value = update.state.doc.toString();
          handleChange(value);
        }

      }),

        EditorView.theme({
          "&": { height: "100%" }, ".cm-scroller": { overflow: "auto" },
        }),

      ],

    });

    viewRef.current = new EditorView({ state: startState, parent: editorRef.current });

    return () => {
      viewRef.current && (viewRef.current.destroy(), viewRef.current = null);
    };

  }, [tab]);

  useEffect(() => {

    if (!viewRef.current) {
      return;
    }

    const currentValue = viewRef.current.state.doc.toString();
    const newValue = getCode();

    if (currentValue === newValue) {
      return;
    }

    viewRef.current.dispatch({
      changes: {
        from: 0,
        to: currentValue.length,
        insert: newValue,
      },
    });

  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="m-code-panel">
      <div className="m-code-header">
        <div className="m-code-tabs">
          <button className={tab === "html" ? "active" : ""} onClick={() => setTab("html")}> HTML </button>
          <button className={tab === "css" ? "active" : ""} onClick={() => setTab("css")}> CSS </button>
          <button className={tab === "js" ? "active" : ""} onClick={() => setTab("js")}> JS </button>
        </div>
        <button className="m-code-execute" onClick={onExecute}> Ejecutar </button>
      </div>
      <div ref={editorRef} className="m-code-editor" />
      {executionError && (
        <div className="m-code-error">
          <pre> {executionError} </pre>
        </div>
      )}
    </div>
  );
}