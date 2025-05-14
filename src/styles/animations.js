/**
 * Animation variants for Framer Motion
 */

// Fade in animation
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }
  
  // Fade in from bottom
  export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }
  
  // Fade in from left
  export const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }
  
  // Fade in from right
  export const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }
  
  // Scale up animation
  export const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    }
  }
  
  // Staggered children animation container
  export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
  
  // Item animation for staggered lists
  export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  
  // Page transition animations
  export const pageTransition = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 10,
      transition: { duration: 0.3 }
    }
  }
  
  // Ripple animation 
  export const rippleAnimation = {
    initial: { scale: 0, opacity: 0.8 },
    animate: { 
      scale: 4, 
      opacity: 0,
      transition: { duration: 0.7 }
    }
  }
  
  // Button hover animation
  export const buttonHover = {
    initial: {},
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }
  
  // Spline object animations
  export const splineAnimations = {
    // Default state
    initial: {
      rotate: 0,
      scale: 1
    },
    
    // Hover state
    hover: {
      rotate: [0, 5, -5, 0],
      scale: 1.05,
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 2
        },
        scale: {
          duration: 0.3
        }
      }
    },
    
    // Click state
    click: {
      scale: [1, 1.2, 1],
      rotate: [0, 15, 0],
      transition: {
        duration: 0.5
      }
    },
    
    // Theme toggle state
    themeToggle: {
      rotate: [0, 180],
      transition: {
        duration: 0.6
      }
    }
  }