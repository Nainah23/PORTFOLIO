import { useEffect } from "react";

const STORAGE_KEY = "scroll-restore-position";
const FLAG_KEY = "scroll-restore-flag";

export function useScrollRestore() {
  useEffect(() => {
    // Check if this is a page refresh (not first visit or navigation)
    const isRefresh = sessionStorage.getItem(FLAG_KEY) === "1";

    if (isRefresh) {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const y = parseInt(saved, 10);
        if (!isNaN(y) && y > 0) {
          // Restore after layout is ready
          requestAnimationFrame(() => {
            window.scrollTo(0, y);
          });
        }
      }
    }

    // Set flag indicating the page has been loaded (so next load is a refresh)
    sessionStorage.setItem(FLAG_KEY, "1");

    // Save scroll position on scroll (throttled)
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
