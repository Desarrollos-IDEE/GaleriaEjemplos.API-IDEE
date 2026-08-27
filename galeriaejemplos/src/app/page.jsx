'use client';
import React, { useState, useEffect } from "react";
import LoadingIcon from "@/components/Helpers/LoadingIcon";
import Home from "@/components/pages/HomePage";
import { metadatos, description } from "./ejemplos.js";

export default function GaleriaEjemplosHomePage() {
  const [blocking, setBlocking] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !window.IDEE || !blocking) return;

    const handleInit = () => {
      setBlocking(false);
    };

    handleInit();

  }, [blocking, hasMounted]);

  if (!hasMounted) return null;
  
  return (
    <>
      {blocking ?
        <div className="block-loader-container">
          <LoadingIcon width={256} height={256} />
        </div>
        :
        <Home title1={description[0].title1} title2={description[1].title2} subtitle={description[2].subtitle} description={description[3].description} metadatos={metadatos} />
      }
    </>
  );
}