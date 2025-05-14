"use client";

import { useState, useEffect, useCallback } from "react";
import { useSplineContext } from "@/context/SplineContext";

export default function useSplineAnimation(options = {}) {
  const { animateSplineObject } = useSplineContext();
  const [animationState, setAnimationState] = useState({
    isAnimating: false,
    animationType: null,
  });

  const { autoReset = true, resetDelay = 1000 } = options;

  // Trigger a specific animation
  const triggerAnimation = useCallback(
    (type, params = {}) => {
      setAnimationState({
        isAnimating: true,
        animationType: type,
      });

      // Pass the animation to the Spline context
      animateSplineObject(type, params);

      // Auto reset if enabled
      if (autoReset) {
        setTimeout(() => {
          setAnimationState({
            isAnimating: false,
            animationType: null,
          });
        }, resetDelay);
      }
    },
    [animateSplineObject, autoReset, resetDelay]
  );

  // Reset the animation state manually
  const resetAnimation = useCallback(() => {
    setAnimationState({
      isAnimating: false,
      animationType: null,
    });
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationState.isAnimating && autoReset) {
        resetAnimation();
      }
    };
  }, [animationState.isAnimating, autoReset, resetAnimation]);

  return {
    triggerAnimation,
    resetAnimation,
    isAnimating: animationState.isAnimating,
    currentAnimation: animationState.animationType,
  };
}
