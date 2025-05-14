"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SplineObject from "@/components/home/SplineObject";
import { useSplineContext } from "@/context/SplineContext";
import { useTheme } from "@/context/ThemeContext";

export default function HeroSection() {
  const { animateSplineObject } = useSplineContext();
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const heroRef = useRef(null);

  // Track mouse position for Spline interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 2 - 1;
        const y = -((e.clientY - top) / height) * 2 + 1;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update Spline rotation based on mouse position
  useEffect(() => {
    if (!isButtonAnimating) {
      // Only update with mouse movement when not in button animation
      animateSplineObject({
        rotateX: mousePosition.y * 10,
        rotateY: mousePosition.x * 10,
      });
    }
  }, [mousePosition, animateSplineObject, isButtonAnimating]);

  // Handle button click with ripple effect
  const handleGetStarted = () => {
    // Prevent mouse movement from affecting during animation
    setIsButtonAnimating(true);

    // Animate the Spline object
    animateSplineObject({
      rotateZ: 360, // Full rotation
      scale: 1.3, // Grow
    });

    // Reset after animation
    setTimeout(() => {
      animateSplineObject({
        rotateZ: 0,
        scale: 1.0,
      });
      setIsButtonAnimating(false);
    }, 800);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background-light to-secondary/10 dark:from-primary/20 dark:via-background-dark dark:to-secondary/20 z-0" />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Future of
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {" "}
                Quranium
              </span>
              <br />
              Is Here
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
              A revolutionary Web3 platform that provides authentic Islamic
              resources through innovative blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                onClick={handleGetStarted}
                withRipple={true}
                className="shadow-lg shadow-primary/30 dark:shadow-primary/20"
              >
                Get Started
              </Button>
              <Button variant="outline" size="lg" onClick={() => {}}>
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Spline 3D Object */}
          <motion.div
            className="lg:w-1/2 h-[400px] md:h-[600px] mt-12 lg:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <SplineObject scene="hero" />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl z-0" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl z-0" />
    </section>
  );
}
