"use client";

import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import ScrollAnimationSection from "@/components/home/ScrollAnimationSection";
import PageTransition from "@/components/shared/PageTransition";
import { useSplineContext } from "@/context/SplineContext";

export default function Home() {
  const { resetSplineObject } = useSplineContext();

  useEffect(() => {
    // Initialize or reset Spline object when page loads
    resetSplineObject("home");
  }, [resetSplineObject]);

  return (
    <PageTransition>
      <div className="relative">
        <HeroSection />
        <ScrollAnimationSection />
      </div>
    </PageTransition>
  );
}
