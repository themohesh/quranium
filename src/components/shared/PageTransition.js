"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  const variants = {
    hidden: { opacity: 0, x: -10 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  };

  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear", duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
