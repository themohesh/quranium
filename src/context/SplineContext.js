"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { usePathname } from "next/navigation";

const SplineContext = createContext();

export function SplineProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedScenes, setLoadedScenes] = useState({});
  const splineObjectsRef = useRef({});
  const pathname = usePathname();

  // Register a Spline object to be accessible throughout the app
  const registerSplineObject = useCallback((key, splineObj) => {
    splineObjectsRef.current[key] = splineObj;
  }, []);

  // Mark a Spline scene as loaded
  const splineLoaded = useCallback(
    (scene) => {
      setLoadedScenes((prev) => {
        const updated = { ...prev, [scene]: true };

        // Update overall loaded state if all necessary scenes are loaded
        const requiredScenes =
          pathname === "/" ? ["hero", "loader"] : ["about", "loader"];
        const allLoaded = requiredScenes.every((s) => updated[s]);

        if (allLoaded) {
          setIsLoaded(true);
        }

        return updated;
      });
    },
    [pathname]
  );

  // Reset or transition Spline object when changing pages
  const resetSplineObject = useCallback((page) => {
    const spline = splineObjectsRef.current[page];
    if (!spline) return;

    // Reset to default state
    try {
      // Reset position, rotation, scale, etc.
      const defaultTransform = {
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
      };

      // Apply reset transformation to main object
      const mainObject = spline.findObjectByName("MainObject");
      if (mainObject) {
        Object.entries(defaultTransform).forEach(([key, value]) => {
          if (
            mainObject.transform &&
            typeof mainObject.transform[key] === "function"
          ) {
            mainObject.transform[key](value);
          }
        });
      }
    } catch (error) {
      console.error("Error resetting Spline object:", error);
    }
  }, []);

  // Animate the Spline object
  const animateSplineObject = useCallback(
    (animationType, params = {}) => {
      // Get the current page
      const currentPage = pathname === "/" ? "hero" : "about";
      const spline = splineObjectsRef.current[currentPage];

      if (!spline) return;

      try {
        // Handle different animation types
        switch (animationType) {
          case "rotate":
            // Rotate the object based on mouse movement
            const mainObject = spline.findObjectByName("MainObject");
            if (mainObject && mainObject.transform) {
              if (params.rotateX !== undefined)
                mainObject.transform.rotateX(params.rotateX);
              if (params.rotateY !== undefined)
                mainObject.transform.rotateY(params.rotateY);
            }
            break;

          case "scroll":
            // Scale or transform the object based on scroll position
            const scrollObject = spline.findObjectByName("MainObject");
            if (scrollObject && scrollObject.transform) {
              if (params.scale !== undefined)
                scrollObject.transform.scale(params.scale);
              if (params.rotate !== undefined)
                scrollObject.transform.rotateZ(params.rotate);
            }
            break;

          case "click":
            // Animate on button click
            const clickObject = spline.findObjectByName("MainObject");
            if (clickObject && clickObject.transform) {
              // Apply quick animation
              if (params.scale) {
                clickObject.transform.scale(params.scale);
                // Reset after a short time
                setTimeout(() => {
                  clickObject.transform.scale(1);
                }, 200);
              }

              // Play animation sequence if available
              const animation = spline.findObjectByName("ButtonClickAnimation");
              if (animation && typeof animation.play === "function") {
                animation.play();
              }
            }
            break;

          case "colorShift":
            // Change materials for dark/light mode transition
            const materials = spline.getMaterials();
            materials.forEach((material) => {
              // Change material properties based on theme
              if (params.theme === "dark") {
                material.color = { r: 0.1, g: 0.1, b: 0.3 };
              } else {
                material.color = { r: 0.8, g: 0.8, b: 1.0 };
              }
            });
            break;

          default:
            break;
        }
      } catch (error) {
        console.error("Error animating Spline object:", error);
      }
    },
    [pathname]
  );

  const value = {
    isSplineLoaded: isLoaded,
    splineLoaded,
    registerSplineObject,
    resetSplineObject,
    animateSplineObject,
  };

  return (
    <SplineContext.Provider value={value}>{children}</SplineContext.Provider>
  );
}

export function useSplineContext() {
  const context = useContext(SplineContext);
  if (!context) {
    throw new Error("useSplineContext must be used within a SplineProvider");
  }
  return context;
}
