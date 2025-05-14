// "use client";

// import { useRef } from "react";

// export default function Button({
//   children,
//   onClick,
//   variant = "primary",
//   size = "md",
//   withRipple = false,
//   className = "",
//   ...props
// }) {
//   const buttonRef = useRef(null);

//   // Style variants
//   const variants = {
//     primary: "bg-primary hover:bg-primary/90 text-white",
//     secondary: "bg-secondary hover:bg-secondary/90 text-white",
//     outline:
//       "bg-transparent border border-primary hover:bg-primary/10 text-primary dark:text-white",
//     ghost:
//       "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white",
//   };

//   // Size variants
//   const sizes = {
//     sm: "py-1 px-3 text-sm",
//     md: "py-2 px-5 text-base",
//     lg: "py-3 px-6 text-lg",
//   };

//   // Create ripple effect
//   const createRipple = (e) => {
//     if (!withRipple) return;

//     const button = buttonRef.current;
//     const circle = document.createElement("span");

//     const diameter = Math.max(button.clientWidth, button.clientHeight);
//     const radius = diameter / 2;

//     const rect = button.getBoundingClientRect();

//     circle.style.width = circle.style.height = `${diameter}px`;
//     circle.style.left = `${e.clientX - rect.left - radius}px`;
//     circle.style.top = `${e.clientY - rect.top - radius}px`;
//     circle.classList.add("ripple");

//     // Remove existing ripples
//     const ripple = button.querySelector(".ripple");
//     if (ripple) {
//       ripple.remove();
//     }

//     button.appendChild(circle);

//     // Clean up ripple after animation
//     setTimeout(() => {
//       if (circle) {
//         circle.remove();
//       }
//     }, 600);
//   };

//   const handleClick = (e) => {
//     createRipple(e);
//     if (onClick) onClick(e);
//   };

//   return (
//     <button
//       ref={buttonRef}
//       className={`relative overflow-hidden rounded-lg font-medium transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
//       onClick={handleClick}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  withRipple = true,
  className = "",
  ...props
}) {
  const buttonRef = useRef(null);
  const [rippleEffects, setRippleEffects] = useState([]);

  // Style variants
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white",
    secondary: "bg-secondary hover:bg-secondary/90 text-white",
    outline:
      "bg-transparent border border-primary hover:bg-primary/10 text-primary dark:text-white",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white",
  };

  // Size variants
  const sizes = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2.5 px-5 text-base",
    lg: "py-3.5 px-7 text-lg",
  };

  // Create ripple effect
  const createRipple = (e) => {
    if (!withRipple || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const diameter = Math.max(button.clientWidth, button.clientHeight) * 2.5;
    const radius = diameter / 2;

    const uniqueId = Date.now().toString();

    setRippleEffects((prev) => [
      ...prev,
      { id: uniqueId, x, y, size: diameter },
    ]);

    // Remove ripple after animation finishes
    setTimeout(() => {
      setRippleEffects((prev) =>
        prev.filter((ripple) => ripple.id !== uniqueId)
      );
    }, 800);
  };

  const handleClick = (e) => {
    createRipple(e);
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden rounded-lg font-medium transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {children}

      {/* Ripple effects */}
      {rippleEffects.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ transform: "scale(0)", opacity: 0.75 }}
          animate={{ transform: "scale(1)", opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  );
}
