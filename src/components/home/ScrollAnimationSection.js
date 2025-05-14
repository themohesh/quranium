"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useSplineContext } from "@/context/SplineContext";
import { useInView } from "react-intersection-observer";

// Map of feature highlight colors to their actual color values for animation
const highlightColors = {
  "indigo-500": "#6366f1",
  "emerald-500": "#10b981",
  "blue-500": "#3b82f6",
};

export default function ScrollAnimationSection() {
  const { animateSplineObject } = useSplineContext();
  const containerRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(null);

  // Main scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Feature sections in-view detection with higher threshold for better timing
  const [ref1, inView1] = useInView({ threshold: 0.4, triggerOnce: false });
  const [ref2, inView2] = useInView({ threshold: 0.4, triggerOnce: false });
  const [ref3, inView3] = useInView({ threshold: 0.4, triggerOnce: false });

  // Set active feature based on which one is in view
  useEffect(() => {
    if (inView1) setActiveFeature(0);
    else if (inView2) setActiveFeature(1);
    else if (inView3) setActiveFeature(2);
    else setActiveFeature(null);
  }, [inView1, inView2, inView3]);

  // Enhanced parallax effects - more layers with different speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const scale1 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  // Decorative elements parallax
  const decorY1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const decorRotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]); // First rotation
  const decorRotate2 = useTransform(scrollYProgress, [0, 1], [0, 360]); // Second rotation - different axis
  const decorScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.6, 1.2, 0.6]
  );

  // More complex Spline animation based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      // Enhanced animation with more parameters
      animateSplineObject({
        // Base scaling that grows then shrinks
        scale: value < 0.5 ? 1 + value * 0.4 : 1.2 - (value - 0.5) * 0.4,

        // Rotation that accelerates
        rotate: value * value * 360,

        // Position shift that follows a curve
        y: Math.sin(value * Math.PI) * 50,
        x: Math.cos(value * Math.PI * 2) * 30,

        // Ensure animation is smooth
        immediate: true,
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress, animateSplineObject]);

  // Feature items with improved animations
  const features = [
    {
      title: "Verified Content",
      description:
        "All content on Quranium is verified by scholars and experts, ensuring authenticity and accuracy in every piece of knowledge shared.",
      icon: "📚",
      ref: ref1,
      inView: inView1,
      color: "from-indigo-500/20 to-purple-500/20",
      highlight: "indigo-500",
      colorValue: highlightColors["indigo-500"],
      direction: "left",
    },
    {
      title: "Web3 Rewards",
      description:
        "Contribute, learn, and earn rewards through our blockchain-based ecosystem that recognizes and values your participation and knowledge.",
      icon: "🏆",
      ref: ref2,
      inView: inView2,
      color: "from-emerald-500/20 to-teal-500/20",
      highlight: "emerald-500",
      colorValue: highlightColors["emerald-500"],
      direction: "right",
    },
    {
      title: "Community Learning",
      description:
        "Connect with others, participate in discussions, and grow together in a global community dedicated to authentic knowledge sharing.",
      icon: "👥",
      ref: ref3,
      inView: inView3,
      color: "from-blue-500/20 to-sky-500/20",
      highlight: "blue-500",
      colorValue: highlightColors["blue-500"],
      direction: "left",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden"
      style={{ minHeight: "150vh" }}
    >
      {/* Multiple decorative elements with different parallax rates */}
      <motion.div
        className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl"
        style={{
          top: "10%",
          right: "-20%",
          y: decorY1,
          rotate: decorRotate1, // Use first rotation for z-axis
          scale: decorScale,
        }}
      />

      <motion.div
        className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-secondary/5 to-primary/5 blur-3xl"
        style={{
          bottom: "10%",
          left: "-10%",
          y: decorY2,
          rotateY: decorRotate2, // Use second rotation for y-axis
          scale: decorScale,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-28"
          style={{ opacity: opacity1, scale: scale1 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore Our Features
          </motion.h2>
          <motion.p
            className="text-xl opacity-80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover what makes Quranium the leading Web3 platform for Islamic
            knowledge
          </motion.p>
        </motion.div>

        {/* Feature track indicator */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full top-40 w-0.5 bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`absolute w-6 h-6 -left-[11px] rounded-full border-2 ${
                activeFeature === index
                  ? `bg-${feature.highlight} border-${feature.highlight}`
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              }`}
              style={{ top: `${index * 33 + 15}%` }}
              animate={{
                scale: activeFeature === index ? [1, 1.2, 1] : 1,
                transition: {
                  repeat: activeFeature === index ? Infinity : 0,
                  duration: 2,
                },
              }}
            />
          ))}
        </div>

        <div className="space-y-40">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={feature.ref}
              className="relative overflow-visible"
            >
              {/* Parallax background element */}
              <motion.div
                className={`absolute -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br ${feature.color} blur-3xl opacity-70`}
                style={{
                  [feature.direction === "left" ? "right" : "left"]: "-10%",
                  top: index % 2 === 0 ? "-20%" : "20%",
                  y: index === 0 ? y1 : index === 1 ? y2 : y3,
                }}
              />

              <motion.div
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  feature.direction === "right" ? "md:rtl" : ""
                }`}
                initial={{
                  opacity: 0,
                  x: feature.direction === "left" ? -50 : 50,
                }}
                animate={
                  feature.inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: feature.direction === "left" ? -50 : 50 }
                }
                transition={{ duration: 0.8 }}
              >
                <div
                  className={
                    feature.direction === "right" ? "md:text-right" : ""
                  }
                >
                  <motion.h3
                    className={`text-3xl md:text-4xl font-bold mb-6 relative inline-block text-${feature.highlight}`}
                    animate={
                      feature.inView
                        ? {
                            opacity: [0.7, 1, 0.7], // Simple opacity animation instead of color
                            transition: {
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            },
                          }
                        : {}
                    }
                  >
                    {feature.title}
                    <motion.span
                      className={`absolute bottom-0 left-0 h-1 bg-${feature.highlight}`}
                      initial={{ width: 0 }}
                      animate={
                        feature.inView ? { width: "100%" } : { width: 0 }
                      }
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </motion.h3>
                  <motion.p
                    className="text-lg leading-relaxed opacity-80"
                    initial={{ opacity: 0 }}
                    animate={feature.inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {feature.description}
                  </motion.p>

                  <motion.button
                    className={`mt-6 px-6 py-3 rounded-lg bg-${feature.highlight} text-white font-medium flex items-center gap-2 group`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={
                      feature.inView
                        ? { y: 0, opacity: 1 }
                        : { y: 20, opacity: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </motion.button>
                </div>

                <div className="md:ltr">
                  <motion.div
                    className={`bg-gradient-to-br ${feature.color} rounded-2xl aspect-square md:aspect-video shadow-xl relative overflow-hidden group`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={
                      feature.inView
                        ? { scale: 1, opacity: 1, rotateY: 0 }
                        : { scale: 0.9, opacity: 0, rotateY: -15 }
                    }
                    transition={{ duration: 0.8, delay: 0.2 }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                  >
                    <div className="absolute inset-0 opacity-20 bg-pattern-grid" />
                    <div className="flex items-center justify-center h-full">
                      <motion.div
                        className="text-9xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                    </div>

                    {/* Floating particles */}
                    <AnimatePresence>
                      {feature.inView &&
                        [...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-4 h-4 rounded-full bg-${feature.highlight}/20`}
                            initial={{
                              x: Math.random() * 100 - 50 + "%",
                              y: Math.random() * 100 - 50 + "%",
                              opacity: 0,
                              scale: 0,
                            }}
                            animate={{
                              x: [
                                Math.random() * 100 - 50 + "%",
                                Math.random() * 100 - 50 + "%",
                                Math.random() * 100 - 50 + "%",
                              ],
                              y: [
                                Math.random() * 100 - 50 + "%",
                                Math.random() * 100 - 50 + "%",
                                Math.random() * 100 - 50 + "%",
                              ],
                              rotate: [0, 180, 360],
                              opacity: [0, 0.8, 0],
                              scale: [0, Math.random() * 0.7 + 0.3, 0],
                            }}
                            transition={{
                              duration: Math.random() * 10 + 10,
                              repeat: Infinity,
                              repeatType: "loop",
                            }}
                          />
                        ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Final call-to-action with parallax */}
        <motion.div
          className="mt-40 text-center relative"
          style={{
            opacity: useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]),
          }}
        >
          <motion.div
            className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl"
            style={{
              scale: useTransform(
                scrollYProgress,
                [0.7, 0.85, 1],
                [0.8, 1, 1.05]
              ),
            }}
          />

          <motion.div
            className="py-16 px-8 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Quranium?
            </h3>
            <p className="text-xl opacity-80 max-w-2xl mx-auto mb-8">
              Join our growing community of knowledge seekers and contributors
              today.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Join Quranium Now
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Add global floating elements for extra parallax */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-[150px] h-[150px] rounded-full bg-gradient-to-br opacity-[0.03] dark:opacity-[0.05]
              ${
                i % 2 === 0
                  ? "from-primary/30 to-primary/10"
                  : "from-secondary/30 to-secondary/10"
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 2 + 1,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 50 + 50,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Add custom CSS for grid pattern */}
      <style jsx global>{`
        .bg-pattern-grid {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }

        .dark .bg-pattern-grid {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
        }

        /* Optimize animations for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
