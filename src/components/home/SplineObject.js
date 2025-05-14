"use client";

import { useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { useSplineContext } from "@/context/SplineContext";
import { useTheme } from "@/context/ThemeContext";

export default function SplineObject({ scene }) {
  const splineRef = useRef(null);
  const { registerSplineObject, splineLoaded } = useSplineContext();
  const { theme } = useTheme();

  // Different scene URLs based on the page and theme
  const getSceneUrl = () => {
    if (scene === "hero") {
      return theme === "dark"
        ? "https://prod.spline.design/pmZ129ZaIsO9Pnvs/scene.splinecode"
        : "https://prod.spline.design/pmZ129ZaIsO9Pnvs/scene.splinecode";
    } else if (scene === "about") {
      return theme === "dark"
        ? "https://prod.spline.design/pmZ129ZaIsO9Pnvs/scene.splinecode"
        : "https://prod.spline.design/pmZ129ZaIsO9Pnvs/scene.splinecode";
    } else if (scene === "loader") {
      return "https://prod.spline.design/pmZ129ZaIsO9Pnvs/scene.splinecode";
    }
    // Default scene
    return "https://prod.spline.design/pmZ129ZaIsO9Pnvs/scene.splinecode";
  };

  const onLoad = (spline) => {
    splineRef.current = spline;
    registerSplineObject(scene, spline);
    splineLoaded(scene);
  };

  return (
    <div className="spline-container w-full h-full">
      <Spline scene={getSceneUrl()} onLoad={onLoad} />
    </div>
  );
}
