"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplineObject from "@/components/home/SplineObject";
import { useSplineContext } from "@/context/SplineContext";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const { isSplineLoaded } = useSplineContext();

  useEffect(() => {
    // Minimum loading time for a better UX
    const timer = setTimeout(() => {
      if (isSplineLoaded) {
        setIsLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSplineLoaded]);

  // If another condition should affect loading state
  useEffect(() => {
    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 500);
    };

    window.addEventListener("load", handleComplete);

    return () => {
      window.removeEventListener("load", handleComplete);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background-light dark:bg-background-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-40 h-40">
            <SplineObject scene="loader" />
          </div>
          <motion.p
            className="absolute mt-48 text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Quranium...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
