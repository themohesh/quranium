"use client";

import { useEffect } from "react";
import PageTransition from "@/components/shared/PageTransition";
import SplineObject from "@/components/home/SplineObject";
import { useSplineContext } from "@/context/SplineContext";
import { motion } from "framer-motion";

export default function About() {
  const { resetSplineObject } = useSplineContext();

  useEffect(() => {
    // Initialize or reset Spline object when page loads
    resetSplineObject("about");
  }, [resetSplineObject]);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Quranium
              </h1>
              <p className="text-lg mb-4">
                Quranium is a revolutionary Web3 platform dedicated to providing
                accessible, verified Islamic knowledge in an innovative way.
              </p>
              <p className="text-lg mb-4">
                Our team of scholars, developers, and designers work together to
                create a seamless experience that bridges traditional Islamic
                learning with cutting-edge technology.
              </p>
              <p className="text-lg">
                Through blockchain technology, we ensure the authenticity of
                content while creating an ecosystem that rewards contribution
                and learning.
              </p>
            </motion.div>
          </div>

          <div className="md:w-1/2 h-[400px] order-1 md:order-2 mb-8 md:mb-0">
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <SplineObject scene="about" />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-24 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-primary">Our Mission</h3>
            <p>
              To make authentic Islamic knowledge accessible to everyone through
              innovative web3 technology.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-primary">Our Vision</h3>
            <p>
              Creating a global ecosystem where knowledge sharing is rewarded
              and verified content is valued.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-primary">Our Values</h3>
            <p>
              Authenticity, innovation, inclusivity, and respect guide
              everything we do at Quranium.
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
