import { useState, useEffect } from "react";

export type BreakpointType = "mobile" | "tablet" | "desktop";

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>("desktop");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint("mobile");
      } else if (width < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);

    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return {
    breakpoint,
    isMounted,
    isMobile: isMounted && breakpoint === "mobile",
    isTablet: isMounted && breakpoint === "tablet",
    isDesktop: isMounted && breakpoint === "desktop",
    isMobileOrTablet: isMounted && (breakpoint === "mobile" || breakpoint === "tablet"),
  };
}
