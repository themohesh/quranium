// "use client";

// import { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import Button from "@/components/ui/Button";
// import SplineObject from "@/components/home/SplineObject";
// import { useSplineContext } from "@/context/SplineContext";

// export default function HeroSection() {
//   const { animateSplineObject } = useSplineContext();
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!containerRef.current) return;

//       const { left, top, width, height } =
//         containerRef.current.getBoundingClientRect();
//       const x = ((e.clientX - left) / width - 0.5) * 2;
//       const y = ((e.clientY - top) / height - 0.5) * 2;

//       setMousePosition({ x, y });

//       // Animate the Spline object based on mouse position
//       animateSplineObject({
//         rotateX: y * 10,
//         rotateY: x * 10,
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, [animateSplineObject]);

//   const handleGetStarted = () => {
//     // Animate the Spline object when button is clicked
//     animateSplineObject({
//       rotate: 360,
//       scale: 1.2,
//       duration: 0.8,
//     });

//     // Reset after animation
//     setTimeout(() => {
//       animateSplineObject({
//         rotate: 0,
//         scale: 1,
//         duration: 0.5,
//       });
//     }, 800);
//   };

//   return (
//     <section
//       ref={containerRef}
//       className="min-h-screen relative flex items-center overflow-hidden"
//     >
//       <div className="container mx-auto px-4 py-16 z-10">
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Welcome to <span className="text-gradient">Quranium</span>
//             </h1>
//             <p className="text-lg md:text-xl mb-8 opacity-80">
//               Explore Islamic knowledge through an innovative Web3 platform
//               designed for seekers of authentic content.
//             </p>
//             <Button onClick={handleGetStarted} withRipple={true}>
//               Get Started
//             </Button>
//           </motion.div>

//           <motion.div
//             className="h-[400px] md:h-[500px]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.2 }}
//           >
//             <SplineObject scene="hero" />
//           </motion.div>
//         </div>
//       </div>

//       {/* Background gradient elements */}
//       <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full filter blur-3xl" />
//       <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/10 rounded-full filter blur-3xl" />
//     </section>
//   );
// }

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
