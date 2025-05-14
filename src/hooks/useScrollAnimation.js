"use client";

import { useRef, useEffect, useState, useCallback } from "react";

export default function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = "0px",
    triggerOnce = false,
  } = options;

  const targetRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track if element has been seen before
  const hasTriggeredRef = useRef(false);

  const calculateScrollProgress = useCallback(() => {
    if (!targetRef.current) return 0;

    const rect = targetRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Element is above viewport
    if (rect.bottom <= 0) return 1;

    // Element is below viewport
    if (rect.top >= windowHeight) return 0;

    // Element is partially or fully in viewport
    const elementHeight = rect.height;
    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const progress = visibleHeight / elementHeight;

    return Math.max(0, Math.min(1, progress));
  }, []);

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If triggerOnce is true and already triggered, do nothing
          if (triggerOnce && hasTriggeredRef.current) return;

          setIsInView(entry.isIntersecting);

          if (entry.isIntersecting) {
            hasTriggeredRef.current = true;

            // Calculate initial scroll progress when entering view
            setScrollProgress(calculateScrollProgress());
          }
        });
      },
      { threshold, root, rootMargin }
    );

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [threshold, root, rootMargin, triggerOnce, calculateScrollProgress]);

  // Update scroll progress on scroll when element is in view
  useEffect(() => {
    const handleScroll = () => {
      if (isInView || hasTriggeredRef.current) {
        setScrollProgress(calculateScrollProgress());
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isInView, calculateScrollProgress]);

  return {
    ref: targetRef,
    isInView,
    scrollProgress,
    hasBeenInView: hasTriggeredRef.current,
  };
}
